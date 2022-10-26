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
        <div v-if="isSchoolBoard" class="board-item__thumbsup">
          <span>+ {{ thumbsUp }}</span>
        </div>
        <div v-else-if="post.is_hidden" class="board-item__hidden-frame">
          <i class="material-icons">{{ hidden_icon }}</i>
        </div>
        <img
          v-else
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
          <div v-if="new_update" class="board-item__read-status">
            {{ post.read_status === 'N' ? 'new' : 'up' }}
          </div>
        </div>

        <div class="board-item__subtitle">
          <template v-if="!isSchoolBoard">
            <span>{{ timeago }}</span>
            <div>{{ $t('views') + " " + elideText(post.hit_count) }}</div>
            <div class="board-item__vote">
              <div class="board-item__vote__pos">
                +{{ post.positive_vote_count }}
              </div>
              <div class="board-item__vote__neg">
                -{{ post.negative_vote_count }}
              </div>
            </div>
          </template>
          <template v-else>
            <span>{{ post.created_by.username }}</span>
            <span>{{ timeago }}</span>
            <div>{{ $t('views') + " " + elideText(post.hit_count) }}</div>
          </template>

          <span
            v-if="!isSchoolBoard"
            :class="{ 'has-text-grey-light': post.is_hidden }"
            class="board-item__author__mobile is-hidden-tablet"
          >
            {{ post.created_by.profile.nickname }}
          </span>
        </div>
      </div>
    </div>

    <span
      v-if="!isSchoolBoard && statusText"
      :class="{ 'has-text-grey-light': post.is_hidden }"
      class="board-item__author is-hidden-mobile"
    >
      {{ post.created_by.profile.nickname }}
    </span>
    <span v-else class="board-item__author status">
      <span v-if="dday && isCommunicationAdmin" class="d-day">
        {{ dday }}
      </span>
      <div
        :class="{
          'polling': status === 0,
          'preparing': status === 1,
          'answered': status === 2
        }"
        class="status--button"
      >
        {{ statusText }}
      </div>
    </span>
  </router-link>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import Vue from 'vue'
import elideText from '@/utils/elideText'
import i18n from '@/i18n'
import { timeago } from '@/helper.js'
import { Post } from '@/types'
import { millisecondsToHours } from 'date-fns'
import { mapGetters } from 'vuex'

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
    ...mapGetters(['isCommunicationAdmin']),
    hasImage (): boolean {
      return this.post.attachment_type === 'IMAGE' || this.post.attachment_type === 'BOTH'
    },
    hasOtherAttachment (): boolean {
      return this.post.attachment_type === 'NON_IMAGE' || this.post.attachment_type === 'BOTH'
    },
    title (): string {
      const { is_hidden, why_hidden, title } = this.post
      return is_hidden ? i18n.t(why_hidden[0]).toString() : title
    },
    hidden_icon (): string {
      switch (this.post.why_hidden[0]) {
        case 'ADULT_CONTENT':
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
      const { created_at, commented_at, content_updated_at, read_status } = this.post
      const lastUpdates = [created_at, commented_at, content_updated_at]
        .map(time => new Date(time ?? 0).getTime())

      const notOver24h = millisecondsToHours(new Date().getTime() - Math.max(...lastUpdates)) < 24
      return notOver24h && (read_status === 'N' || read_status === 'U')
    },
    isSchoolBoard (): boolean {
      return this.$route.path === '/board/with-school'
    },
    thumbsUp (): number {
      return this.post.positive_vote_count
    },
    status (): number {
      return this.post.communication_article_status ?? 0
    },
    statusText (): string {
      const t = ['polling', 'preparing', 'answered'][this.status]
      return this.$t(`status.${t}`).toString()
    },
    dday (): string | undefined {
      if (this.status === 1) {
        if (this.post.days_left === 0) {
          return 'D-Day'
        } else if (this.post.days_left > 0) {
          return `D-${this.post.days_left}`
        } else {
          return '기간 경과'
        }
      }
      return undefined
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
  status:
    polling: '달성전'
    preparing: '답변 준비중'
    answered: '답변 완료'
en:
  comments: 'Reply'
  views: 'View'
  status:
    polling: 'Polling'
    preparing: 'Preparing'
    answered: 'Answered'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';

.status {
  .d-day {
    color: black;
    margin-right: 17px;
  }
  color: var(--theme-400);
  div {
    padding: 2px 5px;
    border-radius: 5px;
    width: 5rem;
    text-align: center;
  }
  .polling {
    color:var(--grey-600);
    border: var(--grey-600) solid 1px;
    background-color: white;
  }
  .preparing {
    color:var(--theme-400);
    border:var(--theme-400) solid 1px;
    background-color: white;
  }
  .answered {
    color: white;
    background-color: var(--theme-400);
  }
}

.board-item {
  color: var(--text);
  display: flex;
  padding: 8px 5px;

  &__status-badge {
    border-radius: 7px;
    padding: 2px 5px;
    color: var(--theme-400);
  }

  &__thumbsup {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    font-weight: 600;
    font-size: 15px;
    color: var(--theme-400);
  }

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
