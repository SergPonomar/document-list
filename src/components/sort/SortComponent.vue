<script setup lang="ts">
import SortButton from '@/components/sort/SortButton.vue'
import type { Sort } from '@/api/types'

interface Props {
  sortAttr: string;
  activeSort?: Sort;
}

const props = withDefaults(defineProps<Props>(), {
  activeSort: undefined
})

const emit = defineEmits(['sort'])

const onClick = (asc: boolean, active: boolean) => {
  emit('sort', active ? undefined : { attr: props.sortAttr, asc })
}
</script>

<template>
  <div class="sort-component">
    <SortButton
      class="sort-component__top"
      :active="!!(activeSort && activeSort.attr === sortAttr && activeSort.asc)"
      @pressed="onClick(true, $event)"
    />
    <SortButton
      class="sort-component__bottom"
      :active="activeSort && activeSort.attr === sortAttr && !activeSort.asc"
      @pressed="onClick(false, $event)"
    />
  </div>
</template>

<style lang="scss">
.sort-component {
  display: flex;
  flex-direction: column;
  color: #cccccc;

  &__top {
    margin-bottom: 1px;
    transform: rotate(180deg);
  }
}
</style>
