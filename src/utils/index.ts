import type { Attribute } from '@/api/types'

const formatDate = (attr: Attribute, value: string | number | null) => {
  if (attr.startsWith('sdta') && typeof value === 'string') {
    const date = new Date(value)
    return new Intl.DateTimeFormat('ru-RU').format(date)
  }
  return value
}

function rfc3339(date: Date) {
  function pad(n: number) {
    return `${n}`.padStart(2, '0')
  }

  function timezoneOffset(offset: number) {
    if (offset === 0) {
      return 'Z'
    }

    const sign = offset > 0 ? '-' : '+'
    offset = Math.abs(offset)

    return sign + pad(Math.floor(offset / 60)) + ':' + pad(offset % 60)
  }

  return (
    date.toISOString().slice(0, -5) + 
    timezoneOffset(date.getTimezoneOffset())
  )
}

export { formatDate, rfc3339 }