<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/stores/filter'
import { rfc3339 } from '@/utils'
import type { Attribute, Filter } from '@/api/types'
import AddFilterButton from '@/components/filter/AddFilterButton.vue'

interface Props {
  attr: Attribute;
}

const props = defineProps<Props>()

const inputFrom = ref()
const inputTo = ref()

const { addFilter } = useFilterStore()

const onSubmit = () => {
  const filterPair = []
  if (inputFrom.value) {    
    const filterFrom: Filter = {
      attr: props.attr,
      value: rfc3339(new Date(inputFrom.value)),
      op: 'more'
    }
    filterPair.push(filterFrom)
  }
  if (inputTo.value) {
    const filterTo: Filter = {
      attr: props.attr,
      value: rfc3339(new Date(inputTo.value)),
      op: 'less'
    }
    filterPair.push(filterTo)
  }
  addFilter(filterPair)
  inputFrom.value = ''
  inputTo.value = ''
}
</script>

<template>
  <div class="date-filter"> 
    <span class="date-filter__text">от</span>
    <input
      v-model="inputFrom"
      type="date"
      class="date-filter__input"
    >
    <span class="date-filter__text">до</span>
    <input
      v-model="inputTo"
      type="date"
      class="date-filter__input"
    >
    <AddFilterButton
      :disabled="!inputFrom && !inputTo"
      @click.stop="onSubmit"
    />
  </div>
</template>

<style lang="scss">
.date-filter {
  display: inline-block;

  &__text {
    margin-right: 10px;
  }

  &__input {
    @include input-style;
    margin-right: 12px;
    margin-bottom: 10px;

    &:last-of-type {
      margin-right: 20px;
    }
  }
}
</style>