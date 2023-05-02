<template>
  <div id="root-container">
    <div id="app">
      <router-view />
      <vue-progress-bar />
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'App',

  components: { TheFooter },

  created () {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }
      this.$Progress.start()
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  },

  mounted () {
    this.$Progress.finish()
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      // Stash the event so it can be triggered later.
      // TODO: disable PWA temporary: not to show in n days
      // this.$store.commit('setPWAPrompt', e)
    })
    window.addEventListener('appinstalled', () => {
      this.$store.commit('setPWAPrompt', null)
    })
  }
}
</script>

<style lang="scss">
@import '@/bulma/index.scss';
#root-container {
  #app {
    min-height: 100vh;
    padding-bottom: 54px;
    margin-bottom: -60px;
    @include breakPoint(mobile) {
      padding-bottom: 174px;
      margin-bottom: -174px;
    }
  }
}
</style>
