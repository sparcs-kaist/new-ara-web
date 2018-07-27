import http from '@/http.js'

export const fetchHome = () =>
  http.get('home/')
    .then(({ data }) => data)
