<template>
  <div class="layout">
    <TheNavbar/>
    <TheApiErrorNotification/>
    <router-view/>
    <TheFooter/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TheNavbar from '@/components/TheNavbar'
import TheFooter from '@/components/TheFooter'
import TheApiErrorNotification from '@/components/TheApiErrorNotification'

export default {
  components: { TheNavbar, TheFooter, TheApiErrorNotification },
  methods: {
    ...mapActions(['fetchUser'])
  },
  beforeRouteEnter () {
    this.fetchUser()
    // .then(() => next()) 해서 fetch가 끝나고 보여주도록 시간 조절 가능할 듯
  }
}
</script>

<style>

</style>
