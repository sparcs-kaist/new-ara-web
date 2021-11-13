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
import axios from 'axios'

export default {
  name: 'app',
  components: { TheFooter },
  async mounted () {
    this.createSubscription()

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
  },
  methods: {
    urlBase64ToUint8Array (base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4)
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/')

      const rawData = window.atob(base64)
      const outputArray = new Uint8Array(rawData.length)

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
    },

    createSubscription () {
      if (!('serviceWorker' in navigator)) return

      let reg
      navigator.serviceWorker.ready.then(swreg => {
        reg = swreg
        // subscription이 이미 있는지 조회
        return swreg.pushManager.getSubscription()
      }).then(async sub => {
        console.log(sub)
        // subscription이 없다면 생성
        if (sub === null) {
          let pubkey = await axios.get('https://newara.dev.sparcs.org/api/pwa/key')

          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(pubkey.data.key)
          })
        }
      }).then(subscription => {
        console.log('post subscription : ', subscription)
        return axios.post('https://newara.dev.sparcs.org/api/pwa/subscribe', { subscription: subscription }, {
          headers: { 'Content-type': 'application/json' }
        })
      }).catch(err => {
        console.log(err)
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
