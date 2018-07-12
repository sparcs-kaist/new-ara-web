import http from '@/http'
import { queryBuilder } from '@/helper'

export const fetchPost = ({ postId, context = {} }, onDownloadProgress) =>
  http.get(`articles/${postId}/?${queryBuilder(context)}`, { onDownloadProgress })
    .then(({ data }) => data)
