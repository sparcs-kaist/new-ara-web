import Timeago from 'timeago.js'

Timeago.register('ko_KR', (number, index) => [
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

export const timeago = Timeago(null, 'ko_KR')

export const date = timeString => {
  const time = new Date(timeString)
  return `${time.getMonth()}월 ${time.getDate()}일`
}

export const range = n => [...Array(n).keys()].map(i => i + 1)

export const queryBuilder = context =>
  Object.keys(context)
    .map(key => `${key}=${context[key]}`)
    .join('&')
