<template>
  <div id="comments" class="comments">
    <div class="comments__title">{{ $t('comments') }} {{ commentCount }}</div>

    <div class="comments__container comments__container--empty" v-if="commentCount == 0">
      {{ $t('no-comment') }}
    </div>
    <div class="comments__container" v-else>
      <PostComment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :post="post"
        :anonymousNickname="anonymousNickname"
        @update="$emit('update', $event)"
        @upload="$emit('upload', $event)"
        @vote="$emit('refresh')"
        @delete="$emit('refresh')"
        class="comments__comment"
      />
    </div>

    <PostCommentEditor :parentArticle="post.id" :post="post" :anonymousNickname="anonymousNickname" @upload="$emit('upload', $event)"/>
  </div>
</template>
<script>
import PostComment from '@/components/PostComment.vue'
import PostCommentEditor from '@/components/PostCommentEditor.vue'

export default {
  name: 'the-post-comments',

  props: {
    post: { required: true },
    comments: { required: true }
  },
  computed: {
    commentCount () {
      if (!this.post || !this.comments) return 0
      return this.post.comment_count
    },
    anonymousNickname () {
      let nickname = this.$t('anonymous')
      if (this.post.is_anonymous) {
        console.log('anonymousNickname')
        // Get my anonymous nickname from post's comments
        for (var comment of this.post.comments) {
          if (comment.is_mine) {
            nickname = comment.created_by.username
            return nickname
          }
          for (var replyComment in comment.comments) {
            if (replyComment.is_mine) {
              nickname = replyComment.created_by.username
              return nickname
            }
          }
        }
      }
      return nickname
    }
  },
  components: {
    PostComment,
    PostCommentEditor
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
