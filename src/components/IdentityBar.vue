<template>
  <div class="identity-bar">
    <transition name="fadeHeight" mode="out-in">
      <div v-if="PWAPrompt" class="identity-bar-noti">
        <div class="img-container">
          <img src="../assets/SparcsLogo.svg" alt="s">
        </div>
        <div class="texts">
          <div class="title">
            {{ $t("title") }}
          </div>
          <div class="desc">
            {{ $t("subtitle") }}
          </div>
        </div>
        <button @click="installPWA">
          {{ $t("install") }}
        </button>
        <button @click="closeInstall">
          {{ $t("close") }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IdentityBar',

  computed: {
    ...mapGetters(['PWAPrompt'])
  },

  methods: {
    installPWA () {
      this.PWAPrompt.prompt()
    },
    closeInstall () {
      this.$store.commit('setPWAPrompt', null)
    }
  }
}
</script>

<i18n>
ko:
  title: 'Ara (아라): 가장 정확한 정보를 가장 신속하게.'
  subtitle: 'Ara 어플리케이션 설치하기 (데스크탑, 안드로이드, iOS)'
  install: '설치'
  close: '닫기'
en:
  title: 'Ara: the fastest delivery of the most accurate information'
  subtitle: 'Install Ara application (desktop, Android, iOS)'
  install: 'Install'
  close: 'Close'
</i18n>

<style lang="scss" scoped>
@import "@/theme.scss";

.identity-bar {
  background-color: var(--theme-400);
  min-height: 5px;

  .fadeHeight-enter-active,
  .fadeHeight-leave-active {
    transition: all 0.5s;
    max-height: 50px;
  }
  .fadeHeight-enter,
  .fadeHeight-leave-to {
    opacity: 0;
    max-height: 0;
  }

  .identity-bar-noti {
    height: 50px;
    display: flex;
    padding: 0 16px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);

    .img-container {
      width: 13px;
      height: 25px;
      overflow: hidden;
      margin-right: 10px;

      img {
        width: 90px;
        max-width: initial;
        filter: invert(1);
      }
    }

    .texts {
      flex: 1 1 0%;
      overflow: hidden;

      * {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: white;
      }

      .title {
        font-size: 12px;
        margin-bottom: 2px;
      }

      .desc {
        font-size: 10px;
      }
    }

    button {
      background-color: transparent;
      border: none;
      margin-left: 20px;
      height: 25px;
      padding: 0px;
      color: #bbdefb;
      font-size: 14px;
    }
  }
}
</style>
