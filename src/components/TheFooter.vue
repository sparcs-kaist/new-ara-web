<template>
  <footer :class="{ 'login-footer': this.$route.path === '/login' }" class="the-footer">
    <div class="footer-menu">
      <div class="footer-item logo-item">
        <a id="sparcs-logo" href="https://sparcs.org">
          <img src="@/assets/SparcsLogo.svg" alt="SPARCS">
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
            {{ $t('contributors') }}
          </router-link>
        </div>

        <div class="footer-item">
          <a @click="$refs.terms.openTermsPopup()">
            {{ $t('rules') }}
          </a>
        </div>

        <div class="footer-item">
          <a @click="openChannelService()">
            {{ $t('inquiry') }}
          </a>
        </div>
      </div>

      <div class="footer-contact is-hidden-mobile">
        {{ $t('contact') }}:
        <a href="mailto:ara@sparcs.org">
          ara@sparcs.org
        </a>
      </div>
    </div>
    <TermsPopup
      ref="terms"
      :agree-tos-at="agreeTosAt"
      :show="false"
    />
  </footer>
</template>

<script>
import TermsPopup from '@/components/TermsPopup.vue'
import ChannelService from '@/channel.js'

export default {
  name: 'TheFooter',

  components: {
    TermsPopup
  },

  computed: {
    agreeTosAt () {
      return this.$store.state.auth.userProfile?.agree_terms_of_service_at
    }
  },

  methods: {
    openChannelService () {
      ChannelService.updateUser({
        profile: {
          name: this.$store.state.auth.userProfile?.nickname,
          email: this.$store.state.auth.userProfile?.email
        }
      })
      ChannelService.showMessenger()
    }
  }
}
</script>

<i18n>
ko:
  contributors: '만든 사람들'
  rules: '이용 약관'
  contact: '문의'
  inquiry: '문의하기'
en:
  contributors: 'Contributors'
  rules: 'Terms of Service'
  contact: 'Contact'
  inquiry: 'Inquiry'
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

.login-footer {
  margin-left: 30vw;
  padding-left: 15px;
  @include breakPoint(mobile) {
    margin-left: 0;
    padding-left: 24px;
  }
  @include breakPoint(mobile-min) {
    margin-left: 0;
  }
  .footer-items {
    margin-left: 0;
  }
}
</style>
