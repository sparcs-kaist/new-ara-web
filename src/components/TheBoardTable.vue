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
            {{ article.created_by }}
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
import Timeago from '@/components/Timeago.vue'

export default {
  name: 'the-board-table',
  props: [ 'articles' ],
  components: { Timeago }
}
</script>

<style>

</style>
