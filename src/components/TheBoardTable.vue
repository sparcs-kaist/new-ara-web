<template>
  <div class="board-table">
    <router-link
    :to="{
        name: 'post',
        params: { postId: post.id }
    }"
    :key="post.id"
    class="board-item"
    v-for="post in posts">
      <img class="board-item__image" :src="post.created_by.profile.picture">

      <div class="board-item__content">
        <div class="board-item__header">
          <span class="board-item__author">
            {{ post.created_by.profile.nickname }}
          </span>

          <Timeago class="board-item__time" :time="post.created_at" />
        </div>

        <div class="board-item__body">
          <div class="board-item__title">
            {{ post.title }}
          </div>

          <PostStatus class="board-item__status" :post="post" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PostStatus from '@/components/PostStatus.vue'
import Timeago from '@/components/Timeago.vue'

export default {
  name: 'the-board-table',
  props: [ 'posts' ],
  computed: {
    ...mapGetters([ 'getNameById' ])
  },
  components: {
    PostStatus,
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

<style lang="scss">
@import '@/theme.scss';

.board-table {
  font-family: 'NanumSquareRound', sans-serif;
  width: 100%;
}

.board-item {
  color: var(--text);
  display: flex;
  margin: 20px 0;

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
    margin-right: 14px;
  }

  &__time {
    color: var(--grey-400);
    font-size: .8rem;
  }

  &__body {
    display: flex;
  }

  &__title {
    font-weight: 700;
    flex: 1 1 0;
    width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__status {
    width: 18rem;
  }

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.comment-count {
  color: var(--theme-400);
}

.article-title {

}

.article-wrapper-big {
  width: 100%;
  max-width: 600px;
}

.article-wrapper {
  display: flex;
}
</style>
