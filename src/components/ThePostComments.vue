<template>
  <div id="comments" class="comments">
    <div class="comments__title">{{ $t('comments') }} {{ commentCount }}</div>

    <div v-if="!comments" class="comments__container comments__container--empty">
      {{ $t('no-comment') }}
    </div>
    <div v-else class="comments__container">
      <PostComment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :post="post"
        :anonymous-profile="anonymousProfile"
        class="comments__comment"
        @update="$emit('update', $event)"
        @upload="$emit('upload', $event)"
        @vote="$emit('refresh')"
        @delete="$emit('refresh')"
        @fetch-comment="$emit('fetch-comment', $event)"
      />
    </div>

    <PostCommentEditor
      :parent-article="post.id"
      :post="post"
      :anonymous-profile="anonymousProfile"
      @upload="$emit('upload', $event)"
    />
  </div>
</template>
<script>
import PostComment from '@/components/PostComment.vue'
import PostCommentEditor from '@/components/PostCommentEditor.vue'

export default {
  name: 'ThePostComments',

  components: {
    PostComment,
    PostCommentEditor
  },

  props: {
    post: {
      type: Object,
      required: true
    },
    comments: {
      type: Array,
      required: true
    }
  },

  computed: {
    commentCount () {
      if (!this.post || !this.comments) return 0
      return this.post.comment_count
    },
    anonymousProfile () {
      if (this.post.is_anonymous) {
        // Get my anonymous nickname from post's comments
        for (const comment of this.post.comments) {
          if (comment.is_mine) {
            return {
              nickname: comment.created_by.username,
              profileImage: comment.created_by.profile.picture
            }
          }
          for (const replyComment of comment.comments) {
            if (replyComment.is_mine) {
              return {
                nickname: replyComment.created_by.username,
                profileImage: replyComment.created_by.profile.picture
              }
            }
          }
        }
      }
      return {
        nickname: this.$t('anonymous'),
        profileImage: this.post.created_by?.profile.picture
      }
    }
  }
}
</script>

<i18n>
ko:
  comments: '댓글'
  no-comment: '댓글이 없습니다.'
  anonymous: '익명'

en:
  comments: 'Comments'
  no-comment: 'No comment.'
  anonymous: 'Anonymous'
</i18n>

<style lang="scss" scoped>
.comments {
  margin-top: 1rem;

  &__title {
    font-size: 18px;
    font-weight: 500;
  }

  &__container {
    margin-bottom: 1rem;
    font-size: 0.9rem;

    &--empty {
      color: rgba(0,0,0,0.3);
      margin: 12px 0;
    }
  }

  &__comment {
    border-top: 1px solid #f0f0f0;

    &:first-child {
      margin-top: -10px;
      border: none;
    }
  }
}
</style>
