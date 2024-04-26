import { defineStore } from 'pinia'
import { useApi } from '@/api/useApi'
import { ref, computed } from 'vue'
import { defaultColumns } from '@/components/config'
import type { AttributesDescription } from '@/api/types'

export const useGlobalStore = defineStore('global', () => {
  const { getDescription } = useApi()
  const attrDescription = ref<AttributesDescription>({})

  const columns = computed(() =>
    attrDescription.value ?
      defaultColumns.map(({ attr, width }) => {
        return ({ 
          name: attr === 'number' ? 'Номер' : attrDescription.value[attr],
          sortable: attr !== 'number',
          attr,
          width,
        })
      }) :
      []
  )

  async function fetchDescription () {
    const { data } = await getDescription()
    attrDescription.value = data
  }

  fetchDescription()

  return { attrDescription, columns }
})
