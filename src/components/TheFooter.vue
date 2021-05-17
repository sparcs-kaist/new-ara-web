<template>
  <footer class="the-footer">
    <div class="footer-menu">
      <div class="footer-item logo-item">
        <a id="sparcs-logo" href="https://sparcs.org">
          <img src="@/assets/SparcsLogo.svg" alt="SPARCS"/>
        </a>
        <div class="footer-contact-mobile is-hidden-tablet">
          {{ $t('contact') }}:
          <a href="mailto:new-ara@sparcs.org">
            new-ara@sparcs.org
          </a>
        </div>
      </div>

      <div class="footer-items">
        <div class="footer-item">
          <router-link to="/makers">
            {{ $t('credit') }}
          </router-link>
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

      <div class="footer-contact is-hidden-mobile">
        {{ $t('contact') }}:
        <a href="mailto:new-ara@sparcs.org">
          new-ara@sparcs.org
        </a>
      </div>
    </div>
    <TermsPopup :agree-tos-at="agreeTosAt" ref="terms" :show="false"/>
  </footer>
</template>

<script>
import TermsPopup from './TermsPopup'
export default {
  computed: {
    agreeTosAt () {
      return this.$store.state.auth.userProfile?.['agree_terms_of_service_at']
    }
  },
  components: {
    TermsPopup
  }
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
  padding: 15px 24px;

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

    @include breakPoint (mobile) {
      flex-direction: column-reverse;
      div {
        padding-left: 0;
      }
    }
  }

  .footer-contact-mobile {
    margin: 0;
    font-size: 15px;
    line-height: 1.5;
    white-space: nowrap;

    @media screen and (max-width: 370px) {
      font-size: 11px;
      line-height: 1.8;
    }
  }

  .footer-contact {
    white-space: nowrap;
  }

  .logo-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    @include breakPoint(mobile) {
      margin-top: 12px;
      width:100%;
    }
  }

  .footer-items {
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 20px;
    margin-left: 0px;
    @media screen and (min-width: 1690px) {
      margin-left: calc((100vw - 1344px) / 2 - 170px);
    }
    @include breakPoint(mobile) {
      font-size: 15px;
    }

    .footer-item {
      margin: 0 10px;
    }

    @include breakPoint(mobile) {
      flex-direction: column;
      align-items: flex-start;
      width:100%;
      padding-left: 20px !important;
      .footer-item {
        margin-top: 12px;
      }
    }
  }
}
</style>
