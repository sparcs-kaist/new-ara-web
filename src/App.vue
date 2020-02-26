<template>
  <div id="root-container">
    <div id="app">
      <router-view/>
    </div>
    <TheAlertDialogs />
    <TheFooter />
  </div>
</template>

<script>
import TheAlertDialogs from '@/components/TheAlertDialogs.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'app',
  components: {
    TheAlertDialogs,
    TheFooter
  }
}
</script>

<style lang="scss">
@import '@/bulma/index.scss';
#root-container {
  #app {
    @media screen and (min-width: 700px) {
      min-height: 100vh;
      padding-bottom: 54px;
      margin-bottom: -54px;
    }
  }
}
</style>
