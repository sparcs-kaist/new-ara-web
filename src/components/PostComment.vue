<template>
  <div class="comment-wrapper">
    <div class="comment" :class="{'comment--reply-comment': isReplyComment}" v-if="!isEditing">
      <img class="comment__profile" :src="profileImage" />
      <div class="comment__body">
        <div class="comment__header">
          <router-link :to="{ name: 'user', params: { username: authorId } }" class="comment__author">
            {{ author }}
          </router-link>

          <span class="comment__time"> {{ date }} </span>

          <div class="dropdown is-right is-hoverable">
            <div class="dropdown-trigger">
              <button class="dropdown-button" aria-haspopup="true" aria-controls="dropdownMenu">
                <span class="icon">
                  <i class="material-icons">more_vert</i>
                </span>
              </button>
            </div>

            <div class="dropdown-menu" id="dropdownMenu" role="menu">
              <div class="dropdown-content">
                <div class="dropdown-item">
                  <template v-if="isMine">
                    <a @click="editComment" class="dropdown-item">
                      {{ $t('edit') }}
                    </a>

                    <a @click="deleteComment" class="dropdown-item">
                      {{ $t('delete') }}
                    </a>
                  </template>

                  <a v-else @click="reportComment" class="dropdown-item">
                    {{ $t('report') }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="comment__content">
          <div v-html="content"/>

          <div v-if="comment.is_hidden && !showHidden">
            <button class="button" @click="showHidden = true">
              {{ $t('show-hidden') }}
            </button>
          </div>
        </div>

        <div class="comment__footer">
          <LikeButton class="comment__vote" :item="comment" @vote="vote" votable />
          <a class="comment__write" v-if="!isReplyComment"
            @click="toggleReplyCommentInput">
            {{
              showReplyCommentInput
              ? $t('fold-reply-comment')
              : $t('reply-comment')
            }}
          </a>
        </div>
      </div>
    </div>

    <div class="comment comment--edit" :class="{'comment--reply-comment': isReplyComment}" v-else>
      <PostCommentEditor
        :text="comment.content"
        :edit-comment="comment.id"
        @upload="updateComment"
        @close="isEditing = false"
      />
    </div>

    <div class="comment__reply-comments">
      <PostComment
        v-for="replyComment in comment.comments"
        is-reply-comment
        :key="replyComment.id"
        :comment="replyComment"
        @vote="$emit('vote')"
        @delete="$emit('delete')"
        @update="$emit('update', $event)"
        @upload="$emit('upload', $event)"
      />

      <div v-show="showReplyCommentInput">
        <PostCommentEditor
          :parent-comment="comment.id"
          ref="commentEditor"
          @upload="$emit('upload', $event)"
          @close="showReplyCommentInput = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LikeButton from '@/components/LikeButton.vue'
import PostCommentEditor from '@/components/PostCommentEditor.vue'

import { mapGetters } from 'vuex'
import { voteComment, deleteComment, reportComment } from '@/api'
import { timeago } from '@/helper.js'

export default {
  name: 'PostComment',

  props: {
    comment: { required: true },
    isReplyComment: Boolean
  },

  data () {
    return {
      isEditing: false,
      isVoting: false,
      showReplyCommentInput: false,
      showHidden: false
    }
  },

  computed: {
    author () { return this.comment.created_by.profile.nickname },
    authorId () { return this.comment.created_by.id },
    profileImage () { return this.comment.created_by.profile.picture },
    date () { return timeago(this.comment.created_at, this.$i18n.locale) },
    ...mapGetters([ 'userNickname' ]),

    content () {
      if (this.comment.is_hidden) {
        if (this.showHidden) {
          return this.comment.hidden_content
        }

        return this.comment.why_hidden
          .map(v => v.detail.join('\n'))
          .join('\n')
      }

      return this.comment.content
    },
    isMine () {
      // return this.userNickname === this.comment.created_by.profile.nickname
      return this.comment.is_mine
    }
  },

  methods: {
    async vote (ballot) {
      this.isVoting = true
      await voteComment(ballot.id, ballot.vote)
      this.$emit('vote')
      this.isVoting = false
    },

    toggleReplyCommentInput () {
      this.showReplyCommentInput = !this.showReplyCommentInput
      this.$nextTick(() => {
        this.$refs.commentEditor.focus()
      })
    },

    async deleteComment () {
      const result = await this.$store.dispatch('dialog/confirm', this.$t('confirm-delete'))
      if (!result) return

      await deleteComment(this.comment.id)
      this.$emit('delete')
    },

    async reportComment () {
      const {result, selection} = await this.$store.dispatch('dialog/report', this.$t('confirm-report'))
      if (!result) return
      let typeReport = 'others'
      let reasonReport = ''
      for (var key in selection) {
        if (selection[key]) {
          reasonReport += key
          reasonReport += ', '
        }
      }
      reasonReport = reasonReport.slice(0, -2)
      await reportComment(this.comment.id, typeReport, reasonReport)
    },

    editComment () {
      this.isEditing = true
    },

    updateComment (event) {
      this.isEditing = false
      this.$emit('update', event)
    }
  },

  components: {
    LikeButton,
    PostCommentEditor
  }
}
</script>

<i18n>
ko:
  delete: '삭제'
  report: '신고'
  edit: '수정'
  fold-reply-comment: '답글접기'
  reply-comment: '답글쓰기'
  placeholder: '입력...'
  new-reply-comment: '작성하기'
  confirm-delete: '정말로 이 댓글을 삭제하시겠습니까?'
  confirm-report: '정말로 이 댓글을 신고하시겠습니까?'
  show-hidden: '숨김글 보기'
en:
  delete: 'Delete'
  report: 'Report'
  edit: 'Edit'
  fold-reply-comment: 'Close reply'
  reply-comment: 'Reply'
  placeholder: 'Type here...'
  new-reply-comment: 'Send'
  confirm-delete: 'Are you really want to delete this comment?'
  confirm-report: 'Are you really want to report this comment?'
  show-hidden: 'Show Hidden Comment'
</i18n>

<style lang="scss" scoped>
@import "@/theme.scss";
.dropdown {
  margin-left: auto;
}

.dropdown-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  background: transparent;
  width: 1.8rem;
  height: 1.8rem;

  .material-icons {
    font-size: .9rem;
  }
}

.dropdown-content {
  min-width: 30%;
  max-width: 50%;
  float: right;
  text-align: right;
}

.dropdown-item {
  padding: 0.2rem 0.4rem;
}

.dropdown:hover {
  .dropdown-button {
    background: var(--grey-300);
  }
}

.comment {
  display: flex;
  margin: 24px 0;

  &--edit {
    display: block;
  }

  &__content {
    white-space: pre-wrap;
    word-break: break-word;
    word-wrap: break-word;
  }

  &__profile {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--grey-300);
    margin-right: 12px;
  }

  &__body {
    flex: 1;
  }

  &__header {
    display: flex;
    align-items: center;
  }

  &__time {
    color: var(--grey-600);
    font-size: .75rem;
    margin-left: 10px;
    margin-right: 5px;
  }

  &__author {
    font-size: .9rem;
    font-weight: bold;
  }

  &__footer {
    display: flex;
    margin-top: 8px;
    font-size: .9rem;
  }

  &__write {
    margin-left: 15px;
  }

  &__reply-comments {
    margin-left: 60px;

    @include breakPoint(min) {
      margin-left: 30px;
    }
  }

  &__vote {
    font-size: 15px;
  }
}
</style>
