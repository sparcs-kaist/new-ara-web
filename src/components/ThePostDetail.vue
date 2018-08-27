<template>
  <div class="post">
    <h1 class="title" id="title">{{ post.title }}</h1>
    <div id="metadata">
      <div class="post-author">
        {{ postAuthor }}
      </div>
      <div class="post-time">
        {{ postCreatedAt }}
      </div>
      <div class="post-board-name">
        {{ boardName }}
      </div>
    </div>
    <div class="ql-container ql-snow">
      <div v-html="post.content" class="ql-editor"></div>
    </div>
    <router-link
      :to="{
        name: 'write',
        params: {
          postId: post.id
        }
      }"
      class="button">
      수정하기
    </router-link>
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
import { date } from '@/helper.js'

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
  computed: {
    boardName () {
      return this.post.parent_board && this.post.parent_board.ko_name
    },
    postAuthor () {
      return this.post.created_by.profile.nickname
    },
    postCreatedAt () {
      return date(this.post.created_at)
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

<style lang="scss" scoped>
#title {
  margin-bottom: 0.25rem;
}

#metadata {
  color: #888;
  margin-bottom: 1rem;
  .post-author {
    color:#4a4a4a;
    font-weight:bold
  }
  .post-author, .post-time, .post-board-name {
    display: inline-block;
    margin-right: 0.75rem;
  }
}
</style>
