<template>
  <div class="post">
    <h1 class="title">{{ post.title }}</h1>
    <p>
      글쓴이: {{ post.created_by }}
    </p>
    <router-link :to="{
      name: 'write',
      params: {
        postId: post.id
      }
    }"> 수정하기 </router-link>
    <p
      v-html="post.content"
      class="content"></p>
    <button
      @click="archive">
      담아두기
    </button>
  </div>
</template>

<script>
import { archivePost } from '@/api'

export default {
  name: 'the-post-detail',
  props: {
    post: { required: true }
  },
  methods: {
    archive () {
      archivePost(this.post.id)
    }
  }
}
</script>

<style>

</style>
