<template>
  <div>
    <h3 class="title">댓글</h3>
    <comment v-for="comment in this.post.comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Comment from './Comment';

export default {
  props: {
    post_id: Number,
  },
  components: {
    Comment,
  },
  computed: {
    ...mapState({
      post: 'post',
    }),
  },
};
</script>

<style>

</style>
