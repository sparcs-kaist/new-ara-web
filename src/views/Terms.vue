<template>
  <TheLayout>
    <!-- 비동기적으로 TermsPopup을 로드 -->
    <component :is="TermsPopup" />
  </TheLayout>
</template>

<script>
import store from '@/store'
import TheLayout from '@/components/TheLayout.vue'

export default {
  name: 'Terms',

  components: {
    TheLayout
  },

  data () {
    return {
      TermsPopup: null // 비동기적으로 로드될 컴포넌트
    }
  },

  mounted () {
    this.loadTermsPopup()
  },

  methods: {
    async loadTermsPopup () {
      try {
        const { default: TermsPopup } = await import('@/components/TermsPopup.vue')
        this.TermsPopup = TermsPopup // 로드된 컴포넌트를 data에 저장하여 렌더링
      } catch (error) {
        console.error('Failed to load TermsPopup', error)
      }
    }
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
