<template>
  <router-link
  :to="{
      name: 'post',
      params: { postId: post.id },
      query: fromQuery
  }"
  class="board-item"
  :class="{'board-item--current': current}">
    <div class="board-item__body">
      <img class="board-item__image" :src="post.created_by.profile.picture">

      <div class="board-item__content">
        <div class="board-item__header">
          <span class="board-item__author">
            {{ post.created_by.profile.nickname }}
          </span>

          <Timeago class="board-item__time" :time="post.created_at" />
        </div>

        <div class="board-item__title-wrapper">
          <div class="board-item__title">
            {{ post.title }}
          </div>
        </div>
      </div>
    </div>

    <div class="post-status">
      <LikeButton class="post-status__like" :item="post" table elide votable @vote="$emit('vote', $event)"/>

      <div class="post-status__comment">
        <span class="post-status__label">
          {{ $t('comments') }}
        </span>

        {{ elideText(post.nested_comments_count) }}
      </div>

      <div class="post-status__view">
        <span class="post-status__label">
          {{ $t('views') }}
        </span>

        {{ elideText(post.hit_count) }}
      </div>
    </div>
  </router-link>
</template>

<script>
import elideText from '@/utils/elideText'
import LikeButton from '@/components/LikeButton.vue'
import Timeago from '@/components/Timeago.vue'

export default {
  name: 'BoardItem',
  props: {
    post: {
      type: Object,
      required: true
    },

    fromQuery: {
      type: Object,
      default () {
        return { from_view: 'all' }
      }
    },

    current: Boolean
  },
  methods: {
    elideText: elideText(2)
  },
  components: {
    LikeButton,
    Timeago
  }
}
</script>

<i18n>
ko:
  comments: '댓글'
  views: '조회수'

en:
  comments: 'Reply'
  views: 'View'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';

.board-item {
  color: var(--text);
  display: flex;
  margin: 20px 0;

  @include breakPoint(min) {
    flex-direction: column;

    &:last-child {
      border-bottom: 1px solid var(--grey-200);
    }
  }

  &__body {
    display: flex;
    flex: 1;
  }

  &__image {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    margin-right: 20px;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  &__author {
    font-size: .9rem;
    margin-right: 14px;
  }

  &__time {
    color: var(--grey-400);
    font-size: .8rem;
  }

  &__title-wrapper {
    display: flex;
  }

  &__title {
    font-size: 1rem;
    font-weight: 500;
    flex: 1 1 0;
    width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.post-status {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;

  & > * {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 10px;
    white-space: nowrap;
    font-size: .9rem;

    &:not(.post-status__like) {
      width: 4.5rem;
      overflow: hidden;

      @include breakPoint(min) {
        width: auto;
      }
    }
  }

  &__label {
    font-weight: 500;
    margin-right: 4px;
  }
}
</style>
