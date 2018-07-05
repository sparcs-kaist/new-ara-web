import http from '@/http'

export const fetchBoardList = () =>
  http.get('boards/')
    .then(({ data }) => data)

export const fetchArticles = (boardId, page = 1) =>
  http.get(`articles/?parent_board=${boardId}&page=${page}`)
    .then(({ data }) => data)
