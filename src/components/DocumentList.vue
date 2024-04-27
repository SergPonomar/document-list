<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/global'
import { useFilterStore } from '@/stores/filter'
import { formatDate } from '@/utils'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '@/api/useApi'
import SortComponent from '@/components/sort/SortComponent.vue'
import AnchorComponent from '@/components/AnchorComponent.vue'
import FilterModal from '@/components/filter/FilterModal.vue'
import type { DocumentAttributes, Sort } from '@/api/types'

const emit = defineEmits(['countChange'])

const { columns } = storeToRefs(useGlobalStore())

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
  const { activeSort } = useSortParam()
  const { selectedFilters } = useFilters()

  const fetchNext = async () => {
    if (offset >= size) { return }
    const defaultSort: Sort = { attr: 'ssa_name', asc: true }
    try {
      const body = {
        attributes: columns.value.map(({ attr }) => attr),
        order: activeSort.value || defaultSort,
        size: itemsPerLoad,
        filters: selectedFilters.value.flat(),
        offset
      }
      loading.value = true
      const { data } = await getList(body)
      attributes.value = attributes.value.concat(data.atributes)
      size = data.size
      offset += itemsPerLoad
      loading.value = false
      emit('countChange', size)
    } catch (e) {
      error.value = e
    }
  }

  const resetAttributes = () => {
    offset = 0
    size = Infinity
    attributes.value = []
    if (!loading.value) { resetAnchor() }
  }

  function useSortParam () {
    const route = useRoute()
    const sortParam = [route.query.sort]
      .map(pr => Array.isArray(pr) ? pr[0] : pr)
      .map(pr => pr || '')
      .map(pr => pr.split(/^-/).reverse())
      .map(srt => srt[0] && columns.value.map(({ attr }) => attr).includes(srt[0]) ? ({
        attr: srt[0],
        asc: srt.length === 1
      }) : undefined )[0]
    const activeSort = ref(sortParam)

    watch(activeSort, sort => {
      const query = JSON.parse(JSON.stringify(route.query))
      if (sort) {
        const { attr, asc } = sort
        query.sort = (asc? '' : '-') + attr
      } else {
        query.sort = undefined
      }
      router.replace({ query })
      resetAttributes()
    })

    return { activeSort }
  }

  function useFilters () {
    const { selectedFilters, refetch } = storeToRefs(useFilterStore())

    watch(refetch, rf => {
      if (rf) {
        resetAttributes()
      }
    })

    return { selectedFilters }
  }

  return { fetchNext, attributes, loading, error, activeSort, resetAttributes }
}

const { fetchNext, attributes, activeSort } = useFetchNext()

const resetKey = ref(1)
const resetAnchor = () => {
  resetKey.value++
}
</script>

<template>
  <div class="document-list">
    <table
      v-if="columns.length"
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
          v-for="{ name, attr, sortable } in columns"
          :key="name"
          class="document-list__head"
          :class="{'document-list__head_non-sort': !sortable}"
        >
          <SortComponent
            v-if="sortable"
            class="document-list__sort"
            :active-sort="activeSort"
            :sort-attr="attr"
            @sort="activeSort = $event"
          />
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
          v-for="{ attr } in columns"
          :key="attr"
          class="document-list__cell"
        >
          {{ formatDate(attr, attrs[attr]) }}
        </td>
      </tr>
    </table>
    <AnchorComponent
      :key="resetKey"
      @fetch-next="fetchNext"
    />
  </div>
  <FilterModal />
</template>

<style lang="scss">
.document-list {
  line-height: 120%;
  overflow-x: auto;

  &__table {
    border-collapse: collapse;
    position: relative;
    table-layout: fixed; 
    width: 100%;
  }

  &__sort {
    position: absolute;
    left: 3px;
    top: 50%;
    transform: translateY(-50%);
  }

  &__head {
    text-align: left;
    padding: 20px 10px 20px 26px;
    font-weight: 700;
    vertical-align: bottom;
    white-space: nowrap;
    letter-spacing: -0.02em;
    position: sticky;
    top: 0;
    background: $label;

    &-content {
      display: flex;
      justify-content: space-between;
    }

    &_non-sort {
      padding-left: 10px;
    }

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

    &:not(:first-of-type) {
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
