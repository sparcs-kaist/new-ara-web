<template>
  <div>
    <ThePostDetail :post="post"/>
    <ThePostComments :comments="post.comments"/>
  </div>
</template>

<script>
import { fetchPost } from '@/api'
import ThePostDetail from '@/components/ThePostDetail'
import ThePostComments from '@/components/ThePostComments'
import TheBoard from '@/components/TheBoard'

export default {
  name: 'post',
  props: {
    postId: { required: true }
  },
  data () {
    return {
      post: {}
    }
  },
  mounted () {
    fetchPost({ postId: this.postId }).then(post => {
      this.post = post
    })
  },
  components: { ThePostDetail, ThePostComments, TheBoard }
}
</script>

<style>

</style>
