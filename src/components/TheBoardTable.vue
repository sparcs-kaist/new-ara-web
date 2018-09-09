<template>
  <table class="table post-table">
    <thead>
      <tr>
        <th class="post-table-title"> {{ $t('board') }} </th>
        <th> {{ $t('title') }} </th>
        <th class="post-table-author has-text-right"> {{ $t('author') }} </th>
        <th class="post-table-vote has-text-right"> {{ $t('reaction') }} </th>
        <th class="post-table-hit has-text-right"> {{ $t('views') }} </th>
        <th class="post-table-time has-text-right"> {{ $t('time') }} </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="article in articles"
        :key="article.id">
        <td> {{ getNameById(article.parent_board.id, $i18n.locale) }} </td>
        <td>
          <router-link
            :to="{
              name: 'post',
              params: {
                postId: article.id
              }
            }">
            {{ article.title }}
            <span class="comment-count">
              ({{ article.comments_count }})
            </span>
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
        <td class="has-text-right">{{ article.positive_vote_count }}</td>
        <td class="has-text-right">{{ article.hit_count }}</td>
        <td class="has-text-right">
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

.post-table {
  width: 100%;
  margin: 0 0 0.75rem -0.75rem;

  thead th {
    padding-bottom: 1em;
  }

  .post-table-title {
    width: 5rem;
  }
  .post-table-author {
    width: 7rem;
  }
  .post-table-vote {
    width: 4rem;
  }
  .post-table-hit {
    width: 5rem;
  }
  .post-table-time {
    width: 6rem;
  }
}
.comment-count {
  color: $theme-red;
}
</style>
