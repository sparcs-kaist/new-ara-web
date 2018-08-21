<template>
  <table class="table post-table">
    <thead>
      <tr>
        <th class="post-table-title">게시판</th>
        <th>제목</th>
        <th class="post-table-author has-text-right">작성자</th>
        <th class="post-table-vote has-text-right">반응</th>
        <th class="post-table-hit has-text-right">조회수</th>
        <th class="post-table-time has-text-right">작성시간</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="article in articles"
        :key="article.id">
        <td> {{ article.parent_board.ko_name }} </td>
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
                username: article.created_by
              }
            }">
            {{ article.created_by.profile && article.created_by.profile.nickname }}
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
