<template>
    <div class="popup-con" v-if="renew_popup">
        <a class = "close"
        role="button"
        @click="exitRenewPopup">
        <div class="line line1"></div>
        <div class="line line2"></div>
        </a>
        <div class="popup">
            <div class="title">
                <img src="@/assets/ServiceAra.svg" class="Services-Ara">
                <h1>{{ $t('title')}}</h1>
            </div>
            <div class="notice-text">
                {{ $t('notice')}}
            </div>
            <div class="text-style-1">
                {{ $t('highlight')}}
            </div>
            <div class="notice-text-end">
                {{ $t('notice_end')}}
            </div>
            <div class="redirects">
                <div class="new-ara-guide">
                    {{ $t('new_ara_guide_name')}}
                    <p class="new-ara-guide-exp">
                        {{ $t('new_ara_guide_exp')}}
                    </p>
                </div>
                <a class="old-ara-link" href="https://ara.kaist.ac.kr/">
                    {{ $t('old_ara_link')}}
                </a>
            </div>
            <div class="background-logo">
                <img src="@/assets/SparcsLogo.svg" class="SPARCS_black">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'RenewPopup',

  data () {
    return {
      renew_popup: true
    }
  },

  methods: {
    exitRenewPopup () {
      this.renew_popup = !this.renew_popup
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

en:
    title: 'The official KAIST community, ARA, has been renewal.'
    notice: 'For all the informations in KAIST, '
    highlight: 'the fastest delivery of the most accurate information.'
    notice_end: 'Now, start with New ARA.'
    new_ara_guide_name: 'Go to guide for using New ARA'
    new_ara_guide_exp: 'We introduce the changed ARA.'
    old_ara_link: 'Go to the Old ARA.'
</i18n>

<style lang="scss" scoped>
@import "@/theme.scss";
.popup{
    font-size: 13px;
    color: var(--text);
    font-family: var(--font);
    font-weight: bold;
    padding-left:56px;
    padding-top:56px;
    padding-bottom:72px;
    padding-right:56px;
    background-color: var(--grey-100);
    border-radius: 10px;
    box-shadow: 0 0 15px 0 rgba(169, 169, 169, 0.64);
    word-break:keep-all;
    line-height:1.92;
}
.Services-Ara {
  width: 92.1px;
  height: 50px;
  object-fit: contain;
}
.SPARCS_black {
  width: 338px;
  height: 100px;
  position:absolute;
  top:50%; left:50%;
  transform: translate(-50%, -50%);
  object-fit: contain;
  opacity: 0.03;
}
.title{
    word-break:keep-all;
    font-weight:bold;
    font-size: 20px;
    margin-bottom:48px;
    line-height:1.42;
}
.notice-text{
    display:inline;
}
.text-style-1{
    display:inline-block;
    color: var(--theme-400);
}
.notice-text-end{
    display:block;
}

.new-ara-guide .new-ara-guide-exp{
    font-size:9px;
    font-style:normal;
    font-weight:500;
    line-height:1.44;
}
.redirects{
    display:flex;
    flex-direction:row;
    margin-top:12px;
}
.new-ara-guide{
    padding-top:21px;
    padding-bottom:21px;
    padding-left:18px;
    padding-right:18px;
    line-height: 1.5;
    border-radius: 10px;
    box-shadow: 0 3px 6px 0 rgba(169, 169, 169, 0.16);
    background-color: var(--background);
}

.old-ara-link{
    padding-top:21px;
    padding-bottom:21px;
    padding-left:18px;
    padding-right:18px;
    border-radius: 10px;
    background-color: var(--background);
    box-shadow: 0 3px 6px 0 rgba(169, 169, 169, 0.16);
}

.close {
    width: 20px;
    height: 20px;
    align-self:right;
    position:absolute;
    right:18px;
    top:18px;
    //background-color: #AAAAAA;
}

.line{
    width:12px;
    height:1px;
    position:absolute;
    background-color:#000000;
}

.line1{
    transform:rotate(45deg);
}

.line2{
    transform:rotate(-45deg);
}
</style>
