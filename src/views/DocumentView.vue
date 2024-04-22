<script setup lang="ts">
import DocumentProps from '@/components/DocumentProps.vue'
import BackLink  from '@/components/BackLink.vue'
import PageTitle from '@/components/PageTitle.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const documentName = ref('')

const getId = () => {
  const route = useRoute()
  const id  = route.params.id
  return Array.isArray(id) ? id[0] : id
}
</script>

<template>
  <BackLink />
  <PageTitle :title="documentName" />
  <DocumentProps
    :document-id="getId()"
    @get-name="documentName = $event"
  />
</template>
