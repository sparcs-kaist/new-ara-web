<template>
  <div id="comments" class="post-comments">
    <div class="title">댓글</div>
    <PostComment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      @new-recomment-uploaded="$emit('new-recomment-uploaded', $event)"
      @vote="$emit('vote')"
    />
    <div class="comment-input">
      <div class="comment-metadata">
        <div class="comment-author"> {{ userNickname }} </div>
        <div class="comment-time"> {{ now }} </div>
      </div>
      <div class="comment-content">
        <textarea
          v-model="content"
          class="textarea new-comment"
          cols="10"
          rows="3"
        />
      </div>
      <button
        @click="saveComment"
        class="button"
        :class="{ 'is-loading': isUploading }"
        :disabled="isUploading">
        새 댓글
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createComment } from '@/api'
import { date } from '@/helper.js'
import PostComment from '@/components/PostComment.vue'

export default {
  name: 'the-post-comments',
  props: {
    comments: { required: true },
    postId: { required: true }
  },
  data () {
    return {
      content: '',
      isUploading: false
    }
  },
  computed: {
    now () { return date(new Date()) },
    ...mapGetters([ 'userNickname' ])
  },
  methods: {
    async saveComment () {
      this.isUploading = true
      try {
        const result = await createComment({
          parent_article: this.postId,
          parent_comment: null,
          content: this.content
        })
        this.$emit('new-comment-uploaded', result.data)
        this.content = ''
      } catch (error) {
        // @TODO: 채팅 생성에 실패했다고 알려주기
        alert('Failed to write a comment!')
      } finally {
        this.isUploading = false
      }
    }
  },
  components: { PostComment }
}
</script>

<style lang="scss" scoped>
#comments {
  margin-top: 4rem;
}

.comment-metadata {
  .comment-author {
    display: inline-block;
    font-weight: 700;
    padding-right: 0.75rem;
  }
  .comment-time {
    display: inline-block;
    color: #888;
  }
}

.comment-content {
  margin: 0.75rem 0;
}
</style>
