<template>
  <div class="container">
    <section class="section">
      <post/>
      <post-comment :post_id="post_number"></post-comment>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Post from './Post';
import PostComment from './PostComment';
import PostList from './../PostList/PostList';

export default {
  computed: {
    ...mapState([
      'post',
    ]),
    post_number() {
      return Number(this.post.post_id);
    },
  },
  components: {
    Post,
    PostComment,
    PostList,
  },
  methods: {
    ...mapActions(['fetchPost']),
  },
  watch: {
    // 'post.post_id': () => {
    //   this.fetchPost(7);
    //   // TODO: scroll up to the top
    // },
  },
  mounted() {
    this.fetchPost(7);
  },
};
</script>

<style>

</style>
