<template>
  <div class="post">
    <div class="title">
      <div class="title__title">
        {{ post.title }}
      </div>
      <!-- TODO range check and board check-->
      <button
        class="title__button"
        style="width: 80px"
        @click="$router.push({ name: 'post', params: { postId: post.id - 1 } })"
      >
        <i class="material-icons">chevron_left</i>
        이전글
      </button>
      <button
        class="title__button"
        style="width: 80px"
        @click="$router.push({ name: 'post', params: { postId: post.id + 1 } })"
      >
        다음글
        <i class="material-icons">chevron_right</i>
      </button>
      <button
        class="title__button"
        style="width: 50px"
        @click="$router.push({ name: 'board' })"
      >
        목록
      </button>
    </div>
    <div id="metadata">
      <img :src="userPictureUrl" class="post-author-profile-picture"/>
      <div class="post-header">
        <div class="post-header__author">
          {{ postAuthor }}
        </div>

        <div class="post-header__info">
          <span class="post-header__time">
            {{ postCreatedAt }}
          </span>

          <PostStatus class="post-header__status" :post="post" :votable="true" />

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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { archivePost, reportPost, deletePost } from '@/api'
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
.title {
  color: var(--grey-700);
  font-family: 'NanumSquareRound',sans-serif;
  font-size: 20px;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  flex: 1;

  &__title {
    flex: 1;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: white;
    margin-left: 0.5rem;
    font-size: 13px;
    height: 30px;
    border-radius: 10px;
    border: solid 1px var(--grey-300);
  }
}

#metadata {
  font-family: 'NanumSquareRound',sans-serif;
  color: var(--grey-700);
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
  .post-header {
    flex: 1;
    &__author {
      font-size: 15px;
      font-weight: bold;
    }
    &__time {
      color: var(--grey-600);
      font-size: 13px;
      font-weight: normal;
      flex: 1;
    }
    &__info {
      display: flex;
      align-items: center;
    }
    &__status {
      width: 17rem;
    }
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
  height: 13px;
  width: 13px;
  float: right;
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
