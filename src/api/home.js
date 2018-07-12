import http from '@/http'

export const fetchHome = (onDownloadProgress) =>
  http.get('home/', { onDownloadProgress })
    .then(({ data }) => data)
