<template>
  <div class="facade">
    <div class="filter is-blur">
      <div class="container is-fake">
        <!-- <p>시와 잠, 위에 가슴속에 이웃 나는 별빛이 거외다. 풀이 비둘기, 릴케 별이 거외다. 하나에 지나고 헤는 청춘이 프랑시스 하나의 봅니다. 하나에 별들을 가난한 쓸쓸함과 사람들의 된 거외다. 지나고 어머니, 밤을 못 노루, 가을 이국 나는 않은 거외다. 이름과, 별 무덤 별 까닭입니다. 풀이 피어나듯이 동경과 계절이 별들을 어머니, 거외다. 봄이 별들을 하나에 나는 별에도 봅니다. 라이너 쓸쓸함과 어머님, 무덤 아직 계십니다. 사람들의 쉬이 하나에 듯합니다.</p>
        <p>그러나 이름과 무성할 슬퍼하는 헤일 내린 아름다운 청춘이 까닭입니다. 피어나듯이 다 사람들의 까닭이요, 별 이네들은 계십니다. 비둘기, 이름과, 딴은 어머니 보고, 있습니다. 하나의 어머니, 이 시인의 토끼, 라이너 듯합니다. 했던 별들을 어머님, 멀리 버리었습니다. 써 책상을 이제 비둘기, 나의 버리었습니다. 내 청춘이 무덤 노루, 남은 나는 다 어머님, 하나에 버리었습니다. 별에도 불러 가난한 봅니다. 무엇인지 별 벌레는 봅니다. 했던 사랑과 노새, 이름과, 하나의 하나에 하나에 봅니다.</p>
        <p>사람들의 우는 다 별 덮어 옥 있습니다. 까닭이요, 이제 딴은 어머니 비둘기, 경, 했던 까닭이요, 하나에 봅니다. 새워 라이너 쓸쓸함과 노루, 걱정도 써 듯합니다. 이름과, 별을 별 된 소학교 피어나듯이 버리었습니다. 나는 별 밤이 패, 부끄러운 까닭입니다. 벌레는 계집애들의 둘 언덕 별 거외다. 덮어 다 위에 아스라히 시와 버리었습니다. 하나에 아스라히 한 그러나 이 있습니다. 어머니, 위에 별 멀리 오는 강아지, 별을 잔디가 있습니다. 계집애들의 별 이네들은 비둘기, 가을로 무성할 까닭입니다.</p>
        <p>마디씩 밤이 노루, 다 이름과, 가난한 어머니 까닭입니다. 걱정도 나의 사람들의 까닭입니다. 위에 어머니, 까닭이요, 지나고 하나에 시와 있습니다. 나의 프랑시스 이런 내린 듯합니다. 언덕 나의 별 강아지, 내린 덮어 봅니다. 피어나듯이 별들을 흙으로 쉬이 듯합니다. 했던 소학교 흙으로 새워 다 지나고 헤는 별을 있습니다. 그러나 보고, 토끼, 하나의 헤일 위에 벌레는 사람들의 듯합니다. 노새, 보고, 이웃 동경과 이네들은 위에도 어머니 봅니다.</p> -->
      </div>
    </div>
    <div class="button-container is-blocker has-text-centered">
      <div class="inner-container">
        <div class="logo"> ARA </div>
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
      height: 4rem;
      font-size: 3rem;
      font-family: 'Raleway', sans-serif;
      color: $theme-red;
    }
    .login-button {
      height: 2rem;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
}
</style>
