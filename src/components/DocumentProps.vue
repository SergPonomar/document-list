<script setup lang="ts">
import { ref, computed } from 'vue'
import { useApi } from '@/api/useApi'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/global'
import { formatDate } from '@/utils'
import type { DocumentAttributes } from '@/api/types'

interface Props {
  documentId: string;
}

const props = defineProps<Props>()
const emit = defineEmits(['getName', 'error'])
const { attrDescription } = storeToRefs(useGlobalStore())

const useFetch = () => {
  const { getDocument } = useApi()
  const loading = ref(false)
  const error = ref()
  const doc = ref<DocumentAttributes>({})

  const fetchDoc = async () => {
    try {
      loading.value = true
      const res = await getDocument(props.documentId)
      if (res) {
        doc.value = res.data
        emit('getName', doc.value.ssa_name)
      }
      loading.value = false
    } catch (e) {
      emit('error', e)
      error.value = e
    }
  }

  return { fetchDoc, doc, loading, error }
}

const { fetchDoc, doc } = useFetch()

fetchDoc()

const columns = computed(() => {
  const withDescription = Object.keys(attrDescription.value)
  return Object.entries(doc.value)
    .filter(([attr, _value]) => withDescription.includes(attr))
    .map(([attr, value]) => {
      return [attrDescription.value[attr], formatDate(attr, value)]
    })
})
</script>

<template>
  <table class="document-props">
    <tr
      v-for="[attr, value] in columns"
      :key="attr as string"
      class="document-props__row"
    >
      <td class="document-props__attr">
        {{ attr }}
      </td>
      <td class="document-props__value">
        {{ value }}
      </td>
    </tr>
  </table>
</template>

<style lang="scss">
.document-props {
  border-collapse: collapse;
  width: 100%;
  max-width: 800px;

  &__row:nth-child(even) {
    background: $accent-light;
  }

  &__attr,
  &__value {
    padding: 12px;
    border-top: 1px solid $border;
  }

  &__row:first-child &__attr,
  &__row:first-child &__value {
    border-top: none;
  }

  &__attr {
    font-weight: 700;
  }

  &__value {
    color: $text-grey;
    font-weight: 300;
  }
}
</style>
