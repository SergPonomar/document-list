<script setup lang="ts">
import { ref } from 'vue'
import DocumentList from '@/components/DocumentList.vue'
import DocumentTotals from '@/components/DocumentTotals.vue'
import PageTitle from '@/components/PageTitle.vue'

const documentsCount = ref()
</script>

<template>
  <PageTitle title="Документы" />
  <DocumentTotals
    class="home-view__totals"
    :documents-count="documentsCount"
  />
  <DocumentList @count-change="documentsCount = $event" />
</template>

<style lang="scss">
.home-view {

  &__totals {
    margin-bottom: 16px;
  }
}
</style>