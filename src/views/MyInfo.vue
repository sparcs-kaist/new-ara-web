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
            <a style="margin-left: 0.25rem;">
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
              <input type="checkbox">
            </label>
          </div>
          <div class="setting-container">
            <span>정치글 보기 설정</span>
            <label class="checkbox">
              <input type="checkbox">
            </label>
          </div>
        </div>
      </div>
    </template>

    <div class="column is-half">
      <div class="box" style="padding: 30px;">
        <div class="tabs">
          <ul>
            <li class="is-active"><a>내가 쓴 글</a></li>
            <li><a>최근 본 글</a></li>
            <li><a>내가 쓴 글</a></li>
          </ul>
        </div>
        <TheBoard :board="articles" />
      </div>
    </div>

    <template #aside-right>
      <div class="column is-one-quarter">
        <div class="box">
          <h1 style="font-size: 1.2rem; font-weight: bold;">내가 차단한 유저 목록</h1>
        </div>
      </div>
    </template>
  </TheLayout>
</template>

<script>
import store from '@/store'
import { fetchArchives, fetchArticles, updateUser } from '@/api'
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
      archives: null,
      articles: null
    }
  },
  methods: {
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
    }
  },
  async beforeRouteEnter (to, from, next) {
    await fetchWithProgress([ store.dispatch('fetchMe') ])
    const { userNickname, userEmail, userPicture, userConfig } = store.getters
    next(vm => {
      vm.nickname = userNickname
      vm.email = userEmail
      vm.pictureSrc = userPicture
      vm.sexual = userConfig.sexual
      vm.social = userConfig.social
    })
  },
  components: { TheLayout, TheBoard },
  async mounted () {
    this.archives = await fetchArchives()
    this.articles = await fetchArticles({ username: this.nickname })
  }
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
</style>
