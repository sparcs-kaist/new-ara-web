<template>
  <div>
    <post :post_id="post_id"></post>
    <post-comment :post_id="post_id"></post-comment>
    <post-list></post-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Post from './Post';
import PostComment from './PostComment';
import PostList from './../PostList/PostList';

export default {
  props: ['post_id'],
  data() {
    return {
      msg: `message ${this.post_id}`,
    };
  },
  computed: {
    ...mapState(['language']),
  },
  components: {
    Post,
    PostComment,
    PostList,
  },
};
</script>

<style>

</style>
