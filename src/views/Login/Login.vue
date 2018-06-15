<template>
  <section class="hero is-fullheight">
    <article v-if="sessionExpired" class="message is-danger">
      <div class="message-body">
        시간이 오래 지나 다시 로그인하셔야 합니다.
      </div>
    </article>
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title is-login">아라</h1>
        <a class="button is-login is-primary is-large" :href="loginUrl">
          <h1>로그인</h1>
        </a>
        <div id="login-information">
          <div class="icon is-small">
            <i class="mdi mdi-information"></i>
          </div>
          <div class="paragraph">
            <small>아라는 KAIST 학내 커뮤니티입니다. 아라를 이용하려면 SPARCS SSO 계정으로 로그인하셔야 합니다. 아직 계정이 없다면 회원가입 및 KAIST 구성원 인증 절차를 거쳐 아라의 모든 서비스를 이용할 수 있습니다.</small>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['apiUrl']),
    loginUrl() {
      return `${this.apiUrl}/login/?next=${location.protocol}//${location.host}`;
    },
    sessionExpired() {
      return Object.keys(this.$route.query).includes('session_expired');
    },
  },
};
</script>

<style>
h1.title.is-login {
  font-weight: 700;
}

a.button.is-login {
  display: block;
  max-width: 320px;
  /* font-size: 24px; */
  margin: 0 auto;
}

#login-information  {
  display: flex;
  max-width: 320px;
  margin: 3rem auto 0;
}

#login-information > .icon {
  float: left;
}

#login-information > .paragraph {
  display: block;
  font-size: .75rem;
  margin-left: .5rem;
  text-align: left;
}
</style>
