<template>
  <div class="container">
    <section class="section">
      <post/>
      <div>
        <h3 class="title">댓글</h3>
        <comment v-for="comment in this.post.comments" :key="comment.id" :comment="comment" />
      </div>
      <add-comment :context="this.post" :isArticle="true"></add-comment>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Post from './Post';
import Comment from './Comment';
import AddComment from './AddComment';

export default {
  computed: {
    ...mapState([
      'post',
    ]),
  },
  components: {
    Post,
    Comment,
    AddComment,
  },
};
</script>

<style>

</style>
