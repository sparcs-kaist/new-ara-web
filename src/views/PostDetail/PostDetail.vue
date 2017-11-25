<template>
  <div class="container">
    <section class="section">
      <post/>
      <post-comment :post_id="post_number"></post-comment>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Post from './Post';
import PostComment from './PostComment';

export default {
  computed: {
    ...mapState([
      'post',
    ]),
    post_number() {
      return Number(this.post.id);
    },
  },
  components: {
    Post,
    PostComment,
  },
};
</script>

<style>

</style>
