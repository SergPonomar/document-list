import type { Attribute } from '@/api/types'

const formatDate = (attr: Attribute, value: string | number | null) => {
  if (attr.startsWith('sdta') && typeof value === 'string') {
    const date = new Date(value)
    return new Intl.DateTimeFormat('ru-RU').format(date)
  }
  return value
}

export { formatDate }