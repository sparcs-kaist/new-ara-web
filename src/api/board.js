import http from '@/http.js'
import { queryBuilder } from '@/helper.js'

export const fetchBoardList = () =>
  http.get('boards/')
    .then(({ data }) => data)

export const fetchArticles = ({boardId, query, page, pageSize, topicId, username} = {}) => {
  const context = {}
  if (boardId) {
    if (Array.isArray(boardId)) context.parent_board__in = boardId.join(',')
    else context.parent_board = boardId
  }
  if (topicId) context.parent_topic = topicId
  if (query) context.main_search__contains = query
  if (page) context.page = page
  if (pageSize) context.page_size = pageSize
  if (username) context.created_by = username

  return http.get(`articles/?${queryBuilder(context)}`)
    .then(({ data }) => data)
}

export const fetchArchives = ({ query, page, pageSize } = {}) => {
  const context = {}
  if (query) context.main_search__contains = query
  if (page) context.page = page
  if (pageSize) context.page_size = pageSize

  return http.get(`scraps/?${queryBuilder(context)}`)
    .then(({ data }) => data)
}

export const fetchArchivedPosts = (...args) =>
  fetchArchives(...args)
    .then(archive => ({
      ...archive,
      results: archive.results &&
        archive.results
          .map(({ parent_article: article }) => article)
    }))

export const fetchRecentViewedPosts = ({ query, page, pageSize } = {}) => {
  const context = {}
  if (query) context.main_search__contains = query
  if (page) context.page = page
  if (pageSize) context.page_size = pageSize

  return http.get(`articles/recent/?${queryBuilder(context)}`)
    .then(({ data }) => data)
}

export const fetchReports = () =>
  http.get('reports/')
    .then(({ data }) => data)
