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
        @update="$emit('update', $event)"
        @upload="$emit('upload', $event)"
        @vote="$emit('refresh')"
        @delete="$emit('refresh')"
        class="comments__comment"
      />
      <!--TODO: getAnonymousNickname을 이렇게 실행시키지 말고 실행시켜야 함.(불필요한 v-if연산)-->
      <div v-if="getAnonymousNickname === ''">
      </div>
    </div>

    <PostCommentEditor :parentArticle="post.id" :post="post" @upload="$emit('upload', $event)"/>
  </div>
</template>

<script>
import store from '@/store'
import PostComment from '@/components/PostComment.vue'
import PostCommentEditor from '@/components/PostCommentEditor.vue'

export default {
  name: 'the-post-comments',

  props: {
    post: { required: true },
    comments: { required: true }
  },
  /* watch: {
    'comments': function () {
      console.log(this.comments)
    }
  }, */
  computed: {
    commentCount () {
      if (!this.post || !this.comments) return 0
      return this.post.comment_count
    },
    getAnonymousNickname () {
      let nickname = this.$t('anonymous')
      let outFlag = false
      for (var commentIndex in this.post.comments) {
        for (var commentIndex2 in this.post.comments[commentIndex].comments) {
          if (this.post.comments[commentIndex].comments[commentIndex2].is_mine) {
            nickname = this.post.comments[commentIndex].comments[commentIndex2].created_by.username
            outFlag = true
            break
          }
        }
        if (this.post.comments[commentIndex].is_mine) {
          nickname = this.post.comments[commentIndex].created_by.username
          break
        }
        if (outFlag) {
          break
        }
      }
      // Save to state
      store.commit('setAnonymousNickname', nickname)
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
