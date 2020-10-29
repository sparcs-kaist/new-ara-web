<template>
  <footer class="the-footer">
    <div class="footer-menu">
      <div class="footer-item logo-item">
        <a id="sparcs-logo" href="https://sparcs.org">
          <img src="@/assets/SparcsLogo.svg" alt="SPARCS"/>
        </a>
      </div>

      <div class="footer-items">
        <div class="footer-item">
          <!-- @TODO: footer에서 가는 페이지들 만들기 -->
          <a href="https://sparcs.org">
            {{ $t('credit') }}
          </a>
        </div>

        <div class="footer-item">
          <a href="https://sparcs.org">
            {{ $t('license') }}
          </a>
        </div>

        <div class="footer-item">
          <a @click="$refs.terms.openTermsPopup()">
            {{ $t('rules') }}
          </a>
        </div>
      </div>

      <div class="footer-contact">
        {{ $t('contact') }}:
        <a href="mailto:new-ara@sparcs.org">
          new-ara@sparcs.org
        </a>
      </div>
    </div>
    <TermsPopup agree_terms_of_service_at="userprofile.agree_terms_of_service_at" ref="terms" :show="false"/>
    <!-- TODO: 유저 프로필로부터 userprofile.agree_terms_of_service_at 가져와 넘겨주기 -->
  </footer>
</template>

<script>
import TermsPopup from './TermsPopup'
export default {
  components: {TermsPopup}
}
</script>

<i18n>
ko:
  credit: '만든 사람들'
  license: '라이센스'
  rules: '이용 약관'
  contact: '문의'
en:
  credit: 'Credit'
  license: 'License'
  rules: 'Terms of Service'
  contact: 'Contact'
</i18n>

<style lang="scss" scoped>
@import "@/theme.scss";

.the-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  position: relative;
  padding: 15px 30px;

  #sparcs-logo {
    display: flex;

    img {
      height: 30px;
    }
  }

  .footer-menu {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
  }

  .footer-contact {
    white-space: nowrap;
  }

  .footer-items {
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 20px;

    .footer-item {
      margin: 0 10px;

      @include breakPoint (min) {
        display: none;
      }
    }
  }
}
</style>
