<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import FilterComponent from '@/components/filter/FilterComponent.vue'
import FilterList from '@/components/filter/FilterList.vue'
import IconCross1 from '@/components/icons/IconCross1.vue'
import { useFilterStore } from '@/stores/filter'

const filterStore = useFilterStore()
const { filterModalOpen } = storeToRefs(filterStore)

watch(filterModalOpen, (op) => {
  op
    ? document.documentElement.classList.add('scrollOff')
    : document.documentElement.classList.remove('scrollOff')
}, { immediate: true })
</script>

<template>
  <Teleport to="body">
    <div
      v-if="filterModalOpen"
      class="filter-modal"
    >
      <div
        class="filter-modal__overlay"
        @click="filterStore.closeFilterModal"
      />
      <div class="filter-modal__body"> 
        <h2 class="filter-modal__title">
          Добавить фильтр
        </h2>
        <FilterComponent class="filter-modal__filter" />
        <FilterList />
        <button
          class="filter-modal__close"
          @click="filterStore.closeFilterModal"
        >
          <IconCross1 />
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
.filter-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;

  &__overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: -1;
  }

  &__body {
    position: relative;
    margin: 70px auto 0 auto;
    width: calc(100% - 40px);
    max-width: 850px;
    background: white;
    padding: 20px;
    border-radius: 10px;
  }

  &__title {
    font-size: 24px;
    margin-bottom: 18px;
  }

  &__close {
    position: absolute;
    right: 20px;
    top: 20px;
    @include hover;
  }

  &__filter {
    margin-bottom: 14px;
  }
}
</style>