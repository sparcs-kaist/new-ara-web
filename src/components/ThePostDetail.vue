<template>
  <div class="post">
    <hr />

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
                <a :href="url">{{ file }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <TextEditor :editable="false" :content="post.content" v-if="post.content" />
    </div>

    <div class="post__footer">
      <LikeButton class="post__like" :item="post" votable @vote="$emit('vote', $event)" />
      <div class="post__buttons">
        <button class="button" @click="archive">담아두기</button>
        <button class="button" @click="report">신고하기</button>

        <router-link :to="{
          name: 'user', params: { username: postAuthor }
        }" class="post__more">
          <img :src="userPictureUrl" class="post__author"/>
          <span>{{ postAuthor }} 님의 게시글 더보기</span>
          <i class="material-icons" style="font-size: 1.5em;">chevron_right</i>
        </router-link>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import { archivePost, reportPost, getAttachmentUrls } from '@/api'
import LikeButton from '@/components/LikeButton.vue'
import TextEditor from '@/components/TheTextEditor.vue'

export default {
  name: 'the-post-detail',
  props: {
    post: { required: true }
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
  methods: {
    async archive () {
      await archivePost(this.post.id)
      // TODO refresh sidebar archives, find better way than alert
      alert(this.$t('archived'))
    },
    async report () {
      await reportPost(this.post.id)
      alert(this.$t('reported'))
    }
  },
  components: {
    LikeButton,
    TextEditor
  }
}
</script>

<i18n>
ko:
  archive: '담아두기'
  archived: '담아둔 게시글에 담아졌습니다!'
  report: '신고'
  reported: '신고되었습니다!'
  attachments: '첨부파일 모아보기'
en:
  archive: 'Archive'
  archived: 'Successfully added to your archive'
  report: 'Report'
  reported: 'Successfully reported!'
  attachments: 'Attachments'
</i18n>

<style lang="scss" scoped>
#title {
  margin-bottom: 0.25rem;
}

.post {
  &__author {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    object-fit: cover;
    border-radius: 100%;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__buttons {
    display: flex;
    align-items: center;

    & > .button {
      margin-right: 10px;
    }
  }

  &__more {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  &__like {
    margin-left: -6px;
  }
}

.content {
  margin: 30px 0px 20px -5px;
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
</style>
