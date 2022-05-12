<template>
  <div class="post">
    <div v-if="attachments && attachments.length > 0" class="attachments">
      <div class="dropdown is-hoverable is-right">
        <div class="dropdown-trigger">
          <a
            class="attachments__title"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>
              {{ $t('attachments') }} {{ attachments.length }}
            </span>
          </a>
        </div>
        <div class="dropdown-menu">
          <div class="dropdown-content">
            <div
              v-for="{id, file, url} in attachments"
              :key="id"
              class="attachments__item dropdown-item"
            >
              <div>
                <a
                  :href="url"
                  target="_blank"
                  rel="noopener"
                >
                  {{ file }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <ThePostBookmark
        v-if="post.url"
        :node="{ attrs: { title: post.title, href: post.url } }"
        class="content__bookmark"
      />

      <TextEditor
        v-if="content"
        ref="editor"
        :editable="false"
        :content="content"
      />

      <div v-if="post.is_hidden" class="hidden-container">
        <div class="hidden-container__frame">
          <i class="material-icons">{{ hidden_icon }}</i>
        </div>
        <div v-html="hiddenReason" />
        <button
          v-if="post.can_override_hidden"
          class="button hidden-container__button"
          @click="$emit('show-hidden')"
        >
          {{ $t('show-hidden') }}
        </button>
      </div>
    </div>

    <div v-if="!post.is_hidden || !(post.name_type === 1)" class="post__footer">
      <LikeButton
        v-if="!post.is_hidden"
        :item="post"
        class="post__like"
        votable
        :is-mine="post.is_mine"
        @vote="$emit('vote', $event)"
      />
      <div :class="{ 'post__buttons--hidden': post.is_hidden }" class="post__buttons">
        <template v-if="isMine && (post.can_override_hidden !== false) && post.hidden_at === '0001-01-01T08:28:00+08:28'">
          <button class="button" @click="deletePost">
            <i class="like-button__icon material-icons-outlined">
              delete
            </i>
            {{ $t('delete') }}
          </button>

          <router-link
            :to="{
              name: 'write',
              params: {
                postId
              }
            }"
            class="button"
          >
            <i class="like-button__icon material-icons-outlined">
              edit
            </i>
            {{ $t('edit' ) }}
          </router-link>
        </template>
        <template v-else>
          <button
            v-if="isRegular"
            class="button"
            @click="$emit('block')"
          >
            <i class="like-button__icon material-icons-outlined">
              remove_circle_outline
            </i>
            {{ $t(isBlocked ? 'unblock' : 'block') }}
          </button>

          <button
            v-if="!post.is_hidden && isNotRealName"
            class="button"
            @click="$emit('report')"
          >
            <i class="like-button__icon material-icons-outlined">
              campaign
            </i>
            {{ $t('report') }}
          </button>
        </template>
        <button
          v-if="!post.is_hidden"
          class="button archive-button"
          @click="$emit('archive')"
        >
          <i class="like-button__icon material-icons-outlined">add</i>
          {{ $t(post.my_scrap ? 'unarchive' : 'archive') }}
        </button>
      </div>
    </div>
    <hr class="divider">
  </div>
</template>

<script>
import { getAttachmentUrls, deletePost as apiDeletePost } from '@/api'
import LikeButton from '@/components/LikeButton.vue'
import TextEditor from '@/components/TheTextEditor.vue'
import ThePostBookmark from '@/components/ThePostBookmark.vue'
import { mapGetters } from 'vuex'
import i18n from '@/i18n'

