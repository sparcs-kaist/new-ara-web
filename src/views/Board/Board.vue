<template>
  <div>
    <div v-if="!error" class="w-888 centerh">
      <post-detail v-if="post"></post-detail>
      <post-list v-if="!isLoading"></post-list>
      <div>
        <button class="button" @click="$router.push('/post/create')" style="float:right">글쓰기</button>
        <div style="clear: both"></div>
      </div>
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
      postId: 0,
      error: false,
      isLoading: false,
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
    ]),
  },
  components: {
    PostDetail,
    PostList,
  },
  watch: {
    async $route(to, from) {
      this.updateBoard(to.params.board);
      if (to.params.board !== from.params.board) this.updatePage(1);
      this.postId = to.params.post_id;

      this.isLoading = true;
      await this.fetchPost({ postId: this.postId, context: this.$route.query });
      this.isLoading = false;

      if (from.params.post_id !== to.params.post_id
        || from.params.board !== to.params.board) {
        window.scrollTo(0, 0);
      }
    },
  },
  async mounted() {
    this.updateBoard(this.$route.params.board);
    this.postId = this.$route.params.post_id;

    this.isLoading = true;
    await this.fetchPost({ postId: this.postId, context: this.$route.query });
    this.isLoading = false;
  },
};
</script>

<style>
.w-888 { width: 888px;}
.centerh { margin: 0 auto;}
</style>
