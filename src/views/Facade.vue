<template>
  <a class="button is-login is-primary is-large" :href="loginUrl">
    <h1>로그인</h1>
  </a>
</template>

<script>
import { apiUrl } from '@/http.js'

export default {
  name: 'facade',
  computed: {
    loginUrl () {
      return `${apiUrl}/login/?next=${location.protocol}//${location.host}/login-handler`
    }
  }
}
</script>

<style>

</style>
