import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Property } from "@/models/Property";
import type {
  PropertyManager,
  PropertyStructOutput,
  PropertyStruct,
} from "@/typechain-types/contracts/PropertyManager";
import type { OverfundedUSD } from "@/typechain-types/contracts/OUSD.sol/OverfundedUSD";
import PropertyManagerJson from "@/artifacts/contracts/PropertyManager.sol/PropertyManager.json";
import OverfundedJson from "@/artifacts/contracts/OUSD.sol/OverfundedUSD.json";
import { BaseContract, BigNumber, ethers, providers } from "ethers";
import { EventManager } from "@/main";
import { ToastType } from "@/events";
import { OUSD_CONTRACT, PROPERTY_MANAGER_CONTRACT } from "@/config";

let provider: ethers.providers.Web3Provider | null = null;
let propertyManager: (PropertyManager & BaseContract) | null = null;
let ousd: (OverfundedUSD & BaseContract) | null = null;
let signer: ethers.Signer | null = null;

const limit = 20;

export enum SortBy {
  NONE = "Sort By",
  PRICE_ASC = "Price(ASC)",
  PRICE_DESC = "Price(DESC)",
  EROI = "EROI",
}

export const usePropertyStore = defineStore("property", () => {
  const isLoading = ref<Boolean>(false);
  const properties = ref<PropertyStructOutput[]>([]);
  const next = ref<number>(0);
  const _search = ref<string>("");

  EventManager.on("connectOrUpdatedUser", async (e) => {
    provider = new ethers.providers.Web3Provider((window as any).ethereum);
    propertyManager = new ethers.Contract(
      PROPERTY_MANAGER_CONTRACT!,
      PropertyManagerJson.abi,
      provider.getSigner()
    ) as PropertyManager;
    isLoading.value = true;
    propertyManager
      ?.getProperties(0, 20)
      .then((v) => {
        properties.value = v.props;
        next.value = v.nextOffset.toNumber();
      })
      .finally(() => {
        isLoading.value = false;
      });
    ousd = new ethers.Contract(
      OUSD_CONTRACT!,
      OverfundedJson.abi,
      provider.getSigner()
    ) as OverfundedUSD;
  });

  const sortBy = ref<SortBy>(SortBy.NONE);

  const sortedProperties = computed<PropertyStructOutput[]>(() => {
    let _props: PropertyStructOutput[] = [...properties.value];
    let _sortedProperties = _props.filter((v, _) => {
      return v.name.toLowerCase().indexOf(_search.value.toLowerCase()) >= 0;
    });
    switch (sortBy.value) {
      case SortBy.NONE:
        break;
      case SortBy.PRICE_DESC:
        _sortedProperties = _sortedProperties.sort((a, b) => {
          return b.price.sub(a.price).toNumber();
        });
        break;
      case SortBy.PRICE_ASC:
        _sortedProperties = _sortedProperties.sort((a, b) => {
          return a.price.sub(b.price).toNumber();
        });
        break;
      case SortBy.EROI:
        break;
      default:
        break;
    }
    return _sortedProperties;
  });

  function changeSortBy(_sortBy: SortBy) {
    sortBy.value = _sortBy;
  }

  function search(value: string) {
    _search.value = value;
  }

  async function refreshProperties() {
    EventManager.emit("connectOrUpdatedUser");
    EventManager.emit("dataUpdated");
  }

  async function refreshProperty(property: number) {
    await propertyManager?.getProperty(property).then((v) => {
      const props = [...properties.value];
      props[property] = v;
      properties.value = props;
    });
  }

  function _handleError(e: any) {
    if (e.code == "ACTION_REJECTED")
      EventManager.emit("toast", {
        message: "Transaction Rejected",
        type: ToastType.ERROR,
      });
    else
      EventManager.emit("toast", {
        message: "Transaction failed",
        type: ToastType.ERROR,
      });
  }

  function getNextPaginatedProperties() {
    propertyManager?.getProperties(0, 20).then((v) => {
      properties.value = [...properties.value, ...v.props];
      next.value = v.nextOffset.toNumber();
    });
  }

  function inrementPropertyFunds(property: number, funds: number) {
    const propertiesClone = [...properties.value];
    const prop = propertiesClone[property];
    const value = prop.funds.add(funds);
    (prop as any).funds = value;

    properties.value = propertiesClone;
    console.log(properties.value[property].funds.toNumber(), value.toNumber());
  }

  async function fundProperty(property: number, amount: number) {
    try {
      await (await ousd?.approve(propertyManager?.address!, amount))!.wait(1);
      EventManager.emit("toast", {
        message: "Confirmed tx 1",
        type: ToastType.INFO,
      });
      await (await propertyManager?.fundProperty(property, amount))!.wait();
      EventManager.emit("toast", {
        message: "Transaction Successful",
        type: ToastType.SUCCESS,
      });
      EventManager.emit("dataUpdated");
      await refreshProperties();
      console.log(properties.value[property].funds.toNumber());
    } catch (e: any) {
      _handleError(e);
    }
  }

  async function addProperty(
    name: string,
    price: number,
    image: string,
    location: string
  ) {
    try {
      const prop = await propertyManager?.createNewProperty(
        name,
        price,
        [image],
        location
      );
      await prop?.wait();

      await refreshProperties();
    } catch (e: any) {
      _handleError(e);
    }
  }

  async function getOUSDBalance(address: string) {
    return await ousd?.balanceOf(address);
  }

  async function withdrawFunds(_property: number) {
    try {
      const tx = await propertyManager?.withdrawPropertyFund(_property);
      await tx?.wait();
      
      EventManager.emit("toast", {
        message: "Succesfully Withdrawn Funds",
        type: ToastType.SUCCESS,
      });
    } catch (error) {
      _handleError(error);
    }
  }

  async function getOUSD() {
    try {
      const tx = await ousd?.requestTokens();
      await tx?.wait();

      EventManager.emit("toast", {
        message: "Succesfully gotten OUSD",
        type: ToastType.SUCCESS,
      });
    } catch (e) {
      _handleError(e);
    }
  }
  return {
    properties,
    sortedProperties,
    isLoading,
    changeSortBy,
    refreshProperties,
    getNextPaginatedProperties,
    fundProperty,
    refreshProperty,
    addProperty,
    getOUSDBalance,
    getOUSD,
    search,
    withdrawFunds
  };
});
