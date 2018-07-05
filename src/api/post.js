import http from '@/http'
import { queryBuilder } from '@/helper'

export const fetchPost = ({ postId, context = {} }) =>
  http.get(`articles/${postId}?${queryBuilder(context)}`)
    .then(({ data }) => data)
