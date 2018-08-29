import { range, queryBuilder } from '@/helper.js'

describe('helper.js', () => {
  it('range 함수가 1에서 인자까지의 array를 반환함', () => {
    expect(range(5)).toEqual([1, 2, 3, 4, 5])
  })

  it('인자가 두 개이고 첫 번째 인자가 두 번째 인자보다 클 경우, range 함수가 첫 번째 인자부터 두 번째 인자까지의 오름차순 array를 반환함', () => {
    expect(range(4, 7)).toEqual([4, 5, 6, 7])
  })

  it('인자가 두 개이고 첫 번째 인자가 두 번째 인자보다 클 경우, range 함수가 첫 번째 인자부터 두 번째 인자까지의 내림차순 array를 반환함\'', () => {
    expect(range(6, 2)).toEqual([6, 5, 4, 3, 2])
  })

  it('queryBuilder 함수가 url query string을 만듬', () => {
    expect(queryBuilder({ a: 0, b: 42 })).toEqual('a=0&b=42')
  })

  // it('queryBuilder 함수가 escape를 잘 함', () => {
  //   expect(queryBuilder({ a: '검색&', b: 42 })).toEqual('a=검색&&b=42')
  // })
})
