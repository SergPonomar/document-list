<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '@/utils'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/global'
import IconCross2 from '@/components/icons/IconCross2.vue'
import type { Filter } from '@/api/types'

const globalStore = useGlobalStore()
const { attrDescription } = storeToRefs(globalStore)

interface Props {
  filterPair: Filter[];
}

const props = defineProps<Props>()
defineEmits(['remove'])
const from = computed(() => props.filterPair.find(flt => flt.op === 'more'))
const to = computed(() => props.filterPair.find(flt => flt.op === 'less'))
</script>

<template>
  <div class="date-filter-view">
    <span class="date-filter-view__text">
      <span class="date-filter-view__title">
        <span class="date-filter-view__suffix1">Фильтр:</span>"{{ attrDescription[filterPair[0].attr] }}"
      </span>
      <span
        v-if="from"
        class="date-filter-view__from"
      >
        <span class="date-filter-view__suffix2">от</span>{{ formatDate(from.attr, from.value) }}
      </span>
      <span
        v-if="to"
        class="date-filter-view__to"
      >
        <span class="date-filter-view__suffix2">до</span>{{ formatDate(to.attr, to.value) }}
      </span>
    </span>
    <button
      class="date-filter-view__close"
      @click="$emit('remove')"
    >
      <IconCross2 />
    </button>
  </div>
</template>

<style lang="scss">
.date-filter-view {
  position: relative;

  &__text {
    display: inline-flex;
    flex-wrap: wrap;
  }

  &__title {
    width: 258px;
  }

  &__from {
    width: 187px;
  }

  &__to {
    width: 180px;
  }

  &__suffix1 {
    margin-right: 20px;
  }

  &__suffix2 {
    margin-right: 15px;
  }

  &__close {
    position: absolute;
    right: 0;
    top: 0;
    @include hover;
  }
}
</style>