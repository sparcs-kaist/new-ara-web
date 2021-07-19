<template>
  <div class="post">
    <div class="attachments" v-if="attachments && attachments.length > 0">
      <div class="dropdown is-hoverable is-right">
        <div class="dropdown-trigger">
          <a class="attachments__title" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>
              {{ $t('attachments') }} {{ attachments.length }}
            </span>
          </a>
        </div>
        <div class="dropdown-menu">
          <div class="dropdown-content">
            <div class="attachments__item dropdown-item"
              v-for="{id, file, url} in attachments"
              :key="id"
            >
              <div>
                <a :href="url" target="_blank" rel="noopener">{{ file }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <ThePostBookmark
        class="content__bookmark"
        :node="{ attrs: { title: post.title, href: post.url } }"
        v-if="post.url"
      />

      <TextEditor :editable="false" :content="content" v-if="content" ref="editor" />
      <button v-if="post.is_hidden && !showHidden" class="button" @click="$emit('show-hidden')">
        {{ $t('show-hidden') }}
      </button>
    </div>

    <div class="post__footer">
      <LikeButton class="post__like" :item="post" votable @vote="$emit('vote', $event)" />
      <div class="post__buttons">
        <button class="button" @click="$emit('block')">
          <i class="like-button__icon material-icons-outlined">
            remove_circle_outline
          </i>
          {{ $t(isBlocked ? 'unblock' : 'block') }}
        </button>

        <button class="button" @click="$emit('report')">
          <i class="like-button__icon material-icons-outlined">
            campaign
          </i>
          {{ $t('report') }}
        </button>

        <button class="button" @click="$emit('archive')">
          <i class="like-button__icon material-icons-outlined">add</i>
          {{ $t(post.my_scrap ? 'unarchive' : 'archive') }}
        </button>
      </div>
    </div>
    <hr class="divider"/>
  </div>
</template>

<script>
import { getAttachmentUrls } from '@/api'
import LikeButton from '@/components/LikeButton.vue'
import TextEditor from '@/components/TheTextEditor.vue'
import ThePostBookmark from '@/components/ThePostBookmark.vue'

export default {
  name: 'the-post-detail',
  props: {
    post: { required: true },
    showHidden: { type: Boolean }
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
    content () {
      if (this.post.is_hidden) {
        if (this.showHidden) {
          return this.post.hidden_content
        }
        return this.post.why_hidden
          .map(reason => reason.detail)
          .join(' ')
      }
      return this.post.content
    },
    isBlocked () {
      return this.post.created_by && this.post.created_by.is_blocked
    }
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
  components: {
    LikeButton,
    TextEditor,
    ThePostBookmark
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
  attachments: '첨부파일 모아보기'
  more: '{author} 님의 게시글 더 보기'
  show-hidden: '숨김글 보기'

en:
  archive: 'Bookmark'
  unarchive: 'Delete Bookmark'
  block: 'Block User'
  unblock: 'Unblock User'
  report: 'Report'
  attachments: 'Attachments'
  more: 'Read more posts by {author}'
  show-hidden: 'Show hidden posts'
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
  margin-top: 12px 0;
}
</style>
