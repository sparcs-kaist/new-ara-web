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
      <div class="board-item__image-wrapper">
        <div class="board-item__hidden-frame" v-if="post.is_hidden">
          <i class="material-icons">{{ hidden_icon }}</i>
        </div>
        <img class="board-item__image" :src="post.created_by.profile.picture" v-if="!post.is_hidden">
      </div>

      <div class="board-item__content">
        <div class="board-item__title-wrapper">
          <div class="board-item__title" :title="post.title" :class="hidden_grey">
            <span class="board-item__topic" v-if="post.parent_topic">
              [{{ post.parent_topic[`${$i18n.locale}_name`] }}]
            </span>

            {{ title }}
          </div>
          <div class="board-item__comment" v-if="post.comment_count !== 0">
            ({{ elideText(post.comment_count) }})
          </div>
          <div class="board-item__read-status" v-if="post.read_status === 'N' || post.read_status === 'U'"> {{post.read_status === 'N' ? 'new' : 'up'}} </div>
        </div>

        <div class="board-item__subtitle">
          <Timeago :time="post.created_at" />
          <div>
            {{ $t('views') + " " + elideText(post.hit_count) }}
          </div>
          <div class="board-item__vote">
            <div class="board-item__vote__pos">+{{post.positive_vote_count}}</div>
            <div class="board-item__vote__neg">-{{post.negative_vote_count}}</div>
          </div>

          <span class="board-item__author__mobile is-hidden-tablet" :class="hidden_grey">
            {{ post.created_by.profile.nickname }}
          </span>

        </div>
      </div>
    </div>

    <span class="board-item__author is-hidden-mobile" :class="hidden_grey">
      {{ post.created_by.profile.nickname }}
    </span>
  </router-link>
</template>

<script>
import elideText from '@/utils/elideText'
import LikeButton from '@/components/LikeButton.vue'
import Timeago from '@/components/Timeago.vue'
import i18n from '@/i18n'

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
      if (this.post.is_hidden) return i18n.t(this.post.why_hidden[0])
      return this.post.title
    },
    hidden_grey () {
      return this.post.is_hidden ? 'has-text-grey-light' : ''
    },
    hidden_icon () {
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
