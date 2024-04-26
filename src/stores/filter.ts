import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Filter } from '@/api/types'

export const useFilterStore = defineStore('filter', () => {
  const filterModalOpen = ref(false)
  const selectedFilters = ref<(Filter | Filter[])[]>([])
  const refetch = ref(false)
  const filtersCount = computed(() => selectedFilters.value.length)
  let savedFilters: string = JSON.stringify([])

  function sortAndCopy (arr: (Filter | Filter[])[]) {
    const copy: (Filter | Filter[])[] = JSON.parse(JSON.stringify(arr))
    const stringCopy = copy.map(flt => JSON.stringify(flt))
    stringCopy.sort()
    return JSON.stringify(stringCopy)
  }

  const openFilterModal = () => {
    savedFilters = sortAndCopy(selectedFilters.value)
    refetch.value = false
    filterModalOpen.value = true
  }

  const closeFilterModal = () => {
    refetch.value = savedFilters !== sortAndCopy(selectedFilters.value)
    filterModalOpen.value = false
  }

  const addFilter = (filter: Filter | Filter[]) => {
    selectedFilters.value.push(filter)
  }

  const removeFilter = (index: number) => {
    selectedFilters.value.splice(index, 1)
  }

  const clearFilters = () => {
    selectedFilters.value = []
  }

  return {
    filterModalOpen,
    openFilterModal,
    closeFilterModal,
    filtersCount,
    addFilter,
    removeFilter,
    selectedFilters,
    refetch,
    clearFilters
  }
})