export default {
  name: 'ThePostDetail',

  components: {
    LikeButton,
    TextEditor,
    ThePostBookmark
  },

  props: {
    post: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      attachments: null
    }
  },

  computed: {
    userPictureUrl () {
      return this.post.created_by && this.post.created_by.profile.picture
    },
    postAuthor () {
      return this.post.created_by && this.post.created_by.profile.nickname
    },
    postAuthorId () {
      return this.post.created_by && this.post.created_by.id
    },
    postId () {
      return this.post && this.post.id
    },
    content () {
      return this.post.content
    },
    isBlocked () {
      return this.post.created_by && this.post.created_by.is_blocked
    },
    isMine () {
      return this.post && this.post.is_mine
    },
    isRegular () {
      return this.post.name_type === 0
    },
    isNotRealName () {
      return this.post.name_type !== 2
    },
    hiddenReason () {
      const title = `<div class="has-text-weight-bold"> ${this.post.why_hidden.map(v => i18n.t(v)).join('<br>')}</div>`
      const subtitile = this.post.can_override_hidden ? `<div>(${this.$t('hidden-notice-' + this.post.why_hidden[0])})</div>` : ''
      return title + subtitile
    },
    hidden_icon () {
      switch (this.post.why_hidden[0]) {
        case 'ADULT_CONTENT':
          return 'visibility_off'
        case 'SOCIAL_CONTENT':
          return 'visibility_off'
        case 'REPORTED_CONTENT':
          return 'warning'
        case 'BLOCKED_USER_CONTENT':
          return 'voice_over_off'
        default:
          return 'help_outline'
      }
    },
    ...mapGetters([ 'userId' ])
  },

  watch: {
    'post.attachments': {
      async handler (attachments) {
        if (!attachments) {
          return
        }
        const results = await getAttachmentUrls(attachments)
        this.attachments = results.map(({ data }) => ({
          url: data.file,
          file: decodeURIComponent(new URL(data.file).pathname.split('/').pop()),
          id: data.id
        }))
      },
      immediate: true
    }
  },

  methods: {
    async deletePost () {
      const result = await this.$store.dispatch('dialog/confirm', this.$t('confirm-delete'))
      if (!result) return

      await apiDeletePost(this.post.id)
      this.$router.go(-1)
    }
  }
}
</script>

<i18n>
ko:
  archive: '담아두기'
  unarchive: '담아두기 취소'
  block: '차단하기'
  unblock: '차단해제'
  report: '신고하기'
  edit: '수정'
  delete: '삭제'
  attachments: '첨부파일 모아보기'
  more: '{author} 님의 게시글 더 보기'
  show-hidden: '숨김글 보기'
  confirm-delete: '정말로 삭제하시겠습니까?'
  hidden-notice-ADULT_CONTENT: '게시물 보기 설정은 마이페이지에서 수정할 수 있습니다.'
  hidden-notice-SOCIAL_CONTENT: '게시물 보기 설정은 마이페이지에서 수정할 수 있습니다.'
  hidden-notice-BLOCKED_USER_CONTENT: '차단 사용자 설정은 마이페이지에서 확인할 수 있습니다.'

en:
  archive: 'Bookmark'
  unarchive: 'Delete Bookmark'
  block: 'Block User'
  unblock: 'Unblock User'
  report: 'Report'
  edit: 'Edit'
  delete: 'Delete'
  attachments: 'Attachments'
  more: 'Read more posts by {author}'
  show-hidden: 'Show hidden posts'
  confirm-delete: 'Are you really want to delete this post?'
  hidden-notice-ADULT_CONTENT: 'You can change the setting in your MyInfo page to show this kinds of post.'
  hidden-notice-SOCIAL_CONTENT: 'You can change the setting in your MyInfo page to show this kinds of post.'
  hidden-notice-BLOCKED_USER_CONTENT: 'You can change blocked users in your MyInfo page.'
</i18n>

<style lang="scss" scoped>
#title {
  margin-bottom: 0.25rem;
}
.post {
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 0.9rem;
  }
  &__buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-top: 10px;

    &--hidden {
      flex: 1;
    }

    & > .button {
      margin-left: 10px;
      padding-left: 0.8rem;
      font-size: 0.9rem;
      color: var(--theme-400);
      display: flex;
      align-items: center;
      line-height: 0.9rem;
      .like-button__icon {
        margin-right: 5px;
        font-size: 18px;
      }
    }
  }
  &__like {
    font-size: 1.0rem;
    margin-left: -6px;
    margin-top: 10px;
  }
}

.content {
  margin: 30px 0 20px 0;
  &__bookmark {
    margin-bottom: 30px;
  }

.hidden-container{
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  border-radius: 10px;
  padding: 8px;

  &__frame {
    width: 32px;
    height: 32px;
    margin: 8px;
    border-radius: 50%;
    background-color: #a9a9a9;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__button{
    margin: 8px 0;
    background: white;
  }

}

}
.material-icons {
  font-size: 16px;
}
.dropdown-content {
  min-width: 40%;
  max-width: 100%;
  padding: 10px;
  float: right;
  text-align: left;
}
.dropdown-item {
  padding: 0.375rem 0.4rem
}
.attachments {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 30px;
  &__title {
    font-size: 1rem;
    font-weight: 600;
  }
  &__item {
    display: flex;
    flex-direction: row;
  }
}

.divider {
  height: 1px;
  background-color: black;
  margin: 12px 0;
}
</style>
