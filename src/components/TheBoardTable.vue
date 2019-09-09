<template>
  <table class="table post-table">
    <thead>
      <tr>
        <th>{{ $t('title') }}</th>
        <th class="post-table-author has-text-right"> {{ $t('author') }} </th>
        <th class="post-table-vote has-text-right reaction"> {{ $t('reaction') }} </th>
        <th class="post-table-hit has-text-right views"> {{ $t('views') }} </th>
        <th class="post-table-time has-text-right time"> {{ $t('time') }} </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="article in articles"
        :key="article.id">
        <td class="article-wrapper-big">
          <router-link
            :to="{
              name: 'post',
              params: {
                postId: article.id
              }
            }">
            <div class="article-wrapper">
              <span class="article-title"> {{ article.title }}
              </span> &nbsp&nbsp
              <span class="comment-count">
                ({{ article.comments_count }})
              </span>
            </div>
          </router-link>
        </td>
        <td class="has-text-right">
          <router-link
            :to="{
              name: 'user',
              params: {
                username: article.created_by.profile.nickname
              }
            }">
            {{ article.created_by.profile.nickname }}
          </router-link>
        </td>
        <td class="has-text-right reaction">{{ article.positive_vote_count }}</td>
        <td class="has-text-right views">{{ article.hit_count }}</td>
        <td class="has-text-right time">
          <Timeago :time="article.created_at"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import Timeago from '@/components/Timeago.vue'

export default {
  name: 'the-board-table',
  props: [ 'articles' ],
  computed: {
    ...mapGetters([ 'getNameById' ])
  },
  components: { Timeago }
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

.table.post-table {
  width: 100%;

  .reaction, .views, .time {
    @media screen and (max-width: 700px){
      display: none;
    }
  }

  thead th {
    padding: 0 0 1rem 0;
  }

  tbody td {
    padding: 0 0 0.5rem 0;
  }

  .post-table-title {
    min-width: 5rem;
  }
  .post-table-author {
    min-width: 7rem;
  }
  .post-table-vote {
    min-width: 4rem;
  }
  .post-table-hit {
    min-width: 5rem;
  }
  .post-table-time {
    min-width: 6rem;
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
