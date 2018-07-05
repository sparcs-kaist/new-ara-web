<template>
  <div>
    <div>
      닉네임: {{ user.nickname }}
    </div>
    <div>
      성인/음란성 글 보기: {{ user.see_sexual }}
    </div>
    <div>
      정치/사회성 글 보기: {{ user.see_social }}
    </div>
    <div class="profile-container">
      프로필
      <img
        :src="user.picture"
        alt="프로필 사진"
        class="image profile">
    </div>
    <br>
  </div>
</template>

<script>
import { fetchUser } from '@/api'
import { mapGetters } from 'vuex'

export default {
  name: 'setting',
  data () {
    return {
      user: {}
    }
  },
  computed: {
    ...mapGetters(['jwtPayload'])
  },
  mounted () {
    fetchUser(this.jwtPayload.user_id)
      .then(user => { this.user = user })
  }
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
