/* eslint-disable camelcase */
type WhyHidden = 'ADULT_CONTENT' | 'SOCIAL_CONTENT' | 'REPORTED_CONTENT' | 'BLOCKED_USER_CONTENT'
type Attachment = 'NONE' | 'IMAGE' | 'NON_IMAGE' | 'BOTH'

export type Post = {
  attachment_type: Attachment,
  can_override_hidden: boolean,
  comment_count: number,
  commented_at: string,
  communication_article_status: 0 | 1 | 2,
  content_updated_at: string,
  created_at: string,
  created_by: {
    id: string,
    profile: {
      nickname: string,
      picture: string,
      user: string
    },
    username: string
  }
  deleted_at: string,
  hidden_at: string,
  hit_count: number,
  id: number,
  name_type: number,
  is_content_sexual: boolean,
  is_content_social: boolean,
  is_hidden: boolean,
  negative_vote_count: number
  parent_board: any,
  parent_topic: any,
  positive_vote_count: number,
  read_status: string,
  report_count: number,
  title: string,
  updated_at: string,
  url: string,
  why_hidden: WhyHidden[]
}
