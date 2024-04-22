import { inject } from 'vue'
import type { AxiosInstance } from 'axios'
import type { ListDetails, DocumentAttributes, ListResponse, AttributesDescription } from './types'

function useApi () {
  const apiClient = inject<AxiosInstance>('apiClient')
  if (!apiClient) {
    throw new Error('apiClient not provided')
  }

  const getList = (body: ListDetails) => {
    return apiClient.post<ListResponse>('/data/list', body, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  const getDescription = () => {
    return apiClient.get<AttributesDescription>('/data/description')
  }

  const getDocument = (id: string) => {
    if (!id) { return Promise.resolve(undefined) }
    return apiClient.get<DocumentAttributes>(`/data/document/${id}`)
  }

  return { getList, getDescription, getDocument }
}

export { useApi }