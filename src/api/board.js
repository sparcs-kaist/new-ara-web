import http from '@/http'
import { queryBuilder } from '@/helper'

export const fetchBoardList = () =>
  http.get('boards/')
    .then(({ data }) => data)

export const fetchArticles = ({ boardId, query, page, pageSize, topicId, username, ordering, filter } = {}) => {
  const context = {}
  if (boardId) {
    if (Array.isArray(boardId)) context.parent_board__in = boardId.join(',')
    else context.parent_board = boardId
  }
  if (topicId) context.parent_topic = topicId
  if (ordering) context.ordering = ordering
  if (query) context.main_search__contains = query
  if (filter) {
    if (filter.communication_article__school_response_status !== undefined) {
      context.communication_article__school_response_status = filter.communication_article__school_response_status
    } else if (filter.communication_article__school_response_status__lt !== undefined) {
      context.communication_article__school_response_status__lt = filter.communication_article__school_response_status__lt
    }
  }
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

export const fetchAnsweredPostinTimeOrder = ({ boardId, query, page, pageSize } = {}) => {
  const context = {}
  if (query) context.main_search__contains = query
  if (page) context.page = page
  if (pageSize) context.page_size = pageSize
  context.school_response_status = 3
  return http.get(`board/${boardId}?${queryBuilder(context)}`)
    .then(({ data }) => data)
}

export const fetchUnansweredPostinTimeOrder = ({ boardId, query, page, pageSize } = {}) => {
  const context = {}
  if (query) context.main_search__contains = query
  if (page) context.page = page
  if (pageSize) context.page_size = pageSize
  context.school_response_status = 3
  return http.get(`board/${boardId}?${queryBuilder(context)}`)
    .then(({ data }) => data)
}

export const fetchAnsweredPostinPositiveOrder = ({ boardId, query, page, pageSize } = {}) => {
  const context = {}
  if (query) context.main_search__contains = query
  if (page) context.page = page
  if (pageSize) context.page_size = pageSize
  context.school_response_status = 3
  context.order = 'article__positive_vote_count'
  return http.get(`board/${boardId}?${queryBuilder(context)}`)
    .then(({ data }) => data)
}

export const fetchUnansweredPostinPositiveOrder = ({ boardId, query, page, pageSize } = {}) => {
  const context = {}
  if (query) context.main_search__contains = query
  if (page) context.page = page
  if (pageSize) context.page_size = pageSize
  context.school_response_status = 3
  context.order = 'article__positive_vote_count'
  return http.get(`board/${boardId}?${queryBuilder(context)}`)
    .then(({ data }) => data)
}

export const fetchAllPostinPositiveOrder = ({ boardId, query, page, pageSize } = {}) => {
  const context = {}
  if (query) context.main_search__contains = query
  if (page) context.page = page
  if (pageSize) context.page_size = pageSize
  context.school_response_status = 3
  context.order = 'article__positive_vote_count'
  return http.get(`board/${boardId}?${queryBuilder(context)}`)
    .then(({ data }) => data)
}

export const fetchReports = () =>
  http.get('reports/')
    .then(({ data }) => data)
