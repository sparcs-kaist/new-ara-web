<template>
  <TheLayout>
    <TermsPopup />
  </TheLayout>
</template>

<script>
import store from '@/store'
import TermsPopup from '@/components/TermsPopup.vue'
import TheLayout from '@/components/TheLayout.vue'

export default {
  name: 'Terms',

  components: {
    TermsPopup,
    TheLayout
  },

  beforeRouteEnter (from, to, next) {
    if (store.state.auth?.userProfile?.agree_terms_of_service_at) {
      next('/')
      return
    }
    next()
  }
}
</script>
