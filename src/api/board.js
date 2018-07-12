import http from '@/http'
import { queryBuilder } from '@/helper'

export const fetchBoardList = () =>
  http.get('boards/')
    .then(({ data }) => data)

export const fetchArticles = ({ boardId, query, page } = {}, onDownloadProgress) => {
  const context = {}
  if (boardId) context.parent_board = boardId
  if (query) context.title__contains = query
  if (page) context.page = page

  return http.get(`articles/?${queryBuilder(context)}`, { onDownloadProgress })
    .then(({ data }) => data)
}
