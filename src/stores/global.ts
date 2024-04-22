import { defineStore } from 'pinia'
import { useApi } from '@/api/useApi'
import { ref } from 'vue'
import type { AttributesDescription } from '@/api/types'

export const useGlobalStore = defineStore('global', () => {
  const { getDescription } = useApi()
  const attrDescription = ref<AttributesDescription>({})

  async function fetchDescription () {
    const { data } = await getDescription()
    attrDescription.value = data
  }

  fetchDescription()

  return { attrDescription }
})
