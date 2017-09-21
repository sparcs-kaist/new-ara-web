<template>
  <div class="container">
    <section class="section">
      <post :post="post"></post>
      <post-comment :post_id="post_number"></post-comment>
      <post-list></post-list>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import Post from './Post';
import PostComment from './PostComment';
import PostList from './../PostList/PostList';

export default {
  props: ['post_id'],
  data() {
    return {
      post: {},
    };
  },
  computed: {
    post_number() {
      return Number(this.post_id);
    },
  },
  components: {
    Post,
    PostComment,
    PostList,
  },
  methods: {
    refresh() {
      axios.get(`http://13.124.216.27:8000/api/articles/${this.post_id}/`, {
        auth: {
          username: 'jsh56son',
          password: 'asdfasdf1234',
        },
      })
      .then((res) => {
        this.post = res.data;
      })
      .catch(() => {
      });
    },
  },
  watch: {
    post_id() {
      this.refresh();
      // TODO: scroll up to the top
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>

<style>

</style>
