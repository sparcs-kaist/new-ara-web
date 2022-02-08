<template>
  <router-link
    :to="{
      name: 'post',
      params: {
        postId: notification.related_article.id,
        notiId: notification.id
      },
      query: { from_view: 'all' }
    }"
    :class="{ 'is-read' : isRead }"
    class="noti"
  >
    <i class="noti__icon material-icons-outlined">chat</i>
    <div class="noti__container">
      <h3 class="noti__title">
        {{ $t(isSubcomment ? 'comment-title' : 'article-title') }}
      </h3>
      <p class="noti__content">
        {{ notification.content }}
      </p>
      <div class="noti__related">
        <div class="noti__subcomment-container">
          <div>{{ $t('article') }}: [{{ boardName }}] {{ relatedArticle }}</div>
          <i
            v-if="!isSubcomment"
            class="noti__subcomment-icon material-icons-outlined"
          >
            chat
          </i>
        </div>
        <div v-if="isSubcomment">
          {{ $t('comment') }}: {{ relatedComment }}
        </div>
      </div>
    </div>
    <p class="noti__time">
      {{ timeago(notification.created_at, $i18n.locale) }}
    </p>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
import { timeago } from '@/helper'
import { Notification } from '@/types'

export default Vue.extend({
  name: 'Notification',

  props: {
    notification: {
      type: Object as () => Notification,
      required: true
    }
  },

  computed: {
    isRead (): boolean {
      return this.notification.is_read
    },
    isSubcomment (): boolean {
      return this.notification.type === 'comment_commented'
    },
    relatedArticle (): string {
      return this.notification.related_article.title
    },
    relatedComment (): string | undefined {
      return this.notification.related_comment?.content
    },
    boardName (): string {
      return this.$store.getters.getNameById(
        this.notification.related_article.parent_board,
        this.$i18n.locale
      )
    }
  },

  methods: { timeago }
})
</script>

<i18n>
ko:
  article-title: '회원님의 게시물에 새로운 댓글이 작성되었습니다.'
  comment-title: '회원님의 댓글에 새로운 댓글이 작성되었습니다.'
  article: '게시글'
  comment: '댓글 내용'
en:
  article-title: 'New comment to your post.'
  comment-title: 'New subcomment to your comment.'
  article: 'Article'
  comment: 'Comment'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';
.noti {
  padding: 15px 0;
  display: flex;
  border-top: 1px solid grey;

  &:first-child {
    border-top: 1px solid black;
  }

  &:last-child {
    border-bottom: 1px solid black;
  }

  &__container {
    display: flex;
    flex-flow: column;
    margin-left: 10px;

    @media (max-width: 385px) {
      max-width: 200px;
    }
  }

  &__title {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 5px;

    @include breakPoint(mobile) {
      font-size: 13px;
    }
  }

  &__content {
    font-size: 14px;
    margin-bottom: 5px;
  }

  &__icon {
    height: 30px;
    width: 30px;
    font-size: 20px;
    color: white;
    background-color: var(--theme-400);
    border-radius: 15px;
    text-align: center;
    line-height: 30px;

    @include breakPoint(mobile) {
      height: 20px;
      width: 20px;
      font-size: 15px;
      line-height: 20px;
    }
  }

  &__related--container {
    display: flex;
    flex-flow: row;
  }

  &__related {
    border-left: 2px solid black;
    font-size: 14px;
    line-height: 20px;
    padding-left: 10px;
  }

  &__subcomment-icon {
    margin-left: 20px;

    @include breakPoint(mobile) {
      font-size: 20px;
    }
  }

  &__time {
    flex: 1;
    text-align: right;
    font-size: 12px;
    color: grey;
  }

  &__subcomment-container {
    display: flex;
    flex-flow: row;
  }
}

.is-read {
  .noti {
    &__title {
      color: var(--grey-400);;
    }

    &__icon {
      background-color: var(--grey-400);
    }
  }
}
</style>
