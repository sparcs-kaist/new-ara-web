<template>
  <div>
    <template v-if="post">
      <h1 class="title">{{ post.title }}</h1>
      <span>
        <span class="subtitle-detail">{{ board }}</span>
        <span class="subtitle-detail">{{ post.created_by }}</span>
        <span class="subtitle-detail">{{ postCreatedAt }}</span>
      </span>
      <button class="button" id="edit_btn" @click="$router.push(`/post/edit/${post.id}`)">글 수정</button>
      <div class="ql-container ql-snow">
        <div v-html="post.content" class="ql-editor"></div>
      </div>
      <post-action :context="this.post" :isArticle="true"></post-action>
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
  computed: {
    ...mapState([
      'post',
      'board',
    ]),
    postCreatedAt() {
      const createdDate = new Date(this.post.created_at);
      return `${createdDate.getMonth() + 1}월 ${createdDate.getDate()}일`;
    },
  },
};
</script>

<style scoped>
#edit_btn {
  display: inline-block;
  float: right;
}

.subtitle-detail {
  margin-right: 8px;
}

.ql-container {
  padding: 28px 0;
  font-size: 16px;
  border: 0;
}

.ql-editor {
  padding: 0;
}

  .title {
    margin-bottom: 4px;
  }
</style>
