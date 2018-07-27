import http from '@/http.js'
import { queryBuilder } from '@/helper.js'

export const fetchPost = ({ postId, context = {} }) =>
  http.get(`articles/${postId}/?${queryBuilder(context)}`)
    .then(({ data }) => data)

export const createPost = ({ boardId, newArticle }) =>
  http.post('articles/', {
    ...newArticle,
    is_anonymous: false,
    is_content_sexual: false,
    is_content_social: false,
    parent_board: boardId
  })

export const updatePost = ({ postId, newArticle }) =>
  http.put(`articles/${postId}/`, {
    ...newArticle,
    is_content_sexual: false,
    is_content_social: false
  })

export const archivePost = (postId) =>
  http.post('scraps/', { parent_article: postId })

export const createComment = (newComment) =>
  http.post('comments/', {
    ...newComment,
    is_anonymous: false,
    attachment: null
  })
