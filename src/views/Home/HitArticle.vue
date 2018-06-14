<template>
  <div>
    <router-link class="router-link" :to="{ name: 'PostDetail', params: { board: getBoardNameById(article.parent_board.id), post_id: article.id }}">
      <span class="post-hit">{{ article.hit_count }}</span>
      <span class="post-title">{{ article.title }}</span>
    </router-link>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    props: ['article'],
    computed: {
      ...mapGetters([
        'getBoardNameById',
      ]),
    },
  };
</script>

<style scoped="">
  .router-link {
    color: #4a4a4a;
  }

  .router-link:hover {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
