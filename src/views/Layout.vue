<template>
  <div class="layout">
    <TheNavbar/>
    <TheApiErrorNotification/>
    <router-view/>
    <TheFooter/>
  </div>
</template>

<script>
import store from '@/store'
import TheNavbar from '@/components/TheNavbar'
import TheFooter from '@/components/TheFooter'
import TheApiErrorNotification from '@/components/TheApiErrorNotification'

export default {
  components: { TheNavbar, TheFooter, TheApiErrorNotification },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchUser')
      .then(() => next())
  }
}
</script>

<style>

</style>
