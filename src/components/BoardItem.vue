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
          <div class="board-item__title" :title="post.title">
            <span class="board-item__topic" v-if="post.parent_topic">
              [{{ post.parent_topic[`${$i18n.locale}_name`] }}]
            </span>

            {{ title }}
          </div>

          <div class="board-item__new" v-if="post.read_status === 'N'">
            {{ $t('new') }}
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
  computed: {
    title () {
      if (this.post.is_hidden) {
        return this.post.why_hidden.map(v => v.detail).join('\n')
      }

      return this.post.title
    }
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
  new: 'new'

en:
  comments: 'Reply'
  views: 'View'
  new: 'new'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';

.board-item {
  color: var(--text);
  display: flex;
  margin: 20px 0;

  @include breakPoint(mid) {
    flex-direction: column;

    &:last-child {
      border-bottom: 1px solid var(--grey-200);
    }
  }

  &__body {
    display: flex;
    align-items: center;
    flex: 1;
  }

  &__image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex: 0 0 auto;

    margin-right: 20px;
  }

  &__content {
    flex: 1;
    width: 0;
    margin-right: 10px;
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
    align-items: center;
  }

  &__title {
    font-size: 1rem;
    font-weight: 500;
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__topic {
    color: var(--grey-400);
    font-weight: 400;
  }

  &__new {
    color: var(--theme-400);
    font-size: .8rem;
    font-weight: 500;
    margin-left: 5px;
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
    font-weight: 400;

    &:not(.post-status__like) {
      width: 4.5rem;
      overflow: hidden;

      @include breakPoint(mid) {
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
