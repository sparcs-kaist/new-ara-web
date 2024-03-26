import http from '@/http'

export const fetchEventList = () =>
  http.get('calendar/events/')
    .then(({ data }) => data)

export const fetchTagList = () =>
  http.get('calendar/tags/')
    .then(({ data }) => data)
