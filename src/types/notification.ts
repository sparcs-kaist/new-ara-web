/* eslint-disable camelcase */
type RelatedArticle = {
  comment_count: number,
  commented_at: string,
  content_updated_at: string,
  created_at: string,
  created_by: number
  deleted_at: string
  hidden_at: string
  hit_count: number,
  id: number,
  name_type: number,
  is_content_sexual: boolean,
  is_content_social: boolean,
  negative_vote_count: number,
  parent_board: number,
  parent_topic: any,
  positive_vote_count: number,
  report_count: number,
  title: string
  updated_at: string
  url: string
}

type RelatedComment = {
  content: string,
  created_at: string,
  created_by: number,
  deleted_at: string,
  hidden_at: string,
  id: number,
  name_type: number,
  negative_vote_count: number,
  parent_article: Object,
  parent_comment: number,
  positive_vote_count: number,
  report_count: number,
  updated_at: string,
}

export type Notification = {
  content: string,
  created_at: string,
  deleted_at: string,
  id: number,
  is_read: boolean,
  related_article: RelatedArticle,
  related_comment?: RelatedComment,
  title: string,
  type: 'article_commented' | 'comment_commented',
  updated_at: string
}
