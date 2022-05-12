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
        {{ notification.content }}
      </h3>
      <div class="noti__related">
        <div class="noti__subcomment-container">
          <div>
            [{{ boardName }}] {{ relatedArticle }}
            <p v-if="isSubcomment" class="noti__content">
              [{{ $t('comment') }}] {{ relatedComment }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
import { timeago } from '@/helper'
import { Notification } from '@/types'

export default Vue.extend({
  name: 'AlarmPopupNotifications',

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
  comment: '댓글 내용'
en:
  comment: 'Comment'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';
.noti {
  padding: 15px;
  display: flex;
  border-top: 1px solid lightgrey;
  @include breakPoint(min) {
    border: 0px;
  }

  &:first-child {
    border-top: 0px;
  }

  &:last-child {
    border-bottom: 1px solid lightgrey;
    @include breakPoint(min) {
      border: 0px;
    }
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
    font-weight: 700;
    font-size: 14px;
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
    height: 20px;
    width: 20px;
    font-size: 12px;
    color: white;
    background-color: var(--theme-400);
    border-radius: 15px;
    text-align: center;
    line-height: 20px;

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
