/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "ERC721URIStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721URIStorage__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "ERC20i",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20i__factory>;
    getContractFactory(
      name: "FundStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FundStorage__factory>;
    getContractFactory(
      name: "Lock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Lock__factory>;
    getContractFactory(
      name: "Manageable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Manageable__factory>;
    getContractFactory(
      name: "OverfundedNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OverfundedNFT__factory>;
    getContractFactory(
      name: "OverfundedUSD",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OverfundedUSD__factory>;
    getContractFactory(
      name: "PropertyManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PropertyManager__factory>;
    getContractFactory(
      name: "PropertyStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PropertyStorage__factory>;
    getContractFactory(
      name: "UserManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UserManager__factory>;

    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "ERC721URIStorage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721URIStorage>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "ERC20i",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20i>;
    getContractAt(
      name: "FundStorage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FundStorage>;
    getContractAt(
      name: "Lock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Lock>;
    getContractAt(
      name: "Manageable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Manageable>;
    getContractAt(
      name: "OverfundedNFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OverfundedNFT>;
    getContractAt(
      name: "OverfundedUSD",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OverfundedUSD>;
    getContractAt(
      name: "PropertyManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PropertyManager>;
    getContractAt(
      name: "PropertyStorage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PropertyStorage>;
    getContractAt(
      name: "UserManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UserManager>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
