<template>
  <div>
    <template v-if="post">
      <h1 class="title">{{ post.title }}</h1>
      <p class="subtitle">작성자 : {{ post.created_by }}</p>
      <div class="ql-container ql-snow">
        <div v-html="post.content" class="ql-editor"></div>
      </div>
      <post-action :context="this.post" :isArticle="true"></post-action>
      <a v-if="!isAddCommentExpanded" class="expand" @click="toggleExpand('addcomment')"> 답글 달기 </a>
      <div v-else>
        <add-comment v-on:successAdd="toggleExpand('addcomment')" :context="this.post" :isArticle="true"></add-comment>
      </div>
    </template>
    <template v-else>
      게시글을 찾을 수 없습니다.
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PostAction from './PostAction';
import AddComment from './AddComment';

export default {
  components: {
    PostAction,
    AddComment,
  },
  data() {
    return {
      isAddCommentExpanded: false,
    };
  },
  computed: {
    ...mapState(['post']),
  },
  methods: {
    toggleExpand(type) {
      if (type === 'addcomment') {
        this.isAddCommentExpanded = !this.isAddCommentExpanded;
      }
    },
  },
};
</script>

<style scoped>
.ql-container {
  font-size: 16px;
  border: 0;
}
</style>
