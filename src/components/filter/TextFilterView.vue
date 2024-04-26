<script setup lang="ts">
import { storeToRefs } from 'pinia'
import IconCross2 from '@/components/icons/IconCross2.vue'
import type { Filter } from '@/api/types'

import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()
const { attrDescription } = storeToRefs(globalStore)

interface Props {
  filter: Filter;
}

defineProps<Props>()
defineEmits(['remove'])
</script>

<template>
  <div class="text-filter-view">
    <span class="text-filter-view__text">
      <span class="text-filter-view__title">
        <span class="date-filter-view__suffix1">Фильтр:</span>"{{ attrDescription[filter.attr] }}"
      </span>
      <span class="text-filter-view__value">
        <span class="date-filter-view__suffix2">содержит</span>"{{ filter.value }}"</span>
    </span>
    <button
      class="text-filter-view__close"
      @click="$emit('remove')"
    >
      <IconCross2 />
    </button>
  </div>
</template>

<style lang="scss">
.text-filter-view {
  position: relative;

  &__text {
    display: inline-flex;
    flex-wrap: wrap;
  }

  &__title {
    width: 258px;
  }

  &__suffix1 {
    margin-right: 20px;
  }

  &__value {
    width: 367px;
    padding-right: 20px;
  }

  &__close {
    position: absolute;
    right: 0;
    top: 0;
    @include hover;
  }
}
</style>