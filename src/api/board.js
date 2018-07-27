import http from '@/http.js'
import { queryBuilder } from '@/helper.js'

export const fetchBoardList = () =>
  http.get('boards/')
    .then(({ data }) => data)

export const fetchArticles = ({ boardId, query, page, username } = {}) => {
  const context = {}
  if (boardId) context.parent_board = boardId
  if (query) context.title__contains = query
  if (page) context.page = page
  if (username) context.created_by__profile__nickname = username

  return http.get(`articles/?${queryBuilder(context)}`)
    .then(({ data }) => data)
}

export const fetchArchives = () =>
  http.get('scraps/')
    .then(({ data }) => data)
