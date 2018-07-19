import { range, queryBuilder } from '@/helper.js'

describe('helper.js', () => {
  it('range 함수가 1에서 인자까지의 array를 반환함', () => {
    expect(range(5)).toEqual([1, 2, 3, 4, 5])
  })

  it('queryBuilder 함수가 url query string을 만듬', () => {
    expect(queryBuilder({ a: 0, b: 42 })).toEqual('a=0&b=42')
  })

  // it('queryBuilder 함수가 escape를 잘 함', () => {
  //   expect(queryBuilder({ a: '검색&', b: 42 })).toEqual('a=검색&&b=42')
  // })
})
