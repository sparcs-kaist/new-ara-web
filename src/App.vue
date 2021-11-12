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
  name: 'app',
  components: { TheFooter },
  mounted () {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      // Stash the event so it can be triggered later.
      this.$store.commit('setDeferredPrompt', e)
    })
    window.addEventListener('appinstalled', () => {
      this.$store.commit('setDeferredPrompt', null)
    })

    let isNotificationSupported = 'Notification' in window
    if (isNotificationSupported) {
      Notification.requestPermission().then(function (result) {
        if (result === 'granted') {
          console.log('[Notification] 허용: ', result)
        } else {
          alert('권한 허용을 해 주시길 바랍니다.')
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/bulma/index.scss';
#root-container {
  #app {
    min-height: 100vh;
    padding-bottom: 54px;
    margin-bottom: -54px;
    @include breakPoint(mobile) {
      padding-bottom: 174px;
      margin-bottom: -174px;
    }
  }
}
</style>
