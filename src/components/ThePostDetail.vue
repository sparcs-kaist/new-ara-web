<template>
  <div class="post">
    <h1 class="title">{{ post.title }}</h1>
    <p>
      글쓴이: {{ post.created_by }}
    </p>
    <p
      v-html="post.content"
      class="content"></p>
  </div>
</template>

<script>
export default {
  name: 'the-post-detail',
  props: {
    post: { required: true }
  }
}
</script>

<style>

</style>
