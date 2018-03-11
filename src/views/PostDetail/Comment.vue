<template>
  <div class="comment-container">
    <div class="author"> {{ this.comment.created_by }} </div>
    <div class="comment"> {{ this.comment.content }} </div>
    <post-action :context="this.comment" :is-article="false" />
    <a v-if="!isRecommentExpanded" class="expand" @click="toggleExpand('recomment')"> 답글 보기 </a>
    <div v-else class="recomments-container">
      <template v-for="recomment in this.comment.comments">
        <hr />
        <recomment :key="recomment.id" :recomment="recomment"/>
      </template>
      <a v-if="!isAddCommentExpanded" class="expand" @click="toggleExpand('addcomment')"> 답글 달기 </a>
      <div v-else>
        <hr />
        <add-comment :context="this.comment" :isArticle="false"></add-comment>
      </div>
    </div>
    <hr />
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
  margin-bottom: 1rem;
}

.recomments-container {
  margin-top: 0.5rem;
  margin-left: 5vw;
}

  .author {
    font-weight: bold;
  }
</style>
