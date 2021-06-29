<template>
  <div class="facade">
    <div class="filter is-blur">
      <div class="container is-fake">
      </div>
    </div>
    <div class="button-container is-blocker has-text-centered">
      <div class="inner-container">
        <div class="logo"> <img src="@/assets/ServiceAra.svg"> </div>
        <a class="login-button" :href="loginUrl"> SPARCS SSO로 로그인 </a>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUrl } from '@/http.js'

export default {
  name: 'facade',
  computed: {
    loginUrl () {
      return `${apiUrl}/api/users/sso_login/?next=${location.protocol}//${location.host}/login-handler`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme.scss';
.facade {
  margin-bottom: 54px;
  @include breakPoint(mobile) {
    margin-bottom: 174px;
  }
}
.filter.is-blur {
  filter: blur(5px);
}

.container.is-fake {
  margin-top: 4rem;
}

.button-container.is-blocker {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .inner-container {
    margin-top: 40vh;
    .logo {
      img {
        height: 4rem;
      }
    }
    .login-button {
      height: 2rem;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
}
</style>
