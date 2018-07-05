<template>
  <div class="post-recomment">
    대댓글by{{ recomment.created_by }}: {{ recomment.content }}
  </div>
</template>

<script>
export default {
  name: 'post-recomment',
  props: {
    recomment: { required: true }
  }
}
</script>

<style>

</style>
