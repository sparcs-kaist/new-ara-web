<template>
  <div id="comments" class="post-comments">
    <div class="title">댓글</div>
      <div
        v-show="Object.keys(comments).length == 0"
        class="no-comment-info"
      >
        댓글이 없습니다.
      </div>
      <PostComment
        v-show="Object.keys(comments).length != 0"
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @new-recomment-uploaded="$emit('new-recomment-uploaded', $event)"
        @vote="$emit('refresh')"
        @delete="$emit('refresh')"
      />
    <div class="title">
      새 댓글 작성
    </div>
    <div class="comment-input">
      <div class="comment-metadata">
        <div class="comment-author"> {{ userNickname }} </div>
        <div class="comment-time"> {{ now }} </div>
      </div>
      <div class="comment-content">
        <textarea
          placeholder="입력..."
          v-model="content"
          class="textarea new-comment"
          cols="10"
          rows="3"
        />
      </div>
    </div>
    <button
      @click="saveComment"
      class="button button-submit"
      :class="{ 'is-loading': isUploading }"
      :disabled="isUploading">
      새 댓글
    </button>
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
        alert(error)
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
  margin-top: 2rem;
}

.no-comment-info {
  margin-bottom: 1rem;
  color: rgba(0,0,0,0.3);
}

.textarea {
  padding: 0px;
}

.comment-input {
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 5px;
  padding: 10px 15px 10px 15px;

  &:hover {
    border: 1px solid rgba(0,0,0,0.8);
  }

  .comment-metadata {
    .comment-author {
      display: inline-block;
      font-weight: 700;
      padding-right: 0.75rem;
    }
    .comment-time {
      font-size: 12px;
      display: inline-block;
      color: #888;
    }
  }
}

.button-submit {
  margin-top: 10px;
  border: none;
  background-color: #ED3A3A;
  color: white;

  &:hover {
    background-color: rgb(199, 45, 45);
    color: white;
  }
}
</style>
