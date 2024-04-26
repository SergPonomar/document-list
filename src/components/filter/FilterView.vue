<script setup lang="ts">
import DateFilterView from '@/components/filter/DateFilterView.vue'
import TextFilterView from '@/components/filter/TextFilterView.vue'
import type { Filter } from '@/api/types'

interface Props {
  filter: Filter | Filter[];
}

defineProps<Props>()
defineEmits(['remove'])
</script>

<template>
  <DateFilterView
    v-if="Array.isArray(filter)"
    :filter-pair="filter"
    @remove="$emit('remove')"
  />
  <TextFilterView
    v-else
    :filter="filter"
    @remove="$emit('remove')"
  />
</template>