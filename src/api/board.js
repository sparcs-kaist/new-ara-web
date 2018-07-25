import http from '@/http.js'
import { queryBuilder } from '@/helper.js'

export const fetchBoardList = () =>
  http.get('boards/')
    .then(({ data }) => data)

export const fetchArticles = ({ boardId, query, page, username } = {}, onDownloadProgress) => {
  const context = {}
  if (boardId) context.parent_board = boardId
  if (query) context.title__contains = query
  if (page) context.page = page
  if (username) context.created_by__profile__username = username

  return http.get(`articles/?${queryBuilder(context)}`, { onDownloadProgress })
    .then(({ data }) => data)
}
