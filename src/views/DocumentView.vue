<script setup lang="ts">
import DocumentProps from '@/components/DocumentProps.vue'
import BackLink  from '@/components/BackLink.vue'
import PageTitle from '@/components/PageTitle.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const documentName = ref('')
const error = ref()

const getId = () => {
  const route = useRoute()
  const id  = route.params.id
  return Array.isArray(id) ? id[0] : id
}

const id = getId()
</script>

<template>
  <BackLink :title="error ? 'На главную' : ''" />
  <PageTitle :title="documentName" />
  <DocumentProps
    v-if="!error"
    :document-id="id"
    @error="error = $event"
    @get-name="documentName = $event"
  />
  <p class="document-view__error">
    Документ с ID <strong>"{{ id }}"</strong> не найден
  </p>
</template>

<style lang="scss">
.document-view {

  &__error {
    font-size: 20px;
    margin-top: 20px;
  }
}
</style>