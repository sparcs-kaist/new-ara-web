<template>
  <div class="modal" :class="{ 'is-active': renew_popup }">
    <div class="modal-background" />
    <div class="modal-content">
      <a class="close delete is-medium" role="button" @click="exitRenewPopup" />

      <div class="popup">
        <div class="title">
          <img src="@/assets/ServiceAra.svg" class="Services-Ara" />
          <h1>{{ $t("title") }}</h1>
        </div>

        <div class="notice-text">
          {{ $t("notice") }}
        </div>

        <div class="text-style-1">
          {{ $t("highlight") }}
        </div>

        <div class="notice-text-end">
          {{ $t("notice_end") }}
        </div>

        <div class="redirects">
          <router-link
            class="new-ara-guide"
            :to="{
              name: 'board',
              params: {
                boardSlug: 'ara-notice'
              }
            }
          ">
            <div style="display: flex; flex-direction: column;">
              {{ $t("new_ara_guide_name") }}
              <p class="new-ara-guide-exp">
                {{ $t("new_ara_guide_exp") }}
              </p>
            </div>

            <span class="icon" style="margin-left: 10px;">
              <i class="material-icons">chevron_right</i>
            </span>
          </router-link>
          <a class="old-ara-link" href="https://ara.kaist.ac.kr/">
            {{ $t("old_ara_link") }}
            <span class="icon" style="margin-left: 10px;">
              <i class="material-icons">chevron_right</i>
            </span>
          </a>
        </div>

        <a
          class="dismiss-text"
          role="button"
          @click="exitRenewPopupPermanently"
        >
          {{ $t("dismiss_forever") }}
        </a>

        <div class="background-logo">
          <img src="@/assets/SparcsLogo.svg" class="SPARCS_black" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RenewPopup',

  data () {
    return {
      renew_popup: true,
      isLocalStorageAvailable: true
    }
  },

  methods: {
    exitRenewPopup () {
      this.renew_popup = false
    },
    exitRenewPopupPermanently () {
      if (!this.renew_popup) {
        return
      }

      this.renew_popup = false

      if (this.isLocalStorageAvailable) {
        localStorage.setItem('closeRenewPopupPermanently', 1)
      }
    }
  },

  mounted () {
    if (!window.localStorage) {
      this.isLocalStorageAvailable = false
      return
    }

    const showPopup = localStorage.getItem('closeRenewPopupPermanently')
    if (showPopup) {
      this.renew_popup = false
    }
  }
}
</script>

<i18n>
ko:
  title: 'KAIST 공식 커뮤니티 ARA가 리뉴얼되었습니다.'
  notice: 'KAIST 학내 모든 정보에 대하여, '
  highlight: '가장 정확한 정보를 가장 신속하게.'
  notice_end: '지금 새로운 ARA와 함께하세요.'
  new_ara_guide_name: 'New ARA 이용 가이드 바로가기'
  new_ara_guide_exp: '단체 바로가기, 게시판 항목 수정 등 변화된 아라를 소개합니다.'
  old_ara_link: '기존 ARA 바로가기'
  dismiss_forever: '이 팝업 다시 보지 않기'

en:
  title: 'The official KAIST community, ARA, has been renewal.'
  notice: 'For all the informations in KAIST, '
  highlight: 'the fastest delivery of the most accurate information.'
  notice_end: 'Now, start with New ARA.'
  new_ara_guide_name: 'Go to guide for using New ARA'
  new_ara_guide_exp: 'We introduce the changed ARA.'
  old_ara_link: 'Go to the Old ARA.'
  dismiss_forever: 'Do not show again this popup'
</i18n>

<style lang="scss" scoped>
@import "@/theme.scss";

.modal-content {
  border-radius: 10px;
  background-color: var(--grey-100);
}

.popup {
  font-size: 13px;
  color: var(--text);
  font-family: var(--font);
  font-weight: bold;
  padding-left: 56px;
  padding-top: 56px;
  padding-bottom: 72px;
  padding-right: 56px;
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(169, 169, 169, 0.64);
  word-break: keep-all;
  line-height: 1.92;
}

.Services-Ara {
  width: 92.1px;
  height: 50px;
  object-fit: contain;
}

.SPARCS_black {
  width: 338px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: contain;
  opacity: 0.03;
}

.title h1 {
  word-break: keep-all;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 48px;
  line-height: 1.42;
}

.notice-text {
  font-size: 16px;
  display: inline;
}

.text-style-1 {
  font-size: 16px;
  display: inline-block;
  color: var(--theme-400);
}

.notice-text-end {
  font-size: 16px;
  display: block;
  margin-bottom: 28px;
}

.new-ara-guide .new-ara-guide-exp {
  font-size: 9px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.44;
}

.redirects {
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  margin-bottom: 30px;
}

.new-ara-guide {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  padding-top: 21px;
  padding-bottom: 21px;
  padding-left: 18px;
  padding-right: 18px;
  line-height: 1.5;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(169, 169, 169, 0.16);
  background-color: var(--background);
}

.old-ara-link {
  display: inline-flex;
  align-items: center;
  padding-top: 21px;
  padding-bottom: 21px;
  padding-left: 18px;
  padding-right: 18px;
  border-radius: 10px;
  background-color: var(--background);
  box-shadow: 0 3px 6px 0 rgba(169, 169, 169, 0.16);
}

.dismiss-text {
  color: var(--grey-400);
  font-size: 14px;
  text-decoration: underline;
}

.close {
  position: absolute;
  right: 24px;
  top: 24px;
}
</style>
