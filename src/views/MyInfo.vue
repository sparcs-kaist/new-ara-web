<template>
  <TheLayout :isColumnLayout="false">
    <template #aside>
      <div class="column is-one-quarter">
        <div class="box">
          <div
            class="profile-container"
            :style="{ backgroundColor: user.pictureSrc ? 'white' : 'grey' }"
          >
            <img
              v-if="user.pictureSrc"
              :src="user.pictureSrc"
              class="profile-container__image"
              alt="profile image"
            />
            <label>
              <input
                type="file"
                style="display: none;"
                @change="pictureHandler"
              >
              <a class="profile-container__button">
                <i class="material-icons">camera_alt</i>
              </a>
            </label>
          </div>
          <div>
            <div class="row" v-if="!isNicknameEditable">
              <h1 class="nickname">{{ user.nickname }}</h1>
              <a style="margin-left: 0.25rem;" @click="toggleNicknameInput">
                <i class="material-icons" style="font-size: 1.2rem;">create</i>
              </a>
            </div>
            <div v-else>
              <input class="nickname nickname__input" v-model="newNickname">
              <div class="nickname__buttons">
                <button
                  class="button"
                  @click="toggleNicknameInput(false)"
                  style="margin-right: 0.2rem;"
                >
                  {{ $t('cancel') }}
                </button>
                <button
                  class="button is-link"
                  :class="{ 'is-loading': updating }"
                  @click="toggleNicknameInput(true)">
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </div>

          <h2 class="email">{{ user.email ? user.email : $t('empty-email') }}</h2>
        </div>

        <div class="box">
          <h1 style="font-size: 1.2rem; font-weight: bold;">{{ $t('post-settings')}}</h1>

          <div class="setting-container">
            <span>{{ $t('post-settings-sexual') }}</span>
            <label class="checkbox">
              <input v-model="user.sexual" type="checkbox">
            </label>
          </div>

          <div class="setting-container">
            <span>{{ $t('post-settings-social') }}</span>
            <label class="checkbox">
              <input v-model="user.social" type="checkbox">
            </label>
          </div>
          <div class="setting-container__button">
            <button
              class="button"
              :class="{ 'is-loading': updating }"
              @click="updateSettings">
              {{ $t('save') }}
            </button>
          </div>
        </div>
      </div>
    </template>

    <div class="column is-half">
      <div class="tabs is-boxed" style="margin: 0 0 0 -1px;">
        <ul>
          <li :class="{ 'is-active': $route.query.board !== 'recent' && $route.query.board !== 'archive' }">
            <router-link :to="{ query: { board: 'my'} }">
              {{ $t('board-my') }}
            </router-link>
          </li>
          <li :class="{ 'is-active': $route.query.board === 'recent' }">
            <router-link :to="{ query: { board: 'recent'} }">
              {{ $t('board-recent') }}
            </router-link>
          </li>
          <li :class="{ 'is-active': $route.query.board === 'archive' }">
            <router-link :to="{ query: { board: 'archive'} }">
              {{ $t('board-archive') }}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="board-container">
        <TheBoard v-if="posts" :board="posts" />
      </div>
    </div>

    <template #aside-right>
      <div class="column is-one-quarter">
        <div class="box">
          <h1 style="font-size: 1.2rem; font-weight: bold; margin-bottom: 1rem;">
            {{ $t('blocked-list') }}
          </h1>

          <ul v-if="blocks && blocks.results && blocks.results.length > 0">
            <li v-for="blockedUser in blocks.results" :key="blockedUser.id">
              <div class="block-user">
                <img
                  :src="blockedUser.user.profile.picture"
                  class="profile-image__block"
                />
                {{ blockedUser.user.profile.nickname }}
                <a style="margin-left: auto;" @click="deleteBlockedUser(blockedUser.id)">
                  <i class="material-icons" style="font-size: 1.3rem;">close</i>
                </a>
              </div>
            </li>
          </ul>
          <span v-else>{{ $t('blocked-list-empty') }}</span>
        </div>
      </div>
    </template>
  </TheLayout>
</template>

<script>
import store from '@/store'
import {
  updateUser,
  fetchArchivedPosts,
  fetchArticles,
  fetchBlocks,
  fetchRecentViewedPosts,
  deleteBlock
} from '@/api'
import { mapState } from 'vuex'
import { fetchWithProgress } from './helper'
import TheBoard from '@/components/TheBoard.vue'
import TheLayout from '@/components/TheLayout.vue'

const fetchByQuery = query => {
  const { board } = query
  const context = { ...query, board: undefined }

  switch (board) {
    case 'recent':
      return fetchRecentViewedPosts(query)

    case 'archive':
      return fetchArchivedPosts(query)

    default:
      context.username = store.getters.userId
      return fetchArticles(context)
  }
}

