<template>
  <div id="comments" class="comments">
    <div class="comments__title">
      {{ $t('comments') }} {{ commentCount }}
    </div>

    <div v-if="!comments" class="comments__container comments__container--empty">
      {{ $t('no-comment') }}
    </div>
    <div v-else class="comments__container">
      <PostComment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :post="post"
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
    comments: Array
  },

  computed: {
    commentCount () {
      if (!this.post || !this.comments) return 0
      return this.post.comment_count
    }
  }
}
</script>

<i18n>
ko:
  comments: '댓글'
  no-comment: '댓글이 없습니다.'

en:
  comments: 'Comments'
  no-comment: 'No comment.'
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
