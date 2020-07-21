import { differenceInDays, differenceInHours, differenceInMinutes, format, formatDistance, formatDistanceStrict } from 'date-fns'
import { enUS, ko } from 'date-fns/locale'

export const timeago = (dateString, localeString) => {
  const now = new Date()
  const date = new Date(dateString)
  const locale = localeString === 'ko' ? ko : enUS

  if(differenceInDays(now, date) >= 7)
    return format(date, 'PP', { locale })

  if(differenceInHours(now, date) >= 24)
    return formatDistanceStrict(now, date, { unit: 'day', locale })

  if(differenceInMinutes(now, date) >= 60)
    return formatDistanceStrict(now, date, { unit: 'hour', locale })

  return formatDistanceStrict(now, date, { unit: 'minute', roundingMethod: 'ceil', locale })
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
