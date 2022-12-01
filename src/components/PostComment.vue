<template>
  <div class="comment-wrapper">
    <div
      v-if="!isEditing"
      :class="{'comment--reply-comment': isReplyComment}"
      class="comment"
    >
      <img
        v-if="!isHidden"
        :src="profileImage"
        class="comment__profile"
        alt="profile image"
      >
      <div v-else class="comment__profile">
        <i class="material-icons">{{ hidden_icon }}</i>
      </div>
      <div class="comment__body">
        <div class="comment__header">
          <router-link
            :is="isRegular ? 'router-link' : 'span'"
            :to="{ name: 'user', params: { username: authorId } }"
            :class="isAuthor ? 'author_red' : ''"
            class="comment__author"
          >
            <div class="comment__author_box">
              <div> {{ author }} </div>
              <i v-if="isVerified" class="material-icons">verified</i>
            </div>
          </router-link>

          <span class="comment__time"> {{ date }} </span>

          <div v-if="comment.deleted_at === '0001-01-01T08:28:00+08:28' && !isHidden" class="dropdown is-right is-hoverable">
            <div class="dropdown-trigger">
              <button
                class="dropdown-button"
                aria-haspopup="true"
                aria-controls="dropdownMenu"
              >
                <span class="icon">
                  <i class="material-icons">more_vert</i>
                </span>
              </button>
            </div>

            <div
              id="dropdownMenu"
              role="menu"
              class="dropdown-menu"
            >
              <div class="dropdown-content">
                <div class="dropdown-item">
                  <template v-if="isMine">
                    <a class="dropdown-item" @click="editComment">
                      {{ $t('edit') }}
                    </a>

                    <a class="dropdown-item" @click="deleteComment">
                      {{ $t('delete') }}
                    </a>
                  </template>

                  <a
                    v-else
                    class="dropdown-item"
                    @click="reportComment"
                  >
                    {{ $t('report') }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="comment__content">
          <div :style="isHidden && !canOveride ? 'color: #aaa;' : ''" v-html="content" />

          <div v-if="isHidden && canOveride">
            <button class="button" @click="$emit('fetch-comment', { commentId: comment.id })">
              {{ $t('show-hidden') }}
            </button>
          </div>
        </div>

        <div class="comment__footer">
          <LikeButton
            v-if="!isHidden"
            :item="comment"
            class="comment__vote"
            votable
            :is-mine="comment.is_mine"
            @vote="vote"
          />
          <a
            v-if="!isReplyComment"
            class="comment__write"
            @click="toggleReplyCommentInput"
          >
            {{ showReplyCommentInput ? $t('fold-reply-comment') : $t('reply-comment') }}
          </a>
        </div>
      </div>
    </div>

    <div
      v-else
      :class="{'comment--reply-comment': isReplyComment}"
      class="comment comment--edit"
    >
      <PostCommentEditor
        :text="comment.content"
        :edit-comment="comment.id"
        :post="post"
        @upload="updateComment"
        @close="isEditing = false"
      />
    </div>

    <div class="comment__reply-comments">
      <PostComment
        v-for="replyComment in comment.comments"
        :key="replyComment.id"
        :comment="replyComment"
        :post="post"
        is-reply-comment
        @vote="$emit('vote')"
        @delete="$emit('delete')"
        @update="$emit('update', $event)"
        @upload="$emit('upload', $event)"
        @fetch-comment="$emit('fetch-comment', $event)"
      />

      <div v-show="showReplyCommentInput">
        <PostCommentEditor
          ref="commentEditor"
          :post="post"
          :parent-comment="comment.id"
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
import { timeago } from '@/helper'

export default {
  name: 'PostComment',

  components: {
    LikeButton,
    PostCommentEditor
  },

  props: {
    post: {
      type: Object,
      required: true
    },
    comment: {
      type: Object,
      required: true
    },
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
    author () {
      return this.comment.created_by?.profile.nickname
    },
    authorId () { return this.comment.created_by.id },
    profileImage () {
      // return this.isCommunicationAdmin ? this.userPicture : this.comment.created_by?.profile?.picture
      return this.comment.created_by?.profile?.picture
    },
    date () { return timeago(this.comment.created_at, this.$i18n.locale) },
    ...mapGetters([ 'userNickname', 'isCommunicationAdmin', 'userPicture' ]),
    content () {
      if (this.comment.is_hidden) {
        return this.$t(this.comment.why_hidden[0])
      }
      return this.comment.content
    },
    canOveride () {
      return this.comment.can_override_hidden
    },
    isMine () {
      return this.comment.is_mine
    },
    isRegular () {
      return this.comment.name_type === 0
    },
    isVerified () {
      const profile = this.comment.created_by?.profile
      return this.post.parent_board.id === 14 ? profile?.is_school_admin : profile?.is_official
    },
    isAuthor () {
      if (this.comment.name_type === 0) {
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
      if (this.isMine) {
        const result = await this.$store.dispatch('dialog/toast', this.$t('nonvotable-myself'))
        if (!result) return
      }
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
      const { result, selection } = await this.$store.dispatch('dialog/report', this.$t('confirm-report'))
      if (!result) return
      const typeReport = 'others'
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
  }
}
</script>

<i18n>
ko:
  hidden-user: '가려진 사용자'
  delete: '삭제'
  report: '신고'
  edit: '수정'
  fold-reply-comment: '답글접기'
  reply-comment: '답글쓰기'
  placeholder: '입력...'
  new-reply-comment: '작성하기'
  confirm-delete: '정말로 이 댓글을 삭제하시겠습니까?'
  confirm-report: '정말로 이 댓글을 신고하시겠습니까?'
  nonvotable-myself: '본인 게시물이나 댓글에는 좋아요를 누를 수 없습니다!'
  show-hidden: '댓글 보기'
  ADULT_CONTENT: '성인/음란성 내용의 댓글입니다.'
  SOCIAL_CONTENT: '정치/사회성 내용의 댓글입니다.'
  REPORTED_CONTENT: '신고 누적으로 숨김된 댓글입니다.'
  BLOCKED_USER_CONTENT: '차단한 사용자의 댓글입니다.'
  DELETED_CONTENT: '삭제된 댓글입니다.'
en:
  hidden-user: 'Hidden user'
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
  nonvotable-myself: 'You cannot vote for your post or comment!'
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

    div ::v-deep img{
      max-width: 300px;
      max-height: 300px;
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

  &__author_box {
    display: flex;
    flex-direction: row;
    align-items: center;
    i {
      padding-right: 4px;
    }
    .material-icons{
      padding-left: 5px;
      color: rgba(81,135,255,100);
      font-size: 15px;
    }
  }

  &__footer {
    display: flex;
    margin-top: 8px;
    font-size: .9rem;
  }

  &__write {
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
    margin-right: 15px;
  }
}
.author_red{
  color: var(--theme-400);
}

</style>
