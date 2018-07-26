<template>
  <TheLayout>
    <div class="container">
      <div class="field">
        <label for="nickname" class="label"> 닉네임 </label>
        <div class="control">
          <input type="text"
            id="nickname"
            class="input"
            v-model="nickname"
          />
        </div>
      </div>
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
      <div class="profile-container">
        프로필
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
            @change="pictureHandler "
          />
        </div>
      </div>
      <TheSettingBlocks/>
      <button
        class="button is-text"
        :class="{ 'is-loading': updating }"
        @click="updateSettings">
        업데이트
      </button>
    </div>
  </TheLayout>
</template>

<script>
import store from '@/store'
import { updateUser } from '@/api'
import { progressHandler } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'
import TheSettingBlocks from '@/components/TheSettingBlocks.vue'

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
    store.commit('fetch/startProgress')
    try {
      await store.dispatch('fetchUser', progressHandler)
      const { userNickname, userPicture, userConfig } = store.getters
      next(vm => {
        vm.nickname = userNickname
        vm.pictureSrc = userPicture
        vm.sexual = userConfig.sexual
        vm.social = userConfig.social
      })
    } catch (err) {
      next(false)
    }
    store.commit('fetch/endProgress')
  },
  components: { TheLayout, TheSettingBlocks }
}
</script>

<style scoped>
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
</style>
