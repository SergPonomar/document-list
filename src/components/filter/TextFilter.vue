<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/stores/filter'
import type { Attribute, Filter } from '@/api/types'
import AddFilterButton from '@/components/filter/AddFilterButton.vue'

interface Props {
  attr: Attribute;
}

const props = defineProps<Props>()
  
const input = ref('')
const { addFilter } = useFilterStore()

const onSubmit = () => {
  if (!input.value) { return }
  const filter: Filter = {
    attr: props.attr,
    value: input.value,
    op: 'like_both'
  }
  addFilter(filter)
  input.value = ''
}
</script>

<template>
  <div class="text-filter"> 
    <span class="text-filter__text">содержит</span>
    <input
      v-model="input"
      type="text"
      class="text-filter__input"
      @keyup.enter="onSubmit"
    >
    <AddFilterButton
      :disabled="!input"
      @click.stop="onSubmit"
    />
  </div>
</template>

<style lang="scss">
.text-filter {
  display: inline-block;

  &__text {
    margin-right: 10px;
  }

  &__input {
    margin-right: 20px;
    margin-bottom: 10px;
    width: 280px;
    @include input-style;
  }
}
</style>