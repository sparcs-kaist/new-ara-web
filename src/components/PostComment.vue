<template>
  <div class="post-comment">
    댓글by{{ comment.created_by }}: {{ comment.content }}
    <button
      @click="likeComment">
      추천
    </button>
    <button
      @click="dislikeComment">
      비추천
    </button>
    <div class="post-recomments">
      <PostRecomment
        v-for="recomment in comment.comments"
        :key="recomment.id"
        :recomment="recomment"
      />
    </div>
    <textarea
      v-model="content"
      class="textarea new-recomment"
      cols="10"
      rows="3"
    />
    <button
      @click="saveRecomment">
      새 대댓글
    </button>
  </div>
</template>

<script>
import { createComment } from '@/api'
import PostRecomment from '@/components/PostRecomment.vue'

export default {
  name: 'post-comment',
  props: {
    comment: { required: true }
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    likeComment () {
      console.log('liked', this.comment.id)
    },
    dislikeComment () {
      console.log('disliked', this.comment.id)
    },
    // @TODO:
    // 1. 업로드하는 중에 disable
    // 2. 업로드 끝나면 폼 클리어
    // 3. 업로드 끝나면 fetch article해서 그 간의 댓글 보여주기
    // 4. 버튼 로딩 상태
    saveRecomment () {
      createComment({
        parent_article: null,
        parent_comment: this.comment.id,
        content: this.content
      })
    }
  },
  components: { PostRecomment }
}
</script>

<style>

</style>
