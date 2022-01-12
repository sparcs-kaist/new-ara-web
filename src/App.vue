<template>
  <div id="root-container">
    <div id="app">
      <router-view/>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'App',

  components: { TheFooter },

  mounted () {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      // Stash the event so it can be triggered later.
      this.$store.commit('setPWAPrompt', e)
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
