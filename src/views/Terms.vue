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
  components: {TheLayout, TermsPopup},
  created () {
    // TODO: 약관에 동의되어 있는 경우 home으로 리디렉션..?
  }
}
</script>

<style scoped>

</style>
