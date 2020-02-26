<template>
  <div class="board-table" :class="{ 'board-table--minimized': minimized }">
    <div class="article" v-for="article in articles" :key="article.id"
      :class="{ 'article--hot': article.positive_vote_count > 15 }">

      <div class="article__content">
        <router-link class="article__title" :to="{
            name: 'post',
            params: {
              postId: article.id
            }
          }">

          {{ article.title }}
        </router-link>

        <router-link class="article__author" :to="{
          name: 'user',
          params: {
            username: article.created_by.profile.nickname
          }
        }">
          {{ article.created_by.profile.nickname }}
        </router-link>
      </div>

      <div class="article__metadata">
        <div class="article__metadata__row">
          <Timeago :time="article.created_at"/>

          <div class="article__metadata__item article__metadata__item--upvote">
            <IconUpvote class="article__metadata__icon" />
            {{ article.positive_vote_count }}
          </div>
        </div>

        <div class="article__metadata__row">
          <div class="article__metadata__item">
            <IconViewcounts class="article__metadata__icon" />
            {{ article.hit_count }}
          </div>

          <div class="article__metadata__item">
            <IconComments class="article__metadata__icon" />
            {{ article.comments_count }}
          </div>

          <div class="article__metadata__item article__metadata__item--downvote">
            <IconDownvote class="article__metadata__icon" />
            {{ article.negative_vote_count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import IconComments from '@/icons/IconComments.svg?inline'
import IconDownvote from '@/icons/IconDownvote.svg?inline'
import IconUpvote from '@/icons/IconUpvote.svg?inline'
import IconViewcounts from '@/icons/IconViewcounts.svg?inline'
import Timeago from '@/components/Timeago.vue'

export default {
  name: 'board-table',
  props: {
    articles: {
      type: Array,
      default: () => []
    },

    minimized: Boolean
  },
  computed: {
    ...mapGetters([ 'getNameById' ])
  },
  components: {
    IconComments,
    IconDownvote,
    IconUpvote,
    IconViewcounts,
    Timeago
  }
}
</script>

<i18n>
ko:
  board: '게시판'
  title: '제목'
  author: '작성자'
  reaction: '반응'
  views: '조회수'
  time: '작성 시간'
en:
  board: 'Board'
  title: 'Title'
  author: 'Author'
  reaction: 'Reaction'
  views: 'Views'
  time: 'Time'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';
.board-table {
  &--minimized .article{
    padding-left: 20px;
  }
}

.article {
  display: flex;
  padding: 10px 0;
  max-width: 700px;
  margin: 0 auto;

  &__content {
    flex: 1;
    width: 0;
  }

  &__title, &__author {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: break-word;
  }

  &__title {
    font-size: 1.1rem;
    font-weight: 700;
  }

  &__author {
    font-size: .8rem;
  }

  &__metadata {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    &__row {
      display: flex;
    }

    &__icon {
      width: 1rem;
      margin-right: 3px;
    }

    &__item {
      color: #a1a2a3;
      display: inline-flex;
      align-items: center;
      margin-left: 10px;

      &--upvote, &--downvote {
        margin-left: 20px;
      }
    }
  }

  &--hot & {
    &__metadata__item--upvote {
      color: var(--theme-red);
      fill: var(--theme-red);
    }
  }
}
</style>
