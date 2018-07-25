import http from '@/http.js'

export const fetchHome = (onDownloadProgress) =>
  http.get('home/', { onDownloadProgress })
    .then(({ data }) => data)
