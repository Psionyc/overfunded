import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Property } from "@/models/Property";

export enum SortBy {
  NONE,
  PRICE,
  ROI,
}

export const usePropertyStore = defineStore("property", () => {
  const properties = ref<Property[]>([]);

  const sortedProperties = computed<Property[]>(() => {
    let _sortedProperties: Property[] = [];
    switch (sortBy.value) {
      case SortBy.NONE:
        _sortedProperties = properties.value;
        break;
      case SortBy.PRICE:
        _sortedProperties = properties.value.sort((a, b) => a.price - b.price);
        break;
      case SortBy.ROI:
        _sortedProperties = properties.value;

      default:
        _sortedProperties = properties.value;
        break;
    }
    return _sortedProperties;
  });
  const sortBy = ref<SortBy>(SortBy.PRICE);

  function changeSortBy(_sortBy: SortBy) {
    sortBy.value = _sortBy;
  }

  function refreshProperties() {}

  function getNextPaginatedProperties() {}

  return {
    properties,
    sortedProperties,
    changeSortBy,
    refreshProperties,
    getNextPaginatedProperties,
  };
});
