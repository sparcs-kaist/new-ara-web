<template>
  <div class="post-comment">
    <div class="comment-metadata">
      <div class="comment-author"> {{ author }} </div>
      <div class="comment-time"> {{ date }} </div>
    </div>
    <div class="comment-content"> {{ comment.content }} </div>
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
    <button
      @click="toggleRecommentInput"
      class="button">
      {{
        showRecommentInput
        ? '답글 접기'
        : '답글 달기'
      }}
    </button>
    <div class="post-recomments">
      <PostRecomment
        v-for="recomment in comment.comments"
        :key="recomment.id"
        :recomment="recomment"
        @vote="$emit('vote')"
      />
      <div
        v-show="showRecommentInput"
        class="recomment-input">
        <div class="comment-metadata">
          <div class="comment-author"> {{ userNickname }} </div>
          <div class="comment-time"> {{ now }} </div>
        </div>
        <div class="comment-content">
          <textarea
            v-model="content"
            class="textarea new-recomment"
            cols="10"
            rows="3"
          />
        </div>
        <button
          @click="saveRecomment"
          class="button"
          :class="{ 'is-loading': isUploading }"
          :disabled="isUploading">
          새 대댓글
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createComment, voteComment } from '@/api'
import { date } from '@/helper.js'
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
      isVoting: false,
      showRecommentInput: false
    }
  },
  computed: {
    liked () { return this.comment.my_vote === true },
    disliked () { return this.comment.my_vote === false },
    author () { return this.comment.created_by },
    date () { return date(this.comment.created_at) },
    now () { return date(new Date()) },
    ...mapGetters([ 'userNickname' ])
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
    toggleRecommentInput () {
      this.showRecommentInput = !this.showRecommentInput
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

<style lang="scss" scoped>
.post-comment {
  margin: 1rem 0;
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

.post-recomments {
  margin-left: 2.5rem;
}
</style>
