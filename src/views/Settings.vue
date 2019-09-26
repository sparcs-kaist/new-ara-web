<template>
  <TheLayout>
    <div>

      <div class="title">
        내 프로필
      </div>
      <div class="profile-container">
        <label class="label">
          프로필
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
        <label for="nickname" class="label"> 닉네임 </label>
        <div class="control">
          <input type="text"
            id="nickname"
            class="input input-nickname"
            v-model="nickname"
          />
        </div>
      </div>
      <div class="fields-container">
        <label class="label">추가 설정</label>
        <div class="field">
          <label for="sexual" class="checkbox">
            <input type="checkbox"
              id="sexual"
              class="checkbox"
              v-model="sexual"
            />
            성인글 보기
          </label>
        </div>
        <div class="field">
          <label for="social" class="checkbox">
            <input type="checkbox"
              id="social"
              v-model="social"
            />
            정치글 보기
          </label>
        </div>
      </div>
      <button
        class="button button-update"
        :class="{ 'is-loading': updating }"
        @click="updateSettings">
        업데이트
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
      updating: false
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
    const { userNickname, userPicture, userConfig } = store.getters
    next(vm => {
      vm.nickname = userNickname
      vm.pictureSrc = userPicture
      vm.sexual = userConfig.sexual
      vm.social = userConfig.social
    })
  },
  components: { TheLayout, TheSettingBlocks, TheSettingReports }
}
</script>

<style lang="scss" scoped>
.input-nickname {
  border: 1px solid rgba(0,0,0,0.3);
  font-size: 20px;

  &:hover {
    border: 1px solid rgba(0,0,0,0.8);
  }
}

.profile-container {
  height: 5em;
  width: 5em;
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
}

.button-update {
  margin-top: 10px;
  transition: 150ms all ease-out;

  &:hover {
    box-shadow: 0px 5px 10px rgba(0,0,0,0.1);
    transition: 150ms all ease-in;
  }
}

.title-danger-zone {
  margin-top: 50px;
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
