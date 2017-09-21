<template>
  <div class="recomment-container">
    <div class="author">@yuijngaya</div>
    <div class="recomment">댓글 내용 댓글 내용 댓글 내용 댓글 내용</div>
    <post-action :is-article="false" />
  </div>
</template>

<script>
import PostAction from './PostAction';

export default {
  components: {
    PostAction,
  },
};
</script>

<style>
.recomment-container {
  margin-bottom: .3rem;
}
</style>
