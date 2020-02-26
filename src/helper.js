import i18n from '@/i18n.js'
import { register } from 'timeago.js'

register('ko', (number, index) => [
  ['방금', '곧'],
  ['%s초 전', '%s초 후'],
  ['1분 전', '1분 후'],
  ['%s분 전', '%s분 후'],
  ['1시간 전', '1시간 후'],
  ['%s시간 전', '%s시간 후'],
  ['1일 전', '1일 후'],
  ['%s일 전', '%s일 후'],
  ['1주일 전', '1주일 후'],
  ['%s주일 전', '%s주일 후'],
  ['1개월 전', '1개월 후'],
  ['%s개월 전', '%s개월 후'],
  ['1년 전', '1년 후'],
  ['%s년 전', '%s년 후']
][index])

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const date = timeString => {
  const time = new Date(timeString)
  const locale = i18n.locale.split(/-_/).shift()

  switch (locale) {
    case 'ko':
      return `${time.getMonth() + 1}월 ${time.getDate()}일`

    case 'en':
      return `${month[time.getMonth()]} ${time.getDate()}`
  }
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
