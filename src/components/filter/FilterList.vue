<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFilterStore } from '@/stores/filter'
import FilterView from '@/components/filter/FilterView.vue'

const filterStore = useFilterStore()
const { selectedFilters } = storeToRefs(filterStore)
</script>

<template>
  <div class="filter-list">
    <FilterView
      v-for="(filter, i) in selectedFilters"
      :key="Array.isArray(filter) ? filter[0].attr + i : filter.attr + i"
      class="filter-list__item"
      :filter="filter"
      @remove="filterStore.removeFilter(i)"
    />
    <div class="filter-list__footer">
      <button
        v-if="selectedFilters.length > 1"
        class="filter-list__clear"
        @click.stop="filterStore.clearFilters()"
      >
        Очистить все
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.filter-list {

  &__item {
    max-width: 625px;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 6px;
    }
  }

  &__footer {
    max-width: 625px;
    display: flex;
  }

  &__clear {
    @include hover;
    margin-left: auto;
    text-decoration: underline;
  }
}
</style>