<template>
  <div class="board-table">
    <div class="board-item" v-for="article in articles">
      <img class="board-item__image" :src="article.created_by.profile.picture">

      <div class="board-item__content">
        <div class="board-item__header">
          <span class="board-item__author">
            {{ article.created_by.profile.nickname }}
          </span>

          <Timeago class="board-item__time" :time="article.created_at" />
        </div>

        <div class="board-item__body">
          <div class="board-item__title">
            {{ article.title }}
          </div>

          <ArticleStatus class="board-item__status" :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ArticleStatus from '@/components/ArticleStatus.vue'
import Timeago from '@/components/Timeago.vue'

export default {
  name: 'the-board-table',
  props: [ 'articles' ],
  computed: {
    ...mapGetters([ 'getNameById' ])
  },
  components: {
    ArticleStatus,
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
  color: #333333;
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
    color: #a9a9a9;
    font-size: .8rem;
  }

  &__body {
    display: flex;
  }

  &__title {
    font-weight: 700;
    flex: 1;
  }
}

.comment-count {
  color: $theme-red;
}
.article-title {
  // width:100%;
  text-overflow:ellipsis;
  -o-text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
  word-wrap:break-word !important;
  display: block;
  // added for multiline
}
.article-wrapper-big {
  width: 100%;
  @include breakPoint('min') {
    max-width: 600px;
  }
  @include breakPoint('min-mid') {
    max-width: 600px;
  }
  @include breakPoint('mid-max') {
    max-width: 600px;
  }
  @include breakPoint('max') {
    max-width: 600px;
  }
}
.article-wrapper {
  display: flex;
}
</style>
