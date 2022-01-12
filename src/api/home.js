import http from '@/http'

export const fetchHome = () =>
  http.get('home/')
    .then(({ data }) => data)
