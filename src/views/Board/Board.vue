<template>
  <div>
    <div v-if="!error">
      <p>
        <router-link to="/posts/all" @click.native="resetPost"><h1>all</h1></router-link>
        <router-link v-for="board in boardList" :to="`/posts/${board.ko_name}`" :key="board.id" @click.native="resetPost"><h1>{{ board.ko_name }}</h1></router-link>
      </p>
      <post-detail v-if="post"></post-detail>
      <post-list></post-list>
      <button @click="$router.push('/post/create')">글쓰기</button>
    </div>
    <div v-else>
      Database error
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PostDetail from './../PostDetail/PostDetail';
import PostList from './../PostList/PostList';

export default {
  name: 'Board',
  data() {
    return {
      num_pages: 0,
      post_items: [],
      post_id: 0,
      error: false,
    };
  },
  computed: {
    ...mapState([
      'post',
      'board',
      'boardList',
      'page',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchPost',
      'updateBoard',
      'updatePage',
      'resetPost',
    ]),
    resetPost() {
      this.fetchPost(undefined);
      this.updatePage(1);
    },
  },
  components: {
    PostDetail,
    PostList,
  },
  watch: {
    $route(to, from) {
      this.updateBoard(to.params.board);
      this.post_id = to.params.post_id;
      this.fetchPost({ postId: this.post_id, context: this.$route.query });

      if (from.params.post_id !== to.params.post_id
        || from.params.board !== to.params.board) {
        window.scrollTo(0, 0);
      }
    },
  },
  mounted() {
    this.updateBoard(this.$route.params.board);
    this.post_id = this.$route.params.post_id;
    this.fetchPost({ postId: this.post_id, context: this.$route.query });
  },
};
</script>

<style>

</style>
