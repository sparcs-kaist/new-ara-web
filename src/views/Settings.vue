<template>
  <TheLayout>
    <div>
      <div class="title">
        {{ $t('my-profile') }}
      </div>
      <div class="profile-container">
        <label class="label">
          {{ $t('profile') }}
        </label>
        <img
          :src="pictureSrc"
          alt="프로필 사진"
          class="image profile"
        />
      </div>
      <br>
      <div class="field">
        <div class="control">
          <input
            type="file"
            @change="pictureHandler"
          />
        </div>
      </div>
      <div class="field">
        <label for="nickname" class="label"> {{ $t('nickname') }} </label>
        <div class="control">
          <input type="text"
            id="nickname"
            class="input input-nickname"
            v-model="nickname"
          />
        </div>
      </div>
      <div class="fields-container">
        <label class="label"> {{ $t('additional') }} </label>
        <div class="field">
          <label for="sexual" class="checkbox">
            <input type="checkbox"
              id="sexual"
              class="checkbox"
              v-model="sexual"
            />
            {{ $t('show-sexual') }}
          </label>
        </div>
        <div class="field">
          <label for="social" class="checkbox">
            <input type="checkbox"
              id="social"
              v-model="social"
            />
            {{ $t('show-political') }}
          </label>
        </div>
      </div>

      <div class="field">
        <label for="darkMode" class="label"> {{ $t('theme') }} </label>
        <div class="select">
          <select id="darkMode" v-model="darkMode">
            <option value="light"> {{ $t('darkmode-light') }} </option>
            <option value="dark"> {{ $t('darkmode-dark') }} </option>
            <option value="system-dark"> {{ $t('darkmode-system') }} </option>
          </select>
        </div>
      </div>

      <button
        class="button button-update"
        :class="{ 'is-loading': updating }"
        @click="updateSettings">
        {{ $t('update') }}
      </button>
    </div>
    <div class="title title-danger-zone">
      Danger Zone
    </div>
    <router-link
      :to="{ name: 'logout-handler' }">
      <div class="button button-logout">
        로그아웃
      </div>
    </router-link>
  </TheLayout>
</template>

<script>
import store from '@/store'
import { updateUser } from '@/api'
import { fetchWithProgress } from './helper'
import TheLayout from '@/components/TheLayout.vue'
import TheSettingBlocks from '@/components/TheSettingBlocks.vue'
import TheSettingReports from '@/components/TheSettingReports.vue'

export default {
  name: 'settings',
  data () {
    return {
      nickname: null,
      picture: null,
      pictureSrc: '',
      sexual: false,
      social: false,
      updating: false,
      darkMode: 'light'
    }
  },
  methods: {
    // @TODO: setting update를 vuex에도 반영. 그냥 다시 fetch 해도 될지도 (...)
    async updateSettings () {
      this.updating = true
      try {
        await updateUser(store.getters.userId, {
          nickname: this.nickname,
          picture: this.picture,
          sexual: this.sexual,
          social: this.social
        }).then(res => {
          store.commit('setUserProfile', res.data)
        })

        await store.dispatch('updateDarkMode', this.darkMode)
      } catch (err) {
        store.dispatch('showError', this.$t('error-updating'))
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
    const { userNickname, userPicture, userConfig, darkMode } = store.getters

    next(vm => {
      vm.nickname = userNickname
      vm.pictureSrc = userPicture
      vm.sexual = userConfig.sexual
      vm.social = userConfig.social
      vm.darkMode = darkMode
    })
  },
  components: { TheLayout, TheSettingBlocks, TheSettingReports }
}
</script>

<i18n>
  ko:
    logout: '로그아웃'
    update: '업데이트'
    theme: '테마'
    darkmode-light: '라이트 모드'
    darkmode-dark: '다크 모드'
    darkmode-system: '시스템 설정에 따라'
    additional: '추가 설정'
    show-political: '정치글 보기'
    show-sexual: '성인글 보기'
    nickname: '닉네임'
    profile: '프로필'
    my-profile: '내 프로필'
    error-updating: '설정 변경 중 문제가 발생했습니다.'

  en:
    logout: 'Logout'
    update: 'Update'
    theme: 'Theme'
    darkmode-light: 'Light Mode'
    darkmode-dark: 'Dark Mode'
    darkmode-system: 'Based on System Settings'
    additional: 'Additional Preferences'
    show-political: 'Show political posts'
    show-sexual: 'Show sexual posts'
    nickname: 'Nickname'
    profile: 'Profile'
    my-profile: 'My Profile'
    error-updating: 'An error occurred while updating settings'
</i18n>

<style lang="scss" scoped>
.input-nickname {
  border: 1px solid rgba(0,0,0,0.3);
  font-size: 20px;

  &:hover {
    border: 1px solid rgba(0,0,0,0.8);
  }
}

.profile {
  height: 5em;
  width: 5em;
  object-fit: cover;
  border-radius: 2.5em;
  border: 1px solid black;
}

.fields-container {
  border-radius: 5px;
  background-color: rgba(0,0,0,0.05);
  padding: 15px;
  margin-bottom: .75rem;
}

.button-update {
  margin-top: 10px;
  transition: 150ms all ease-out;

  &:hover {
    box-shadow: 0px 5px 10px rgba(0,0,0,0.1);
    transition: 150ms all ease-in;
  }
}

.title {
  color: var(--text-lighten-1);

  &:not(:first-child) {
    margin-top: 50px;
  }
}

.label {
  color: var(--text-lighten-1);
}

.title-danger-zone {
  color: #ED3A3A;
}

.button-logout {
  color: white;
  border: none;
  background-color: #ED3A3A;
  font-weight: 700;
  width: 100%;
  height: 40px;

  &:hover {
    background-color: rgb(199, 45, 45);
  }
}
</style>
