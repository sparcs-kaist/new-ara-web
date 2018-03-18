<template>
  <div class="container">
    <div class="columns">
      <div class="column is-2 placeholder"></div>
      <div class="column is-8">
        <div class="article-container">
          <post></post>
          <hr />
          <h2 class="title">댓글</h2>
          <comment v-for="comment in this.post.comments" :key="comment.id" :comment="comment"></comment>
          <add-comment :context="this.post" :isArticle="true"></add-comment>
        </div>
      </div>
      <div class="column is-2 placeholder"></div>
    </div>
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
  .article-container {
    padding: 0 16px;
  }

  hr {
    margin: 28px 0;
  }

  @media (max-width: 768px) {
    .placeholder {
      padding: 0;
    }
  }
</style>
