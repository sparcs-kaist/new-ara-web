import http from '@/http'
import { queryBuilder } from '@/helper'

export const fetchMe = () =>
  http.get('me')
    .then(({ data }) => data)

export const updateFCMToken = (token) =>
  http.patch('fcm_token/update', { token })
    .then(({ data }) => data)

export const deleteFCMToken = (token) =>
  http.patch('fcm_token/delete', { token })
    .then(({ data }) => data)

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

export const blockUser = (userId) =>
  http.post('/blocks/', { user: userId })

export const unblockUser = (userId) =>
  http.post('/blocks/without_id/', { blocked: userId })

export const fetchNotifications = ({ query: { page } }) => {
  const context = {}
  if (page) context.page = page
  return http.get(`notifications/?${queryBuilder(context)}`)
    .then(({ data }) => data)
}
export const fetchUnreadNotifications = ({ query: { page } }) => {
  const context = {}
  if (page) context.page = page
  return http.get(`notifications/?${queryBuilder(context)}&is_read=0`)
    .then(({ data }) => data)
}
export const readNotification = (notiId) =>
  http.post(`notifications/${notiId}/read/`)
    .then(({ data }) => data)

export const fetchBlocks = () =>
  http.get('blocks/')
    .then(({ data }) => data)

export const deleteBlock = (blockId) =>
  http.delete(`blocks/${blockId}/`)

export const updateDarkMode = (userId, darkMode) =>
  http.patch(`user_profiles/${userId}/`, { extra_preferences: { darkMode } })
    .then(({ data }) => data)

export const updateTos = (userId) =>
  http.patch(`/user_profiles/${userId}/agree_terms_of_service/`)
    .then(({ data }) => data)

export const logout = (userId) =>
  http.delete(`/users/${userId}/sso_logout/`)
    .then(({ data }) => data)
