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

export const reportPost = (postId) =>
  http.post('reports/', { parent_article: postId, reported_by: 1 })

export const deletePost = (postId) =>
  http.delete(`articles/${postId}`)

export const votePost = (postId, action) =>
  http.post(`articles/${postId}/${action}/`)

export const createComment = (newComment) =>
  http.post('comments/', {
    ...newComment,
    is_anonymous: false,
    attachment: null
  })

export const voteComment = (commentId, action) =>
  http.post(`comments/${commentId}/${action}/`)

export const reportComment = (commentId) =>
  http.post('reports/', { parent_comment: commentId, reported_by: 1 })

export const deleteComment = (commentId) =>
  http.delete(`comments/${commentId}`)

export const uploadAttachments = (attachments) => {
  const generateFormData = (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return formData
  }

  const httpOptions = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  /* @TODO: File type인지 체크하기 */
  if (Array.isArray(attachments)) {
    return Promise.all(
      attachments.map(attachment =>
        http.post('attachments/', generateFormData(attachment), httpOptions)
      )
    )
  }

  return http.post('attachments/', generateFormData(attachments), httpOptions)
}

export const getAttachmentUrls = ( attachmentIds ) => {
  const promises = []
  attachmentIds.forEach((id) => {
    promises.push(http.get(`attachments/${id}/`))
  })
  return Promise.all(promises)
}