import http from '@/http.js'

export const fetchUser = (userId) =>
  http.get(`user_profiles/${userId}/`)
    .then(({ data }) => data)

export const updateUser = (userId, { nickname, picture, sexual, social }) => {
  const newSettings = new FormData()

  newSettings.append('nickname', nickname)
  newSettings.append('see_sexual', sexual)
  newSettings.append('see_social', social)

  if (picture instanceof File) {
    newSettings.append('picture', picture)
  }

  return http.patch(
    `user_profiles/${userId}/`,
    newSettings,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
}

export const fetchNotifications = () =>
  http.get('notifications/')
    .then(({ data }) => data)

export const fetchBlocks = () =>
  http.get('blocks/')
    .then(({ data }) => data)
