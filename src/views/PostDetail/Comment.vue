<template>
  <div class="comment-container">
    <div class="author"> {{ author }} </div>
    <div class="comment"> {{ comment }} </div>
    <post-action :is-article="false" />
    <a v-if="!isExpanded" class="expand" @click="toggleExpand"> 답글 보기 </a>
    <div v-else class="recomments-container">
      <recomment v-for="n in 3" :key="n"/>
    </div>
  </div>
</template>

<script>
import Recomment from './Recomment';
import PostAction from './PostAction';

export default {
  props: {
    author: String,
    comment: String,
  },
  components: {
    Recomment, PostAction,
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
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
  margin-left: 1rem;
}
</style>
