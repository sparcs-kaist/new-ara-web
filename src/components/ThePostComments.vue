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
        @update="$emit('update', $event)"
        @upload="$emit('upload', $event)"
        @vote="$emit('refresh')"
        @delete="$emit('refresh')"
      />
    </div>

    <PostCommentEditor :parentArticle="postId" @upload="$emit('upload', $event)" />
  </div>
</template>

<script>
import PostComment from '@/components/PostComment.vue'
import PostCommentEditor from '@/components/PostCommentEditor.vue'

export default {
  name: 'the-post-comments',

  props: {
    comments: { required: true },
    postId: { required: true }
  },

  computed: {
    commentCount () {
      if (!this.comments) return 0

      return Object.keys(this.comments).length
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

en:
  comments: 'Comments'
  no-comment: 'No comment.'
</i18n>

<style lang="scss" scoped>
.comments {
  margin-top: 2rem;

  &__container {
    margin-bottom: 1rem;

    &--empty {
      color: rgba(0,0,0,0.3);
    }
  }
}
</style>
