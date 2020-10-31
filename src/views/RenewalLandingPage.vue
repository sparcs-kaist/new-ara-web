<template>
  <div class="parent">
    <div class="landing">

      <a class="landing__lang"
        @click="changeLocale"
        id="toggle-language"
      >
        <span class="icon">
          <i class="material-icons">language</i>
        </span>
      </a>

      <div class="landing__internal">
        <div v-if="!helpPopup">
          <img src="@/assets/ServiceAra.svg" class="landing__logo">

          <h3 class="landing__title">{{ $t('title') }}</h3>

          <div class="landing-section landing-section--relaxed">
            <p>{{ $t('from-oct') }}</p>

            <p>{{ $t('notice') }}
              <span class="red">{{ $t('highlight') }}</span>
              {{ $t('let-access') }}
            </p>
          </div>

          <div class="landing-section" v-for="(section, key) in sections" :key="key">
            <h4 class="landing-section__title"> {{ section.title }} </h4>

            <div class="landing-section__contents" v-for="(content, i) in section.contents" :key="i">
              <span class="check red">✓</span>
              <i18n :path="`sections.${key}.contents.${i}.text`">
                <template v-if="content.link" #link>
                  <a class="landing-section__link" :href="content.link">
                    {{ content['link-text'] }}
                  </a>
                </template>
              </i18n>
            </div>
          </div>

          <div class="landing-section landing-section--relaxed">
              <p>{{ $t('more-info') }}</p>
              <p>{{ $t('start-with') }}</p>
          </div>

          <div class="landing__buttons">
            <router-link :to="{ name: 'board', params: { boardSlug: 'ara-notice' } }" class="landing__button">
              <h4>
                <span class="red">{{ $t('new-ara') }}</span>
                {{ $t('new-ara-guide-name') }}
              </h4>
              <p>{{ $t('new-ara-guide-exp') }}</p>
              <i class="material-icons">chevron_right</i>
            </router-link>

            <router-link :to="{ name: 'home' }" class="landing__button">
              <h4>
                <span class="red">{{ $t('new-ara') }}</span>
                {{ $t('new-ara-link') }}
              </h4>
              <i class="material-icons">chevron_right</i>
            </router-link>

            <a class="landing__button" href="https://ara.kaist.ac.kr">
              <h4>{{ $t('old-ara-link') }}</h4>
              <i class="material-icons">chevron_right</i>
            </a>
          </div>
        </div>

        <div class="landing__contact">
          <p>Contact</p>
          <p>new-ara@sparcs.org</p>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
ko:
    title: 'KAIST 공식 커뮤니티 ARA가 리뉴얼되었습니다.'
    from-oct: '10월 31일부로, 리뉴얼된 아라와 함께할 수 있습니다.'
    notice: 'KAIST 학내 모든 정보에 대하여, '
    highlight: '가장 정확한 정보를 가장 신속하게'
    let-access: ' 접근할 수 있도록 합니다.'
    sections:
      please:
        title: '부탁사항'
        contents:
          - text: '기존 ARA 회원분들도 New-ARA에서 새로 가입을 진행해주셔야 합니다.'
          - text: 'New-ARA에 대한 각종 피드백은 {link}로 보내주세요.'
            link-text: '피드백 링크'
            link: 'https://forms.gle/Gb3jJbdpjFRsThAY6'

          - text: '교내 식당, 카페 등 입주업체 분들은 {link}에서 회원등록을 부탁드릴게요.'
            link-text: '입주업체 등록 링크'
            link: 'https://bit.ly/newara-comp-signup'

          - text: '교내 학생단체 공용계정을 만들고 싶은 분들은 {link}에서 회원등록을 부탁드릴게요.'
            link-text: '학생단체 등록 링크'
            link: 'https://bit.ly/newara-org-signup'

      aware:
        title: '유의사항'
        contents:
          - text: '베타기간 동안에는 기존 ARA와 new ARA가 함께 운영되며, 새로운 글은 new ARA에만 남길 수 있습니다.'
          - text: '베타기간이 끝나면, 기존 ARA 사이트는 내릴 예정입니다.'

    more-info: '보다 자세한 내용은 아래 New ARA 이용가이드에서 확인하실 수 있습니다.'
    start-with: '지금 새로운 ARA와 함께하세요.'
    new-ara: 'New ARA'
    new-ara-guide-name: '이용 가이드 바로가기'
    new-ara-guide-exp: '변화된 아라에 대한 가이드를 제공합니다.'
    new-ara-link: '바로가기'
    old-ara-link: '기존 ARA 바로가기'
