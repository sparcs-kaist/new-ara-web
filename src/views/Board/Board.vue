<template>
  <div>
    <div v-if="!error">
      <p>
        <router-link v-for="board in board_list" :to="`/posts/${board}`" :key="board_list_index(board)" @click.native="resetPost"><h1>{{ board }}</h1></router-link>
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
      board_list: ['all', 'talk', 'love', 'play'], // TODO: api에서 받아오기
      num_pages: 0,
      post_items: [],
      post_id: 0,
      error: false,
    };
  },
  computed: {
    ...mapState({
      post: 'post',
      board: 'board',
      page: 'page',
    }),
  },
  methods: {
    ...mapActions([
      'fetchPost',
      'updateBoard',
      'updatePage',
      'resetPost',
    ]),
    board_list_index(board) {
      return this.board_list.indexOf(board);
    },
    resetPost() {
      this.fetchPost(undefined);
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
