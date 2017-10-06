<template>
  <div>
    <div v-if="error">
      Database error
    </div>
    <h1>{{ post.title }}</h1>
    <p>작성자 : {{ post.created_by }}</p>
    <p>{{ post.content }}</p>
    <post-action :isArticle="true"></post-action>
  </div>
</template>

<script>
import PostAction from './PostAction';

export default {
  props: ['post'],
  data() {
    return {
      error: false,
      msg: `message ${this.post_id}`,
    };
  },
  components: {
    PostAction,
  },
};
</script>

<style>

</style>
