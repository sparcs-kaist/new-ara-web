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
      @click="archive"
      class="button"
      :class="{ 'is-loading': isArchiving }">
      담아두기
    </button>
    <button
      @click="report"
      class="button"
      :class="{ 'is-loading': isReporting }">
      신고
    </button>
  </div>
</template>

<script>
import { archivePost, reportPost } from '@/api'

export default {
  name: 'the-post-detail',
  props: {
    post: { required: true }
  },
  data () {
    return {
      isArchiving: false,
      isReporting: false
    }
  },
  methods: {
    async archive () {
      this.isArchiving = true
      await archivePost(this.post.id)
      this.isArchiving = false
    },
    async report () {
      this.isReporting = true
      await reportPost(this.post.id)
      this.isReporting = false
    }
  }
}
</script>

<style>

</style>
