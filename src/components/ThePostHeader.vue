<template>
  <div class="post">
    <div class="title" id="title">
      {{ post.title }}
    </div>
    <div id="metadata">
      <img :src="userPictureUrl" class="post-author-profile-picture"/>
      <div>
        <div class="post-author">
          {{ postAuthor }}
        </div>
        <div>
          <span class="post-time">
            {{ postCreatedAt }}
          </span>
          <span class="post-status">
            <span class="post-status">
              <PostStatus :post="post" />
            </span>
            <span class="dropdown is-right is-hoverable alignright">
              <div class="dropdown-trigger">
                <button class="button no-border" aria-haspopup="true" aria-controls="dropdownMenu">
                  <i class="material-icons">more_vert</i>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdownMenu" role="menu">
                <div class="dropdown-content">
                  <div class="dropdown-item">
                    <a class="dropdown-item" @click="archive"
                      :class="{ 'is-loading': isArchiving }">
                      {{ $t('archive') }}
                    </a>
                    <router-link v-if="postUserId === userId" class="dropdown-item"
                      :to="{
                        name: 'write',
                        params: {
                          postId: post.id
                        }
                      }">
                        {{ $t('edit') }}
                    </router-link>
                    <a v-if="postUserId === userId"
                      @click="deletePost"
                      href="#"
                      class="dropdown-item">
                      {{ $t('delete') }}
                    </a>
                    <a v-else class="dropdown-item"
                      @click="report"
                      :class="{ 'is-loading': isReporting }">
                      {{ $t('report') }}
                    </a>
                  </div>
                </div>
              </div>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { archivePost, reportPost, deletePost, getAttachmentUrls } from '@/api'
import { date } from '@/helper.js'
import TextEditor from '../components/TheTextEditor'
import PostStatus from '@/components/PostStatus.vue'

export default {
  name: 'the-post-header',
  props: {
    post: { required: true }
  },
  data () {
    return {
      isArchiving: false,
      isReporting: false,
      attachments: null
    }
  },
  computed: {
    userPictureUrl () {
      return this.post.created_by.profile.picture
    },
    // @TODO: I18n
    postAuthor () {
      return this.post.created_by && this.post.created_by.profile.nickname
    },
    postCreatedAt () {
      return date(this.post.created_at)
    },
    postUserId () {
      return this.post.created_by.profile.user_id
    },
    ...mapGetters([ 'userId' ])
  },
  watch: {
    'post.attachments': {
      async handler (attachments) {
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
      this.isArchiving = true
      await archivePost(this.post.id)
      this.isArchiving = false
    },
    async report () {
      this.isReporting = true
      await reportPost(this.post.id)
      this.isReporting = false
    },
    async deletePost () {
      await deletePost(this.post.id)
      this.$router.push('/')
    }
  },
  components: {
    TextEditor, PostStatus
  }
}
</script>

<i18n>
ko:
  archive: '담아두기'
  edit: '수정'
  delete: '삭제'
  report: '신고'
en:
  archive: 'Archive'
  edit: 'Edit'
  delete: 'Delete'
  report: 'Report'
</i18n>

<style lang="scss" scoped>
#title {
  font-size: 20px;
  margin-bottom: 1.5rem;
}

#metadata {
  color: #888;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  .post-author-profile-picture {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 1rem;
  }

  .post-author {
    color:#4a4a4a;
    font-size: 15px;
    font-weight:bold;
  }

  .post-time {
    color: #888;
    font-size: 13px;
    font-weight: normal;
  }

  .post-status {
    color:#4a4a4a;
  }
}

.material-icons {
  font-size: 16px;
}

.alignright {
  float: right;
}

.no-border {
  border: none;
  padding: 0;
}

.dropdown-content {
  min-width: 40%;
  max-width: 50%;
  float: right;
  text-align: right;
}

.dropdown-item {
  padding: 0.2rem 0.4rem
}
</style>
