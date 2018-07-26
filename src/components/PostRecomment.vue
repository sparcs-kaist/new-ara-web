<template>
  <div class="post-recomment">
    대댓글by{{ recomment.created_by }}: {{ recomment.content }}
    <button
      @click="likeComment">
      추천
    </button>
    <button
      @click="dislikeComment">
      비추천
    </button>
  </div>
</template>

<script>
export default {
  name: 'post-recomment',
  props: {
    recomment: { required: true }
  },
  methods: {
    likeComment () {
      console.log('liked re', this.recomment.id)
    },
    dislikeComment () {
      console.log('disliked re', this.recomment.id)
    }
  }
}
</script>

<style>

</style>