en:
    title: 'The official KAIST community, ARA, has been renewed.'
    from-oct: 'From Oct 31th, you can be with the renewed ARA,'
    notice: 'ARA is designed to provide'
    highlight: 'the fastest delivery of the most accurate information.'
    let-access: ' '
    sections:
      please:
        title: 'Requests'
        contents:
          - text: 'The users of old ARA also have to sign up for New-ARA.'
          - text: 'Please give us feedbacks for New-ARA {link}.'
            link-text: 'here (Feedback Link)'
            link: 'https://forms.gle/Gb3jJbdpjFRsThAY6'

          - text: 'On-campus companies like resaurants or caffes should sign up {link}.'
            link-text: 'here (On-campus Companies Signup)'
            link: 'https://bit.ly/newara-comp-signup'

          - text: 'Student Organizations who want to make a shared account should sign up {link}.'
            link-text: 'here (Student Organizations Signup)'
            link: 'https://bit.ly/newara-org-signup'

      aware:
        title: 'Note'
        contents:
          - text: 'During the beta period, both old ARA and new ARA will be supported, however, new posts can only be uploaded on new ARA.'
          - text: 'After the beta test, we will shut down old ARA.'

    more-info: 'For more information, please check in below New ARA Guide.'
    start-with: 'Now, you are more than welcomed to new ARA!'
    new-ara: 'New ARA'
    new-ara-guide-name: 'guide'
    new-ara-guide-exp: 'We introduce the changed ARA.'
    new-ara-link: 'Link'
    old-ara-link: 'Go to Old ARA.'
</i18n>

<script>
export default {
  name: 'RenewalLandingPage',

  data () {
    return {
      helpPopup: false
    }
  },

  computed: {
    sections () {
      return this.$i18n.messages[this.$i18n.locale]['sections']
    }
  },

  methods: {
    changeLocale () {
      this.$root.$i18n.locale = this.$root.$i18n.locale === 'en' ? 'ko' : 'en'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/theme.scss";

@mixin desktopLanding {
  @media all and (min-width: 800px) and (min-height: 850px) {
    @content;
  }
}

.parent {
  width: 100%;
  position: relative;
  z-index: 1;

  @include desktopLanding {
    position: fixed;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.18);
  }
}

.landing {
  @include desktopLanding {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: var(--grey-100);
    max-height: 860px;
  }

  max-width: 822px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  align-content: center;

  &__internal{
    margin: 56px;
  }

  &__logo {
    width: 92px;
    height: 50px;
  }

  &__title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 10px;
  }

  &__lang {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  &__buttons {
    margin: 0 -5px;
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
  }

  &__button {
    cursor: pointer;
    position: relative;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 3px 6px 0 rgba(169, 169, 169, 0.16);
    height: 60px;
    margin: 5px;
    padding: 0 20px;
    padding-right: 60px;

    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    &--long {
      min-width: 240px;
      @media all and (min-width: 790px){
        min-width: 290px;
      }
    }

    & > .material-icons {
      position: absolute;
      top: 50%;
      right: 18px;
      transform: translate(0, -50%);
    }

    h4 {
      font-size: .8rem;
      font-weight: 600;
    }

    p {
      font-size: .6rem;
    }
  }

  &__contact {
    margin-top: 20px;

    @include desktopLanding {
      position: absolute;
      bottom: 18px;
      right: 18px;
    }

    p {
      display: inline;
      color: var(--grey-600);
      font-weight: 500;
      margin-left: 12px;
    }
  }
}

.landing-section {
  margin-top: 36px;

  &--relaxed {
    margin-top: 48px;
  }

  &__contents {
    margin: 2px 0;
  }

  h4 {
    margin: 10px 0;
    font-weight: 600;
    font-size: 1rem;
  }

  a {
    color: var(--theme-500);
  }
}

span, p {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.92;
}

.red {
  color:#ed3a3a;
}

.check {
  margin-right: 16px;
}

.close {
  cursor: pointer;
}
</style>
