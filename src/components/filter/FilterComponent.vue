<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/global'
import DateFilter from '@/components/filter/DateFilter.vue'
import TextFilter from '@/components/filter/TextFilter.vue'

const { columns } = storeToRefs(useGlobalStore())
const sortable = computed(() => columns.value.filter(c => c.sortable))

const selectedAttr = ref(sortable.value[0].attr)
</script>

<template>
  <div class="filter-component">
    <span class="filter-component__text">Столбец:</span>
    <select
      v-model="selectedAttr"
      name="attributes"
      class="filter-component__select"
    >
      <option
        v-for="({ attr, name}, i) in sortable"
        :key="attr"
        :value="attr"
        :selected="i === 0"
      >
        {{ name }}
      </option>
    </select>
    <component
      :is="selectedAttr.startsWith('sdta') ? DateFilter : TextFilter"
      :attr="selectedAttr"
    />
  </div>
</template>

<style lang="scss">
.filter-component {

  &__text {
    margin-right: 10px;
  }
  
  &__select {
    margin-right: 12px;
    margin-bottom: 10px;
    @include input-style;
  }
}
</style>