export default {
  name: 'my-info',
  data () {
    return {
      user: {
        nickname: null,
        email: null,
        picture: null,
        pictureSrc: '',
        sexual: null,
        social: null
      },
      posts: null,
      blocks: null,
      updating: false,
      tabIndex: 0,
      isNicknameEditable: false,
      newNickname: null
    }
  },

  computed: {
    ...mapState([ 'recentPosts', 'archivedPosts' ])
  },

  methods: {
    changeTabIndex (index) {
      this.tabIndex = index
    },

    // @TODO: setting update를 vuex에도 반영. 그냥 다시 fetch 해도 될지도 (...)
    async updateSettings (showUpdating = true) {
      this.updating = true && showUpdating
      try {
        await updateUser(store.getters.userId, {
          nickname: this.user.nickname,
          email: this.user.email,
          picture: this.user.picture,
          sexual: this.user.sexual,
          social: this.user.social
        }).then(res => {
          store.commit('setUserProfile', res.data)
        })
      } catch (err) {
        this.$store.dispatch('dialog/toast', {
          text: this.$t('setting-change-failed'),
          type: 'error'
        })
      }
      this.updating = false && showUpdating
    },
    async pictureHandler ({ target: { files: [ file ] } }) {
      let pictureSrc

      const reader = new FileReader()
      reader.onload = e => { pictureSrc = e.target.result }
      reader.readAsDataURL(file)

      this.user.picture = file
      await this.updateSettings(false)

      this.user.pictureSrc = pictureSrc
    },
    async toggleNicknameInput (isUpdate = false) {
      if (!this.isNicknameEditable) {
        this.newNickname = this.user.nickname
        this.isNicknameEditable = true
      } else {
        if (isUpdate && this.user.nickname !== this.newNickname) {
          this.user.nickname = this.newNickname
          await this.updateSettings()
        }

        this.isNicknameEditable = false
      }
    },

    async deleteBlockedUser (userId) {
      try {
        await deleteBlock(userId)
        this.user.blocks = await fetchBlocks()
      } catch (error) {
        this.$store.dispatch('dialog/toast', {
          text: this.$t('unblock-failed'),
          type: 'error'
        })
      }
    }
  },

  async beforeRouteEnter ({ query }, from, next) {
    const [ , posts, blocks ] = await fetchWithProgress([
      store.dispatch('fetchMe'),
      fetchByQuery(query),
      fetchBlocks()
    ])

    const { userNickname, userEmail, userPicture, userConfig } = store.getters

    next(vm => {
      vm.user = {
        nickname: userNickname,
        email: userEmail,
        pictureSrc: userPicture,
        sexual: userConfig.sexual,
        social: userConfig.social
      }

      vm.posts = posts
      vm.blocks = blocks
    })
  },

  async beforeRouteUpdate ({ query }, from, next) {
    const [ posts ] = await fetchWithProgress([ fetchByQuery(query) ])
    this.posts = posts
    next()
  },

  components: { TheLayout, TheBoard }
}
</script>

<i18n>
ko:
  empty-email: '이메일 주소가 없습니다.'
  post-settings: '게시글 보기 설정'
  post-settings-sexual: '성인글 보기 설정'
  post-settings-social: '정치글 보기 설정'
  board-my: '내가 쓴 글'
  board-recent: '최근 본 글'
  board-archive: '담아둔 글'
  blocked-list: '내가 차단한 유저 목록'
  blocked-list-empty: '차단한 유저가 없습니다.'
  save: '저장'
  cancel: '취소'
  setting-change-failed: '설정 변경 중 문제가 발생했습니다.'
  unblock-failed: '차단 유저 삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'

en:
  empty-email: 'No email address'
  post-settings: 'Post settings'
  post-settings-sexual: 'Show sexual posts'
  post-settings-social: 'Show political posts'
  board-my: 'My posts'
  board-recent: 'Recently viewed'
  board-archive: 'Bookmarks'
  blocked-list: 'Blocked users'
  blocked-list-empty: 'There are no blocked users.'
  save: 'Save'
  cancel: 'Cancel'
  setting-change-failed: 'Failed while updating settings.'
  unblock-failed: 'Failed while unblocking user. Please try again after a while.'
</i18n>

<style lang="scss" scoped>
.box {
  padding: 40px;
}

.row {
  display: flex;
  align-items: center;
}

.profile-container {
  position: relative;
  display: inline-flex;
  width: 6rem;
  height: 6rem;
  margin-bottom: 0.5rem;
  border-radius: 50%;
}

.profile-container__image {
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  border-radius: 50%;
}

.profile-container__button {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: #fafafa;
  border-radius: 50%;

  i {
    font-size: 1.3rem;
  }
}

.nickname {
  font-size: 1.4rem;
  font-weight: 800;
}

.nickname__input {
  width: 100%;
  margin-bottom: 0.3rem;
}

.nickname__buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 0.3rem;
}

.email {
  color: #a9a9a9;
  font-size: 0.8rem;
}

.setting-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.setting-container__button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
}

.board-container {
  padding: 2rem;
  background-color: white;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}

.block-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.profile-image__block {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  object-fit: cover;
  border-radius: 50%;
}
</style>
