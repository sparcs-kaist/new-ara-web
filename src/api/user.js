import http from '@/http'

export const fetchUser = (userId, onDownloadProgress) =>
  http.get(`user_profiles/${userId}/`, { onDownloadProgress })
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
