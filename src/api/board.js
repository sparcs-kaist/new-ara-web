import http from '@/http'
import { queryBuilder } from '@/helper'

export const fetchBoardList = () =>
  http.get('boards/')
    .then(({ data }) => data)

export const fetchArticles = (context = {}, onDownloadProgress) =>
  http.get(`articles/?${queryBuilder(context)}`, { onDownloadProgress })
    .then(({ data }) => data)
