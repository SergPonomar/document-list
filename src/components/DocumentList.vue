<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/global'
import { formatDate } from '@/utils'
import { useRouter } from 'vue-router'
import { useApi } from '@/api/useApi'
import type { DocumentAttributes } from '@/api/types'

const { attrDescription } = storeToRefs(useGlobalStore())

const defaultColumns = [
  { attr: 'number', width: 70 },
  { attr: 'ssa_name', width: 250 },
  { attr: 'sdta_create_date', width: 160 },
  { attr: 'sdta_date_approval', width: 160 },
  { attr: 'ssa_category', width: 200 },
  { attr: 'ssa_parent_kind_name', width: 200 },
  { attr: 'ssa_kind_name', width: 200 },
  { attr: 'ssa_doc_life_cycle_value', width: 160 }
]

const columns = computed(() =>
  attrDescription.value ?
    defaultColumns.map(({ attr, width }) => {
      return ({ 
        name: attr === 'number' ? 'Номер' : attrDescription.value[attr],
        width
      })
    }) :
    []
)

const router = useRouter()
const toDocument = (documentId: string) => {
  router.push(`/documents/${documentId}`)
}

const useFetchNext = () => {
  const loading = ref(false)
  const error = ref()
  const itemsPerLoad = 20
  let size = Infinity
  let offset = 0
  const attributes = ref<DocumentAttributes[]>([])
  const { getList } = useApi()

  const fetchNext = async () => {
    if (offset >= size) { return }
    try {
      const body = {
        attributes: defaultColumns.map(({attr}) => attr),
        order: {
          attr: 'ssa_name',
          asc: true
        },
        size: itemsPerLoad,
        offset
      }
      loading.value = true
      const { data } = await getList(body)
      attributes.value = attributes.value.concat(data.atributes)
      size = data.size
      offset += itemsPerLoad
      loading.value = false
    } catch (e) {
      error.value = e
    }
  }

  return { fetchNext, attributes, loading, error }
}

const { fetchNext, attributes } = useFetchNext()

const anchor = ref()
onMounted(() => {
  const marginBottom = -window.innerHeight + 1.2 * 1080
  const observer = new IntersectionObserver(
    ([{ isIntersecting }], _observerElement) => {
      if (isIntersecting) {
        fetchNext()
      }
    },
    {
      rootMargin: `0px 0px ${marginBottom}px 0px`,
      threshold: 0.0
    }
  )
  observer.observe(anchor.value)
})
</script>

<template>
  <div class="document-list">
    <table
      v-if="columns.length && attributes.length"
      class="document-list__table"
    >
      <colgroup>
        <col
          v-for="{ name, width } in columns"
          :key="name"
          span="1"
          :style="{ width: `${width}px` }"
        >
      </colgroup>
      <tr class="document-list__row">
        <th
          v-for="{ name } in columns"
          :key="name"
          class="document-list__head"
        >
          {{ name }}
        </th>
      </tr>
      <tr
        v-for="attrs in attributes"
        :key="attrs.number as number"
        class="document-list__row"
        @click="toDocument(attrs['r_object_id'] as string)"
      >
        <td
          v-for="{ attr } in defaultColumns"
          :key="attr"
          class="document-list__cell"
        >
          {{ formatDate(attr, attrs[attr]) }}
        </td>
      </tr>
    </table>
    <div ref="anchor" />
  </div>
</template>

<style lang="scss">
.document-list {
  line-height: 120%;

  &__table {
    border-collapse: collapse;
    position: relative;
    table-layout: fixed; 
    width: 100%;
  }

  &__head {
    text-align: left;
    padding: 20px 10px;
    font-weight: 700;
    vertical-align: bottom;
    white-space: nowrap;
    letter-spacing: -0.02em;
    position: sticky;
    top: 0;
    background: #cce4ff;

    &:first-child {
      border-top-left-radius: 10px;
    }

    &:last-child {
      border-top-right-radius: 10px;
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: -1px;
      left: 0px;
      background: $border;
    }
  }

  &__row {
    transition: background 0.3s ease;

    &:not(:first-child) {
      cursor: pointer;

      &:hover {
        background: $accent-light;
      }
    }
  }

  &__cell {
    padding: 10px;
    border-top: 1px solid $border;
    color: $text-grey;
    font-weight: 300;
  }
}
</style>
