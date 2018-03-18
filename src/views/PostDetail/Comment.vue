<template>
  <div class="comment-container">
    <div class="comment-detail">
      <div class="author"> {{ comment.created_by }} </div>
      <div class="comment"> {{ comment.content }} </div>
    </div>
    <post-action :style="{ display: 'inline-block' }" :context="this.comment" :is-article="false"></post-action>
    <a v-if="!isRecommentExpanded" class="expand" @click="toggleExpand('recomment')"> 답글 보기 </a>
    <div v-else class="recomments-container">
      <template v-for="recomment in this.comment.comments">
        <recomment :key="recomment.id" :recomment="recomment"></recomment>
      </template>
      <a v-if="!isAddCommentExpanded" class="expand" @click="toggleExpand('addcomment')"> 답글 달기 </a>
      <div v-else>
        <add-comment :context="this.comment" :isArticle="false"></add-comment>
      </div>
    </div>
  </div>
</template>

<script>
import Recomment from './Recomment';
import PostAction from './PostAction';
import AddComment from './AddComment';

export default {
  props: [
    'comment',
  ],
  components: {
    Recomment,
    PostAction,
    AddComment,
  },
  data() {
    return {
      isRecommentExpanded: false,
      isAddCommentExpanded: false,
    };
  },
  methods: {
    toggleExpand(type) {
      if (type === 'recomment') {
        this.isRecommentExpanded = !this.isRecommentExpanded;
      } else if (type === 'addcomment') {
        this.isAddCommentExpanded = !this.isAddCommentExpanded;
      }
    },
  },
};
</script>

<style>
.expand {
  text-decoration: underline;
}

.comment-container {
  margin-bottom: 40px;
}

.recomments-container {
  margin-top: 0.5rem;
  margin-left: 5vw;
}

.comment-detail {
  margin-bottom: 10px;
}

  .author {
    font-weight: bold;
  }
</style>
