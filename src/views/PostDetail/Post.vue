<template>
  <div>
    <template v-if="post">
    <h1 class="title">{{ post.title }}</h1>
    <p class="subtitle">작성자 : {{ post.created_by }}</p>
    <div class="ql-container ql-snow">
      <div v-html="post.content" class="ql-editor"></div>
    </div>
    <post-action :isArticle="true"></post-action>
    </template>
    <template v-else>
      게시글을 찾을 수 없습니다.
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PostAction from './PostAction';

export default {
  computed: {
    ...mapState(['post']),
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
