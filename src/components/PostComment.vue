<template>
  <div class="comment-wrapper">
    <div class="comment" :class="{'comment--reply-comment': isReplyComment}" v-if="!isEditing">
      <img class="comment__profile" alt="profile image" v-if="!isHidden" :src="profileImage"/>
      <div class="comment__profile" v-else>
        <i class="material-icons">{{ hidden_icon }}</i>
      </div>
      <div class="comment__body">
        <div class="comment__header">
          <router-link
           :is="isAnonymous ? 'span' : 'router-link'"
           :to="{ name: 'user', params: { username: authorId } }" class="comment__author"
           :class="isAuthor ? 'author_red' : ''">
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

          <div v-if="comment.is_hidden && comment.can_override_hidden">
            <button class="button" @click="$emit('fetch-comment', { commentId: comment.id })">
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
        :post="post"
        :anonymousProfile="anonymousProfile"
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
        :post="post"
        :anonymousProfile="anonymousProfile"
        @vote="$emit('vote')"
        @delete="$emit('delete')"
        @update="$emit('update', $event)"
        @upload="$emit('upload', $event)"
        @fetch-comment="$emit('fetch-comment', $event)"
      />

      <div v-show="showReplyCommentInput">
        <PostCommentEditor
          :post="post"
          :parent-comment="comment.id"
          :anonymousProfile="anonymousProfile"
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
    post: { required: true },
    comment: { required: true },
    anonymousProfile: {required: true},
    isReplyComment: Boolean
  },

  data () {
    return {
      isEditing: false,
      isVoting: false,
      showReplyCommentInput: false
    }
  },

  computed: {
    author () { return this.comment.created_by?.profile.nickname },
    authorId () { return this.comment.created_by.id },
    profileImage () { return this.comment.created_by?.profile?.picture },
    date () { return timeago(this.comment.created_at, this.$i18n.locale) },
    ...mapGetters([ 'userNickname' ]),

    content () {
      if (this.comment.is_hidden) {
        return this.$t(this.comment.why_hidden[0])
      }
      return this.comment.content
    },
    isMine () {
      return this.comment.is_mine
    },
    isAnonymous () {
      return !!this.comment.is_anonymous
    },
    isAuthor () {
      if (!this.comment.is_anonymous) {
        return false
      }
      return this.post.created_by.id === this.comment.created_by.id
    },
    isHidden () {
      return this.comment.is_hidden
    },
    hidden_icon () {
      switch (this.comment.why_hidden[0]) {
        case 'REPORTED_CONTENT':
          return 'warning'
        case 'BLOCKED_USER_CONTENT':
          return 'voice_over_off'
        case 'DELETED_CONTENT':
          return 'delete'
        default:
          return 'help_outline'
      }
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
      for (const key in selection) {
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
      this.$emit('update', {
        ...event,
        is_mine: true
      })
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
  show-hidden: '댓글 보기'
  ADULT_CONTENT: '성인/음란성 내용의 댓글입니다.'
  SOCIAL_CONTENT: '정치/사회성 내용의 댓글입니다.'
  REPORTED_CONTENT: '신고 누적으로 숨김된 댓글입니다.'
  BLOCKED_USER_CONTENT: '차단한 사용자의 댓글입니다.'
  DELETED_CONTENT: '삭제된 댓글입니다.'
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
  ADULT_CONTENT: 'This comment has adult/obscene contents.'
  SOCIAL_CONTENT: 'This comment has political/social contents.'
  REPORTED_CONTENT: 'This comment was hidden due to cumulative reporting.'
  BLOCKED_USER_CONTENT: 'This comment was written by blocked user.'
  DELETED_CONTENT: 'This comment has been deleted.'
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

    display: flex;
    flex-flow: row;
    justify-content: space-between;

    .button {
      margin-right: 35px;
      margin-top: -25px;
    }

    @include breakPoint(mobile) {
      flex-flow: column;
      .button {
        margin: 0;
        margin-top: 5px;
      }
    }
  }

  &__profile {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    background: var(--grey-300);
    margin-right: 12px;

    i {
      width: 32px;
      height: 32px;
      font-size: 20px;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      background: darkgray;
      color: white;

      padding-bottom: 2px;
    }
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
    line-height: 25px;
  }

  &__reply-comments {
    margin-left: 60px;

    @include breakPoint(min) {
      margin-left: 30px;
    }
  }

  &__vote {
    font-size: 15px;
    height: 25px;
  }
}
.author_red{
  color: var(--theme-400);
}
</style>
