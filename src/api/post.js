import http from '@/http.js'
import { queryBuilder } from '@/helper.js'

export const fetchPost = ({ postId, context = {} }, onDownloadProgress) =>
  http.get(`articles/${postId}/?${queryBuilder(context)}`, { onDownloadProgress })
    .then(({ data }) => data)

export const createPost = ({ boardId, newArticle }) =>
  http.post('articles/', {
    ...newArticle,
    is_anonymous: false,
    is_content_sexual: false,
    is_content_social: false,
    use_signature: false,
    parent_board: boardId
  })

export const updatePost = ({ postId, newArticle }) =>
  http.put(`articles/${postId}/`, {
    ...newArticle,
    is_content_sexual: false,
    is_content_social: false
  })
