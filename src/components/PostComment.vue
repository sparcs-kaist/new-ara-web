<template>
  <div class="post-comment">
    댓글by{{ comment.created_by }}: {{ comment.content }}
    <button
      @click="vote(true)"
      class="button"
      :class="{ 'is-primary': liked, 'is-loading': isVoting }">
      추천
    </button>
    <button
      @click="vote(false)"
      class="button"
      :class="{ 'is-primary': disliked, 'is-loading': isVoting }">
      비추천
    </button>
    <div class="post-recomments">
      <PostRecomment
        v-for="recomment in comment.comments"
        :key="recomment.id"
        :recomment="recomment"
        @vote="$emit('vote')"
      />
    </div>
    <textarea
      v-model="content"
      class="textarea new-recomment"
      cols="10"
      rows="3"
    />
    <button
      @click="saveRecomment"
      class="button"
      :class="{ 'is-loading': isUploading }"
      :disabled="isUploading">
      새 대댓글
    </button>
  </div>
</template>

<script>
import { createComment, voteComment } from '@/api'
import PostRecomment from '@/components/PostRecomment.vue'

export default {
  name: 'post-comment',
  props: {
    comment: { required: true }
  },
  data () {
    return {
      content: '',
      isUploading: false,
      isVoting: false
    }
  },
  computed: {
    liked () { return this.comment.my_vote === true },
    disliked () { return this.comment.my_vote === false }
  },
  methods: {
    async vote (ballot) {
      this.isVoting = true
      await voteComment(this.comment.id,
        this.comment.my_vote === ballot
          ? 'vote_cancel'
          : ballot ? 'vote_positive' : 'vote_negative'
      )
      this.$emit('vote')
      this.isVoting = false
    },
    async saveRecomment () {
      this.isUploading = true
      try {
        const result = await createComment({
          parent_article: null,
          parent_comment: this.comment.id,
          content: this.content
        })
        this.$emit('new-recomment-uploaded', result.data)
        this.content = ''
      } catch (err) {
        // @TODO: 채팅 생성에 실패했다고 알려주기
        alert('Failed to write a recomment!')
      } finally {
        this.isUploading = false
      }
    }
  },
  components: { PostRecomment }
}
</script>

<style>

</style>
