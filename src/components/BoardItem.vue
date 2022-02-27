<template>
  <router-link
    :to="{
      name: 'post',
      params: { postId: post.id },
      query: fromQuery
    }"
    :class="{'board-item--current': current}"
    class="board-item"
  >
    <div class="board-item__body">
      <div class="board-item__image-wrapper">
        <div v-if="post.is_hidden" class="board-item__hidden-frame">
          <i class="material-icons">{{ hidden_icon }}</i>
        </div>
        <img
          v-if="!post.is_hidden"
          :src="post.created_by.profile.picture"
          class="board-item__image"
        >
      </div>

      <div class="board-item__content">
        <div class="board-item__title-wrapper">
          <div
            :title="post.title"
            :class="{ 'has-text-grey-light': post.is_hidden }"
            class="board-item__title"
          >
            <span v-if="post.parent_topic" class="board-item__topic">
              [{{ post.parent_topic[`${$i18n.locale}_name`] }}]
            </span>

            {{ title }}
          </div>
          <div v-if="post.comment_count !== 0" class="board-item__comment">
            ({{ elideText(post.comment_count) }})
          </div>
          <i v-if="hasImage" class="material-icons-outlined">
            image
          </i>
          <i v-if="hasOtherAttachment" class="material-icons-outlined">
            attach_file
          </i>
          <div
            v-if="new_update"
            class="board-item__read-status"
          >
            {{ post.read_status === 'N' ? 'new' : 'up' }}
          </div>
        </div>

        <div class="board-item__subtitle">
          <span>{{ timeago }}</span>
          <div>
            {{ $t('views') + " " + elideText(post.hit_count) }}
          </div>
          <div class="board-item__vote">
            <div class="board-item__vote__pos">
              +{{ post.positive_vote_count }}
            </div>
            <div class="board-item__vote__neg">
              -{{ post.negative_vote_count }}
            </div>
          </div>

          <span
            :class="{ 'has-text-grey-light': post.is_hidden }"
            class="board-item__author__mobile is-hidden-tablet"
          >
            {{ post.created_by.profile.nickname }}
          </span>
        </div>
      </div>
    </div>

    <span
      :class="{ 'has-text-grey-light': post.is_hidden }"
      class="board-item__author is-hidden-mobile"
    >
      {{ post.created_by.profile.nickname }}
    </span>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
import elideText from '@/utils/elideText'
import i18n from '@/i18n'
import { timeago } from '@/helper.js'
import { Post } from '@/types'

export default Vue.extend({
  name: 'BoardItem',

  props: {
    post: {
      type: Object as () => Post,
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
    hasImage (): boolean {
      return this.post.attachment_type === 'IMAGE' || this.post.attachment_type === 'BOTH'
    },
    hasOtherAttachment (): boolean {
      return this.post.attachment_type === 'NON_IMAGE' || this.post.attachment_type === 'BOTH'
    },
    title (): string {
      if (this.post.is_hidden) return i18n.t(this.post.why_hidden[0]).toString()
      return this.post.title
    },
    hidden_icon (): string {
      switch (this.post.why_hidden[0]) {
        case 'ADULT_CONTENT':
          return 'visibility_off'
        case 'SOCIAL_CONTENT':
          return 'visibility_off'
        case 'REPORTED_CONTENT':
          return 'warning'
        case 'BLOCKED_USER_CONTENT':
          return 'voice_over_off'
        default:
          return 'help_outline'
      }
    },
    timeago (): string {
      return timeago(this.post.created_at, this.$i18n.locale)
    },
    new_update (): boolean {
      // not over 24 hours after last update of the post.
      const now = new Date().getTime()
      const createdAt:number = new Date(this.post.created_at).getTime()
      let lastCommentUp:number
      let lastContentUp:number
      if (this.post.commented_at == null) {
        lastCommentUp = 0
      } else {
        lastCommentUp = new Date(this.post.commented_at).getTime()
      }
      if (this.post.content_updated_at == null) {
        lastContentUp = 0
      } else {
        lastContentUp = new Date(this.post.commented_at).getTime()
      }
      const lastUp = (lastCommentUp > lastContentUp) ? lastCommentUp : lastContentUp
      const notOver24h : boolean = ((now - lastUp) / (1000 * 3600) <= 24) || (now - createdAt) / (1000 * 3600) <= 24
      console.log(((this.post.read_status === 'N' || this.post.read_status === 'U') && notOver24h))
      return ((this.post.read_status === 'N' || this.post.read_status === 'U') && notOver24h)
    }
  },

  methods: {
    elideText: elideText(2)
  }
})
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
  padding: 8px 5px;

  &__body {
    display: flex;
    align-items: center;
    flex: 1;
  }

  &__image-wrapper{
    width: 40px;
    height: 40px;
    position: relative;
    margin-right: 14px;
  }

  &__image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
  }

  &__hidden-frame {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: lightgray;
    color: white;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__read-status{
    height: 15px;
    border-radius: 8px;
    background-color: var(--theme-400);
    color: white;
    font-size: 10px;
    padding: 0 5px;
    line-height: 1.1;
    border: 1px solid white;
    left: auto;
    right: 0;
  }

  &__content {
    flex: 1;
    width: 0;
  }

  &__title-wrapper {
    display: flex;
    align-items: center;
    padding-right: 20px;

    i {
      height: 17px;
      width: 17px;
      line-height: 17px;
      font-size: 17px;
      color: var(--grey-400);

      margin: {
        right: 3px;
      }
    }
  }

  &__title {
    font-size: 15px;
    font-weight: 500;
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 4px;

    @include breakPoint(mobile){
      font-size: 13px;
    }
  }

  &__subtitle {
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    & > * {
      color: var(--grey-400);
      display: inline-flex;
      margin-right: 10px;
      white-space: nowrap;
      font-size: 11px;
      align-items: center;
    }
  }

  &__vote{
    display: inline-flex;
    white-space: nowrap;
    font-size: 11px;

    &__pos{
      color: var(--theme-400);
      margin-right: 6px;
    }

    &__neg{
      color: #535cac;
    }

  }

  &__author {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 10px;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 500;

    &__mobile{
      white-space: nowrap;
      font-size: 11px;
      font-weight: 500;
      color: unset;
      margin-left: auto;
    }
  }

  &__topic {
    color: var(--theme-400);
    font-weight: 400;
  }

  &__comment{
    font-size: 15px;
    margin-right: 4px;
    font-weight: 500;
    color: var(--theme-400);

    @include breakPoint(mobile){
      font-size: 13px;
    }
  }

}
</style>
