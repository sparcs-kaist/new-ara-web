<template>
  <TheLayout>
    <TermsPopup/>
  </TheLayout>
</template>

<script>
import TermsPopup from '../components/TermsPopup'
import TheLayout from '../components/TheLayout'

export default {
  name: 'Terms',

  beforeRounterEnter (from, to, next) {
    if (this.$store.state.userProfile.agree_terms_of_service_at) {
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
