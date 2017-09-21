<template>
  <div>
    <h3 class="title">댓글</h3>
    <comment v-for="n in 4" :key="n" :author="'@yujingaya'" :comment="'댓글 내용 댓글 내용 댓글 내용 댓글 내용'" />
  </div>
</template>

<script>
import Comment from './Comment';

export default {
  props: {
    post_id: Number,
  },
  components: {
    Comment,
  },
};
</script>

<style>

</style>
