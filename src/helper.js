import { differenceInDays, differenceInHours, differenceInMinutes, format, formatDistance, formatDistanceStrict } from 'date-fns'
import { kr } from 'date-fns/locale'

export const timeago = dateString => {
  const now = new Date()
  const date = new Date(dateString)

  if(differenceInDays(now, date) >= 7)
    return format(date, 'PP')

  if(differenceInHours(now, date) >= 24)
    return formatDistanceStrict(now, date, { unit: 'day' })

  if(differenceInMinutes(now, date) >= 60)
    return formatDistanceStrict(now, date, { unit: 'hour' })

  return formatDistanceStrict(now, date, { unit: 'minute', roundingMethod: 'ceil' })
}

export const date = timeString => {
  const time = new Date(timeString)
  return `${time.getMonth() + 1}월 ${time.getDate()}일`
}

export const range = (m, n = null) => {
  if (n === null) return [...Array(m).keys()].map(i => i + 1)
  if (m < n) return [...Array(n - m + 1).keys()].map(i => i + m)
  if (m > n) return [...Array(m - n + 1).keys()].reverse().map(i => i + n)
  return [m]
}

export const queryBuilder = context =>
  Object.keys(context)
    .map(key => `${key}=${context[key]}`)
    .join('&')
