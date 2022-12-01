<template>
  <div class="comment-editor">
    <label class="textarea comment-editor__input">
      <div class="comment-editor__author">
        <img
          :src="userPicture"
          class="comment-editor__picture"
        >
        <span class="comment-editor__name" :class="authorRed">{{ userNickname }}</span>
        <i v-if="isVerified" class="material-icons">verified</i>
      </div>
      <div class="comment-editor__content">
        <textarea
          ref="input"
          v-model="content"
          :placeholder="$t('placeholder')"
          :style="{ height }"
          class="comment-editor__editor"
          rows="1"
          @keydown.shift.enter.prevent="saveComment"
          @input="autosize"
        />
      </div>
    </label>

    <div class="comment-editor__buttons">
      <button
        v-if="editComment || parentComment"
        :class="{ 'is-loading': isUploading }"
        :disabled="isUploading"
        class="button comment-editor__submit"
        @click="closeComment"
      >
        {{ $t('close-comment') }}
      </button>

      <button
        :class="{ 'is-loading': isUploading }"
        :disabled="isUploading"
        class="button comment-editor__submit"
        @click="saveComment"
      >
        {{ $t('new-comment') }}
      </button>
    </div>
  </div>
</template>

<script>
import { createComment, updateComment } from '@/api'

export default {
  name: 'PostCommentEditor',

  props: {
    post: {
      type: Object,
      required: true
    },
    text: {
      type: String,
      default: ''
    },
    parentArticle: Number,
    parentComment: Number,
    editComment: Number
  },

  data () {
    return {
      content: this.text,
      height: 'auto',
      isUploading: false
    }
  },

  computed: {
    userNickname () {
      return this.post.my_comment_profile ? this.post.my_comment_profile.profile.nickname : this.$t('placeholder')
    },
    userPicture () {
      return this.post.my_comment_profile ? this.post.my_comment_profile.profile.picture : this.post.created_by?.profile.picture
    },
    authorRed () {
      return this.post.name_type !== 0 && this.post.is_mine ? 'author_red' : ''
    },
    isVerified () {
      const profile = this.post.my_comment_profile.profile
      return this.post.parent_board.id === 14 ? profile?.is_school_admin : profile?.is_official
    }
  },

  methods: {
    autosize () {
      this.height = 'auto'
      this.$nextTick(() => {
        if (this.$refs.input) {
          const contentHeight = this.$refs.input.scrollHeight
          this.height = `${contentHeight}px`
        }
      })
    },
    async saveComment () {
      if (this.isUploading) {
        return
      }

      this.isUploading = true

      try {
        const result = this.editComment
          ? (await updateComment(this.editComment, {
            content: this.content,
            name_type: this.post.name_type,
            is_mine: true
          }))

          : (await createComment({
            parent_article: this.parentArticle,
            parent_comment: this.parentComment,
            content: this.content,
            name_type: this.post.name_type
          }))
        // console.log('After update/create comment...')
        this.$emit('upload', result)
        this.content = ''
        this.autosize()
      } catch (err) {
        this.$store.dispatch('dialog/toast', {
          text: this.$t('write-failed') + (err.apierr ? '\n' + err.apierr : ''),
          type: 'error'
        })
      }

      this.isUploading = false
    },
    closeComment () {
      this.$emit('close')
    },
    focus () {
      this.$refs.input.focus()
    }
  }
}
</script>

<i18n>
ko:
  placeholder: '댓글을 작성하세요.'
  new-comment: '등록'
  close-comment: '취소'
  write-failed: '댓글 작성에 실패하였습니다'
  author: '글쓴이'

en:
  placeholder: 'Type here...'
  new-comment: 'Send'
  close-comment: 'Cancel'
  write-failed: 'Failed to write comment'
  author: 'Author'
</i18n>

<style lang="scss" scoped>
.material-icons{
  padding-left: 5px;
  color: rgba(81,135,255,100);
  font-size: 15px;
}

.comment-editor {
  position: relative;

  &__input {
    padding: 16px 24px;
    max-height: none;
    min-height: unset;
    height: auto;
  }

  &__editor {
    resize: none;
    font-size: 1rem;
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    padding-bottom: 30px;

    &::placeholder {
      font-size: 0.9rem;
      font-weight: 400;
    }
  }

  &__name {
    font-size: 0.9rem;
    font-weight: 500;
  }

  &__picture {
    height: 24px;
    width: 24px;
    object-fit: cover;
    margin-right: 8px;
    border-radius: 50%;
  }

  &__author {
    padding-bottom: 7px;
    font-size: .85rem;
    font-weight: 500;
    white-space: nowrap;
    z-index: 1;

    display: flex;
    align-items: center;
  }

  &__buttons {
    font-size: 1rem;
    position: absolute;
    color: var(--grey-600);
    right: 24px;
    bottom: 16px;

    button {
      text-decoration: none;
    }
  }

  &__submit {
    margin-left: 10px;
    color: var(--theme-400);
    font-size: 0.9rem;
    padding: 15px;
  }
}
.author_red{
  color: var(--theme-400);
}
</style>
