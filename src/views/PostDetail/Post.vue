<template>
  <div>
    <div v-if="error">
      Database error
    </div>
    <h1 class="title">{{ post.title }}</h1>
    <p class="subtitle">작성자 : {{ post.created_by }}</p>
    <div class="ql-container ql-snow">
      <div v-html="post.content" class="ql-editor"></div>
    </div>
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

<style scoped>
.ql-container {
  font-size: 16px;
  border: 0;
}
</style>
