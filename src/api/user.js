import http from '@/http'

export const fetchUser = (userId) =>
  http.get(`user_profiles/${userId}/`)
    .then(({ data }) => data)
