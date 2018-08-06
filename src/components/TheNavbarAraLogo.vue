<template>
  <router-link
    :to="{ name: 'home' }"
    class="navbar-item"
    id="ara-logo">
    ARA
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
  font-family: 'Raleway', sans-serif;
  color: $theme-red;
  margin-left: 0.75rem;
}
</style>
