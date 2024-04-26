<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFilterStore } from '@/stores/filter'
import IconMixerVertical from '@/components/icons/IconMixerVertical.vue'

interface Props {
  documentsCount?: number;
}

withDefaults(defineProps<Props>(), {
  documentsCount: undefined
})

const filterStore = useFilterStore()
const { openFilterModal } = useFilterStore()
const { filtersCount } = storeToRefs(filterStore)
</script>

<template>
  <div class="document-totals">   
    <p class="document-totals__filters">
      <button
        class="document-totals__open-filters"
        @click="openFilterModal"
      >
        <IconMixerVertical class="document-totals__icon" />
      </button>
      Фильтров выбрано: {{ filtersCount }}
    </p>
    <p class="document-totals__documents">
      Найдено документов: {{ documentsCount }}
    </p>
  </div>
</template>

<style lang="scss">
.document-totals {
  
  &__filters {
    margin-bottom: 8px;
  }

  &__open-filters {
    margin-right: 2px;
    transform: translateY(3px);
    width: 18px;
    height: 18px;
    display: inline-block;
    @include hover;
  }

  &__icon {
    width: 100%;
    height: 100%;
  }
}
</style>
