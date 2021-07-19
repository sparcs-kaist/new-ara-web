<template>
  <div class="post">
    <div class="title">
      <router-link class="title__board" :to="{
        name: 'board',
        params: { boardSlug }
      }">
        <i class="material-icons title__board--icon">arrow_back_ios</i>
        <span class="title__board--name">
          {{ boardName }}
        </span>
      </router-link>
      <hr class="title__divider"/>
      <span class="title__text">
        <span class="title__topic" v-if="post.parent_topic">
          [{{ post.parent_topic[`${$i18n.locale}_name`] }}]
        </span>
        {{ title }}
        <span class="title__comments">
          ({{ post.comment_count }})
        </span>
      </span>
      <span class="title__detail">
        <span class="title__date">
          작성일 | {{ postCreatedAt }}
        </span>
        <span class="title__hit">
          조회수 | {{ post.hit_count }}
        </span>
      </span>
    </div>
    <div class="metadata">
      <router-link :to="{
        name: 'user', params: { username: postAuthorId }
      }" class="author">
        <img :src="userPictureUrl" class="author__picture"/>
        <span class="author__nickname">{{ postAuthor }}</span>
        <i class="author__icon material-icons">chevron_right</i>
      </router-link>
      <LikeButton class="metadata__like" :item="post" votable @vote="$emit('vote', $event)"/>
    </div>
    <hr class="divider" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { date } from '@/helper.js'
import LikeButton from '@/components/LikeButton.vue'

export default {
  name: 'the-post-header',
  props: {
    post: { required: true },
    context: { type: Object },
    showHidden: { type: Boolean }
  },
  data () {
    return {
      attachments: null
    }
  },
  computed: {
    userPictureUrl () {
      return this.post.created_by && this.post.created_by.profile.picture
    },
    postAuthor () {
      return this.post.created_by && this.post.created_by.profile.nickname
    },
    postAuthorId () {
      return this.post.created_by && this.post.created_by.id
    },
    postCreatedAt () {
      return date(this.post.created_at)
    },
    boardSlug () {
      return this.post.parent_board && this.post.parent_board.slug
    },
    boardName () {
      return this.post.parent_board && this.post.parent_board[`${this.$i18n.locale}_name`]
    },
    title () {
      if (this.post.is_hidden) {
        if (this.showHidden) {
          return this.post.hidden_title
        }

        return this.post.why_hidden
          .slice(0, 1)
          .map(reason => reason.detail)
          .join(' ')
      }

      return this.post.title
    },
    ...mapGetters([ 'userId' ])
  },

  components: {
    LikeButton
  }
}
</script>

<i18n>
ko:
  archive: '담아두기'
  unarchive: '담기 취소'
  edit: '수정'
  delete: '삭제'
  report: '신고'
  comments: '댓글'
  views: '조회수'
  previous: '이전글'
  next: '다음글'
  list: '목록'
  block: '사용자 차단'
  unblock: '사용자 차단해제'
  confirm-delete: '정말로 삭제하시겠습니까?'

en:
  archive: 'Bookmark'
  unarchive: 'Delete Bookmark'
  edit: 'Edit'
  delete: 'Delete'
  report: 'Report'
  comments: 'Comments'
  views: 'View'
  previous: 'Previous'
  next: 'Next'
  list: 'Posts'
  block: 'Block User'
  unblock: 'Unblock User'
  confirm-delete: 'Are you really want to delete this post?'
</i18n>

<style lang="scss" scoped>
@import "@/theme.scss";

.title {
  color: var(--grey-700);
  font-family: var(--font);
  font-size: 1.35rem;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  font-weight: 500;

  &__board {
    color: var(--theme-400);
    display: flex;
    align-items: center;

    &--icon {
      margin-right: -5px;
      font-size: 1.35rem !important;
      height: 18px;
      width: 1.35rem;
    }

    &--name {
      font-size: 18px;
      line-height: 18px;
    }
  }

  &__text {
    font-size: 18px;
  }

  &__divider {
    height: 1px;
    background-color: black;
    margin: 10px 0;
    width: 100%;
  }

  &__topic {
    color: var(--theme-400)
  }

  &__comments {
    color: var(--theme-400);
    margin-left: 5px;
  }

  &__detail {
    font-size: .9rem;
    margin-top: 12px;
    font-weight: 400;
  }

  &__date {
    margin-right: 9px;
  }
}

.metadata {
  font-family: var(--font);
  color: var(--grey-700);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 0.9rem;

  .author {
    display: flex;
    align-items: center;

    &__picture {
      width: 24px;
      height: 24px;
      font-size: 24px;
      object-fit: cover;
      border-radius: 100%;
      margin-right: 0.5rem;
    }

    &__nickname {
      line-height: 24px;
      font-weight: 500;
    }

    &__icon {
      height: 24px;
      width: 24px;
      font-size: 24px;
    }
  }

  &__like {
    height: 24px;
    font-size: 15px;
  }
}

.divider {
  margin-top: 10px;
  height: 1px;
  background-color: #f0f0f0;
}
</style>
