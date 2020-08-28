<template>
  <TheLayout :isColumnLayout="false">
    <template #aside>
      <div class="column is-one-quarter">
        <div class="box">
          <a>
            <div class="profile-container">
              <img
                v-if="user.pictureSrc"
                :src="user.pictureSrc"
                class="profile-image"
                alt="profile image"
              />
            </div>
          </a>
          <div class="row">
            <h1 class="nickname">{{ user.nickname }}</h1>
            <a style="margin-left: 0.25rem;" @click="toggleNicknameInput">
              <i class="material-icons" style="font-size: 1.2rem;">create</i>
            </a>
          </div>
          <h2 class="email">{{ user.email ? user.email : '이메일 주소가 없습니다.' }}</h2>
        </div>
        <div class="box">
          <h1 style="font-size: 1.2rem; font-weight: bold;">{{ $t('post-settings')}}</h1>
          <div class="setting-container">
            <span>{{ $t('post-settings-sexual') }}</span>
            <label class="checkbox">
              <input :value="user.sexual" @change="updateSettings" type="checkbox">
            </label>
          </div>
          <div class="setting-container">
            <span>{{ $t('post-settings-social') }}</span>
            <label class="checkbox">
              <input :value="user.social" @change="updateSettings" type="checkbox">
            </label>
          </div>
        </div>
      </div>
    </template>

    <div class="column is-half">
      <div class="tabs is-boxed" style="margin-bottom: 0;">
        <ul>
          <li :class="{ 'is-active': tabIndex === 0 }">
            <a @click="changeTabIndex(0)">{{ $t('board-my') }}</a>
          </li>
          <li :class="{ 'is-active': tabIndex === 1 }">
            <a @click="changeTabIndex(1)">{{ $t('board-recent') }}</a>
          </li>
          <li :class="{ 'is-active': tabIndex === 2 }">
            <a @click="changeTabIndex(2)">{{ $t('board-scrap') }}</a>
          </li>
        </ul>
      </div>
      <div class="box" style="padding: 20px;">
        <TheBoard v-if="user.myPosts && tabIndex === 0" :board="user.myPosts" />
        <TheBoard v-if="user.recentViewedPosts && tabIndex === 1" :board="user.recentViewedPosts" />
        <TheBoard v-if="user.scrapPosts && tabIndex === 2" :board="user.scrapPosts" />
      </div>
    </div>

    <template #aside-right>
      <div class="column is-one-quarter">
        <div class="box">
          <h1 style="font-size: 1.2rem; font-weight: bold; margin-bottom: 1rem;">
            {{ $t('blocked-list') }}
          </h1>
          <ul v-if="user.blocks && user.blocks.results">
            <li v-for="blockedUser in user.blocks.results" :key="blockedUser.id">
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
          <span v-else>차단한 유저가 없습니다.</span>
        </div>
      </div>
    </template>
  </TheLayout>
</template>

<script>
import store from '@/store'
import {
  updateUser,
  fetchUserPosts,
  fetchRecentViewedPosts,
  fetchScrapPosts,
  fetchBlocks,
  deleteBlock
} from '@/api'
import { fetchWithProgress } from './helper'
import TheBoard from '@/components/TheBoard.vue'
import TheLayout from '@/components/TheLayout.vue'

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
        social: null,
        myPosts: null,
        recentViewedPosts: null,
        scrapPosts: null,
        blocks: null
      },
      updating: false,
      tabIndex: 0,
      isNicknameEditable: false
    }
  },
  methods: {
    changeTabIndex (index) {
      this.tabIndex = index
    },
    // @TODO: setting update를 vuex에도 반영. 그냥 다시 fetch 해도 될지도 (...)
    async updateSettings () {
      this.updating = true
      try {
        await updateUser(store.getters.userId, {
          nickname: this.user.nickname,
          email: this.user.email,
          picture: this.user.picture,
          sexual: this.user.sexual,
          social: this.user.social
        }).then(res => {
          store.commit('setUserProfile', res.data)
          console.log('update profile')
        })
      } catch (err) {
        store.dispatch('error', '설정 변경 중 문제가 발생했습니다.')
      }
      this.updating = false
    },
    pictureHandler ({ target: { files: [ file ] } }) {
      this.user.picture = file

      const reader = new FileReader()
      reader.onload = e => { this.user.pictureSrc = e.target.result }
      reader.readAsDataURL(file)
    },
    toggleNicknameInput () {
      this.isNicknameEditable = !this.isNicknameEditable
    },
    async deleteBlockedUser (userId) {
      try {
        await deleteBlock(userId)
        this.user.blocks = await fetchBlocks()
      } catch (error) {
        alert('차단 유저 삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      }
    }
  },
  async beforeRouteEnter (to, from, next) {
    await fetchWithProgress([ store.dispatch('fetchMe') ])

    const { userNickname, userEmail, userPicture, userConfig } = store.getters
    const myPosts = await fetchUserPosts(store.getters.userId)
    const recentViewedPosts = await fetchRecentViewedPosts()
    const scrapPosts = await fetchScrapPosts()
    const blocks = await fetchBlocks()

    next(vm => {
      vm.user = {
        nickname: userNickname,
        email: userEmail,
        pictureSrc: userPicture,
        sexual: userConfig.sexual,
        social: userConfig.social,
        myPosts,
        recentViewedPosts,
        scrapPosts,
        blocks
      }
    })
  },
  components: { TheLayout, TheBoard }
}
</script>

<i18n>
ko:
  post-settings: '게시글 보기 설정'
  post-settings-sexual: '성인글 보기 설정'
  post-settings-social: '정치글 보기 설정'
  board-my: '내가 쓴 글'
  board-recent: '최근 본 글'
  board-scrap: '담아둔 글'
  blocked-list: '내가 차단한 유저 목록'
en:
  post-settings: 'Post settings'
  post-settings-sexual: 'Show sexual posts'
  post-settings-social: 'Show political posts'
  board-my: 'My posts'
  board-recent: 'Recently viewed'
  board-scrap: 'Scrapped'
  blocked-list: 'Blocked users'
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
  display: inline-flex;
  width: 6rem;
  height: 6rem;
  margin-bottom: 0.5rem;
  background-color: grey;
  border-radius: 50%;
}

.profile-image {
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  border-radius: 50%;
}

.nickname {
  font-size: 1.4rem;
  font-weight: 800;
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
