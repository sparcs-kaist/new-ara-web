<template>
  <div class="post">
    <h1 class="title">{{ post.title }}</h1>
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
