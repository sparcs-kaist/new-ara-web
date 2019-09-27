<template>
  <div class="post-comment">
    <div class="comment-metadata">
      <img :src="authorProfilePictureUrl" class="comment-author-profile-picture"/>
      <div class="comment-author"> {{ author }} </div>
      <div class="comment-time"> {{ date }} </div>
      <div class="dropdown is-right is-hoverable alignright">
        <div class="dropdown-trigger">
          <button class="button no-border" aria-haspopup="true" aria-controls="dropdownMenu">
            <span class="icon">
              <i class="material-icons">more_vert</i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu no-border" id="dropdownMenu" role="menu">
          <div class="dropdown-content">
            <div class="dropdown-item">
              <!-- <a v-if="userNickname === author" href="#" class="dropdown-item">
                수정
              </a> -->
              <a
                v-if="userNickname === author"
                @click="deleteComment"
                class="dropdown-item"
              >
                삭제
              </a>
              <a v-else href="#" class="dropdown-item">
                신고
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-content">{{comment.content}}</div>
    <a class="button button-default" @click="vote(true)"
      :class="{ 'button-selected': liked, 'is-loading': isVoting }">
      <span class="icon">
        <i class="material-icons">thumb_up</i>
      </span>
      <span>
        {{ likedCount }}
      </span>
    </a>
    <a class="button button-default" @click="vote(false)"
      :class="{ 'button-selected': disliked, 'is-loading': isVoting }">
      <span class="icon">
        <i class="material-icons">thumb_down</i>
      </span>
      <span>
        {{ dislikedCount }}
      </span>
    </a>
    <a class="button button-default"
      @click="toggleRecommentInput">
      {{
        showRecommentInput
        ? '댓글 접기'
        : '댓글 달기'
      }}
    </a>
    <div class="post-recomments">
      <PostRecomment
        v-for="recomment in comment.comments"
        :key="recomment.id"
        :recomment="recomment"
        @vote="$emit('vote')"
      />
      <div
        v-show="showRecommentInput"
      >
        <div
          class="recomment-input">
          <div class="comment-metadata">
            <div class="comment-author"> {{ userNickname }} </div>
            <div class="comment-time"> {{ now }} </div>
          </div>
          <div class="comment-content">
            <textarea
              placeholder="입력..."
              v-model="content"
              ref="recommentTextarea"
              class="textarea new-recomment"
              cols="10"
              rows="3"
            />
          </div>
        </div>
        <button
          @click="saveRecomment"
          class="button button-submit"
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
import { createComment, voteComment, deleteComment } from '@/api'
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
    likedCount () { return this.comment.positive_vote_count },
    dislikedCount () { return this.comment.negative_vote_count },
    author () { return this.comment.created_by.profile.nickname },
    authorProfilePictureUrl() { return this.comment.created_by.profile.picture },
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
      this.$nextTick(() => {
        this.$refs.recommentTextarea.focus()
      })
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
    },
    async deleteComment () {
      await deleteComment(this.comment.id)
      this.$emit('delete')
    }
  },
  components: { PostRecomment }
}
</script>

<style lang="scss" scoped>
.material-icons {
  font-size: 15px;
}

.post-comment {
  margin: 1rem 0;
}

.textarea {
  padding: 0px;
}

.recomment-input {
  margin-top: 15px;
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 5px;
  padding: 10px 15px 10px 15px;

  &:hover {
    border: 1px solid rgba(0,0,0,0.8);
  }

  .comment-content {
    margin: 0px;
  }
}

.comment-metadata {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .comment-author-profile-picture {
    width: 20px;
    height: 20px;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 10px;
  }

  .comment-author {
    display: inline-block;
    font-weight: 700;
    padding-right: 0.75rem;
  }
  .comment-time {
    font-size: 12px;
    display: inline-block;
    color: #888;
  }
}

.comment-content {
  margin: 0.75rem 0;
  white-space: pre-line;
  word-break: break-all;
}

.post-recomments {
  margin-left: 2.5rem;
}

.alignright {
  float: right;
}
.no-border {
  border: none;
}
.dropdown-content {
  min-width: 30%;
  max-width: 50%;
  float: right;
  text-align: right;
}
.dropdown-item {
  padding: 0.375rem 0.4rem
}

.button-submit {
  margin-top: 10px;
  border: none;
  background-color: #ED3A3A;
  color: white;

  &:hover {
    color: white;
    background-color: rgb(199, 45, 45);
  }
}

.button-default {
  color: #888888;
  border: none;
  font-size: 14px;
  margin-right: 5px;
  text-decoration: none;
}
.button-selected {
  color: #ED3A3A;
}
</style>
