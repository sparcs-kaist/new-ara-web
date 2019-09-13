<template>
  <router-link
    :to="{ name: 'home' }"
    class="navbar-item">
    <img src="@/assets/Services-Ara.png" id="ara-logo"/>
  </router-link>
</template>

<script>
export default {
  name: 'the-navbar-ara-logo'

}
</script>

<style lang="scss" scoped>
@import '@/theme.scss';
#ara-logo {
  height: 25px;;
}
</style>
