<template>
  <TheLayout>
    <TermsPopup/>
  </TheLayout>
</template>

<script>
import store from '@/store'
import TermsPopup from '../components/TermsPopup'
import TheLayout from '../components/TheLayout'

export default {
  name: 'Terms',

  beforeRouteEnter (from, to, next) {
    if (store.state.auth?.userProfile?.['agree_terms_of_service_at']) {
      next('/')
      return
    }

    next()
  },

  components: {
    TermsPopup,
    TheLayout
  }
}
</script>

<style scoped>

</style>
