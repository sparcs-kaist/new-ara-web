<template>
  <TheLayout :isColumnLayout="false">
    <template #aside>
      <div class="column is-one-quarter">
        <div class="box">
          <a>
            <div class="profile-container">
              <img
                v-if="pictureSrc"
                :src="pictureSrc"
                class="profile-image"
                alt="프로필 사진"
              />
            </div>
          </a>
          <div class="row">
            <h1 class="nickname">{{ nickname }}</h1>
            <a style="margin-left: 0.25rem;" @click="toggleNicknameInput">
              <i class="material-icons" style="font-size: 1.2rem;">create</i>
            </a>
          </div>
          <h2 class="email">{{ email ? email : '이메일 주소가 없습니다.' }}</h2>
        </div>
        <div class="box">
          <h1 style="font-size: 1.2rem; font-weight: bold;">게시글 보기 설정</h1>
          <div class="setting-container">
            <span>성인글 보기 설정</span>
            <label class="checkbox">
              <input @change="toggleSexual" type="checkbox">
            </label>
          </div>
          <div class="setting-container">
            <span>정치글 보기 설정</span>
            <label class="checkbox">
              <input @change="toggleSocial" type="checkbox">
            </label>
          </div>
        </div>
      </div>
    </template>

    <div class="column is-half">
      <div class="tabs is-boxed" style="margin-bottom: 0;">
        <ul>
          <li :class="{ 'is-active': tabIndex === 0 }">
            <a @click="changeTabIndex(0)">내가 쓴 글</a>
          </li>
          <li :class="{ 'is-active': tabIndex === 1 }">
            <a @click="changeTabIndex(1)">최근 본 글</a>
          </li>
          <li :class="{ 'is-active': tabIndex === 2 }">
            <a @click="changeTabIndex(2)">담아둔 글</a>
          </li>
        </ul>
      </div>
      <div class="box" style="padding: 20px;">
        <TheBoard v-if="myPosts && tabIndex === 0" :board="myPosts" />
        <TheBoard v-if="recentViewedPosts && tabIndex === 1" :board="recentViewedPosts" />
        <TheBoard v-if="scrapPosts && tabIndex === 2" :board="scrapPosts" />
      </div>
    </div>

    <template #aside-right>
      <div class="column is-one-quarter">
        <div class="box">
          <h1 style="font-size: 1.2rem; font-weight: bold; margin-bottom: 1rem;">
            내가 차단한 유저 목록
          </h1>
          <ul v-if="blocks && blocks.results">
            <li v-for="user in blocks.results" :key="user.id">
              <div class="block-user">
                <img
                  :src="user.user.profile.picture"
                  class="profile-image__block"
                />
                {{ user.user.profile.nickname }}
                <a style="margin-left: auto;" @click="deleteBlockedUser(user.id)">
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
      nickname: null,
      email: null,
      picture: null,
      pictureSrc: '',
      sexual: false,
      social: false,
      updating: false,
      tabIndex: 0,
      isNicknameEditable: false,
      myPosts: null,
      recentViewedPosts: null,
      scrapPosts: null,
      blocks: null
    }
  },
  methods: {
    changeTabIndex (index) {
      this.tabIndex = index
    },
    async toggleSexual () {
      this.sexual = !this.sexual
      await this.updateSettings()
    },
    async toggleSocial () {
      this.social = !this.social
      await this.updateSettings()
    },
    // @TODO: setting update를 vuex에도 반영. 그냥 다시 fetch 해도 될지도 (...)
    async updateSettings () {
      this.updating = true
      try {
        await updateUser(store.getters.userId, {
          nickname: this.nickname,
          email: this.email,
          picture: this.picture,
          sexual: this.sexual,
          social: this.social
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
      this.picture = file

      const reader = new FileReader()
      reader.onload = e => { this.pictureSrc = e.target.result }
      reader.readAsDataURL(file)
    },
    toggleNicknameInput () {
      this.isNicknameEditable = !this.isNicknameEditable
    },
    async deleteBlockedUser (userId) {
      try {
        await deleteBlock(userId)
        this.blocks = await fetchBlocks()
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
      vm.nickname = userNickname
      vm.email = userEmail
      vm.pictureSrc = userPicture
      vm.sexual = userConfig.sexual
      vm.social = userConfig.social
      vm.myPosts = myPosts
      vm.recentViewedPosts = recentViewedPosts
      vm.scrapPosts = scrapPosts
      vm.blocks = blocks
    })
  },
  components: { TheLayout, TheBoard }
}
</script>

<i18n>
ko:
  profile: '프로필'
  profile-photo: '프로필 사진'
  nickname: '이름'
  additional-settings: '추가 설정'
  r-rated: '성인글 보기'
  politics: '정치글 보기'
  save: '저장'
  logout: '로그아웃'
en:
  profile: 'My account'
  profile-photo: 'Photo'
  nickname: 'User name'
  additional-settings: 'Settings'
  r-rated: 'See adult contents'
  politics: 'See political content'
  save: 'Save'
  logout: 'Logout'
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

.profile-change {
  position: relative;
  right: 2rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-top: auto;
  padding: 8px;
  background-color: #fafafa;
  border-color: grey;
  border-width: 3px;
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
