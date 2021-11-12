<template>
<div>
  <div class="identity-bar">
    <transition name="fadeHeight" mode="out-in">
      <div class="identity-bar-noti" v-if="deferredPrompt">
        <div class="img-container">
          <img src="../assets/SparcsLogo.svg" alt="s"/>
        </div>
          <div class="texts">
            <div class="title">
              Ara (아라) : 가장 신속하게 PUSH 알림을 받아보세요.
            </div>
          <div class="desc">
            Ara 어플리케이션 설치하기 (데스크탑, 안드로이드, iOS)
          </div>
        </div>
        <button @click="installWebApp">설치</button>
        <button @click="closeInstall">닫기</button>
      </div>
    </transition>
  </div>
  <div class="navbar" aria-label="main navigation" role="navigation">
    <!-- <TheNavbarFetchProgressBar/> -->
    <div class="navbar-container">
      <div class="navbar-brand" :class="{'navbar-active': isMobileMenuActive}">
        <router-link
          :to="{ name: 'home' }"
          class="navbar-item navbar-ara">
          <img src="@/assets/ServiceAra.svg" class="ara-logo"/>
        </router-link>

        <router-link
          :to="{ name: 'write' }"
          class="navbar-item navbar-item--mobile-write is-hidden-desktop">
          <i class="material-icons write-icon">create</i>
        </router-link>

        <a
          class="navbar-burger"
          role="button"
          aria-label="menu"
          aria-expanded="false"
          :class="{ 'is-active': isMobileMenuActive }"
          @click="toggleMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        class="navbar-menu"
        :class="{ 'is-active': isMobileMenuActive }">

        <div class="navbar-start">
          <router-link
            :to="{ name: 'board'}"
            class="navbar-item">

            {{ $t('all') }}
          </router-link>

          <TheNavbarArchives
            class="navbar-item"
          />

          <router-link
            v-for="board in boardListVisible"
            :key="board.id"
            :to="{
              name: 'board',
              params: {
                boardSlug: board.slug
              }
            }"
            class="navbar-item">

            {{ board[`${$i18n.locale}_name`] }}
          </router-link>
        </div>

        <div class="navbar-end">
          <router-link class="navbar-item navbar-item--write is-hidden-touch"
          :to="{ name: 'write' }">
            <span>{{ $t('write') }}</span>
          </router-link>

          <a class="navbar-item"
            @click="changeLocale"
            id="toggle-language">

            <span class="icon">
              <i class="material-icons">language</i>
            </span>

            <span class="is-hidden-desktop">
              {{ $t('language') }}
            </span>
          </a>

          <router-link
            :to="{ name: 'notifications' }"
            class="navbar-item">

            <span class="icon">
              <i class="material-icons">notifications</i>
            </span>

            <span class="is-hidden-desktop">
              {{ $t('notification') }}
            </span>
          </router-link>

          <div class="navbar-item">
            <div class="dropdown is-right is-hoverable">
              <router-link
                :to="isMobileMenuActive ? { name: 'my-info' } : $route.fullPath"
                class="user">

                <img :src="userPicture" class="picture-url"/>
                <span class="username">
                  {{ userNickname }}
                </span>
              </router-link>

              <div class="dropdown-menu is-hidden-touch" id="dropdownMenu" role="menu">
                <div class="dropdown-content">
                  <div class="dropdown-item">
                    <router-link
                      :to="{ name: 'my-info' }"
                      class="navbar-item user">
                      {{ $t('my-page') }}
                    </router-link>
                    <router-link
                      :to="{ name: 'logout-handler' }"
                      class="navbar-item user logout">
                      {{ $t('logout') }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <router-link
            :to="{ name: 'logout-handler' }"
            class="navbar-item is-hidden-desktop">
            {{ $t('logout') }}
          </router-link>
        </div>
      </div>
    </div>

    <TheNavbarNotifications v-if="isNotificationsOpen" />
  </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TheNavbarFetchProgressBar from '@/components/TheNavbarFetchProgressBar.vue'
import TheNavbarNotifications from '@/components/TheNavbarNotifications.vue'
import TheNavbarArchives from '@/components/TheNavbarArchives.vue'
import isIE from '@/utils/isIE.js'

export default {
  name: 'the-navbar',

  data () {
    return {
      isMobileMenuActive: false,
      isNotificationsOpen: false
    }
  },

  computed: {
    ...mapState(['boardList']),
    ...mapGetters(['userNickname', 'userPicture', 'deferredPrompt']),
    boardListVisible () {
      return this.boardList.filter(v => !v.is_hidden)
    },
    isIE () {
      return isIE()
    }
  },

  methods: {
    toggleMobileMenu () {
      this.isMobileMenuActive = !this.isMobileMenuActive
    },

    changeLocale () {
      this.$root.$i18n.locale = this.$root.$i18n.locale === 'en' ? 'ko' : 'en'
    },

    async installWebApp () {
      this.deferredPrompt.prompt()
    },

    async closeInstall () {
      this.$store.commit('setDeferredPrompt', null)
    },

    ...mapActions(['toggleDarkMode'])
  },

  watch: {
    $route () {
      this.isMobileMenuActive = false
    }
  },

  components: {
    TheNavbarFetchProgressBar,
    TheNavbarNotifications,
    TheNavbarArchives
  }
}
</script>

<i18n>
ko:
  language: 'English'
  notification: '알림'
  write: '게시글 작성하기'
  all: '모아보기'
  my-page: '마이페이지'
  logout: '로그아웃'

en:
  language: '한국어'
  notification: 'Notifications'
  write: 'Write Post'
  all: 'All'
  my-page: 'My Page'
  logout: 'Logout'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';

.identity-bar {
  background-color: var(--theme-400);
  min-height: 5px;

  .fadeHeight-enter-active,
  .fadeHeight-leave-active {
    transition: all 0.5s;
    max-height: 50px;
  }
  .fadeHeight-enter,
  .fadeHeight-leave-to
  {
    opacity: 0;
    max-height: 0;
  }

  .identity-bar-noti{
    height: 50px;

      display: flex;
      padding: 0 16px;
      width: 100%;
      flex-direction: row;
      align-items: center;

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
      .texts{
        flex: 1 1 0%;
        overflow: hidden;

        * {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: white;
        }

        .title{
          font-size: 12px;
          margin-bottom: 2px;
        }

        .desc{
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

.navbar-active {
  background-color: transparent;
  @include breakPoint(min) {
    background-color: var(--theme-100);
  }
}

.logout {
  color: var(--theme-400);
  transition: color var(--duration) var(--text-timing);
}

.dropdown-content {
  min-width: 30%;
  max-width: 50%;
  border-radius: 10px;
  width: 13rem;
  float: right;
  text-align: right;
  background-color: #ffffff;
}

.dropdown-item {
  padding: 0.2rem 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navigation {
  padding-top: 10px;
}

.navbar-item {
  display: flex;
  font-size: 15px;

  .write-icon {
    color: var(--theme-400);
  }

  &--mobile-write {
    width: 24px;
    padding: 0;
  }

  &--write {
    color: var(--theme-400);
    border: 1px solid var(--theme-400);
    border-radius: 5px;
    height: 30px;
    width: 128px;
    font-size: 14px;
    margin-right: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: white;
      background-color: var(--theme-400);
      transition: color var(--duration) var(--text-timing);
      transition: background-color var(--duration) var(--text-timing);
    }

    .icon {
      margin-right: 10px;
    }
  }

  @include breakPoint(min) {
    .icon {
      margin-right: 10px;
    }
  }
}

@mixin calByContainer($property, $offset: 0px) {
  @media screen and (min-width: 1088px) {
    #{$property}: calc((100vw - 960px) / 2 - #{$offset});
  }

  @media screen and (min-width: 1280px) {
    #{$property}: calc((100vw - 1152px) / 2 - #{$offset});
  }

  @media screen and (min-width: 1472px) {
    #{$property}: calc((100vw - 1344px) / 2 - #{$offset});
  }
}

.navbar-container {
  @media screen and (min-width: 1088px) {
    display: flex;
  }
  width: 100%;
}

.navbar-brand {
  display: flex;
  @include breakPoint(min) {
    flex: 1;
  }

  .navbar-burger {
    width: 40px;
    margin-left: 5px;
    margin-right: 10px;
    span {
      height: 2px;
      width: 18px;
    }
    &:hover{
      background-color: transparent;
    }
  }
  .navbar-ara {
    flex:1;
    padding-left: 24px;
  }
}

.navbar-start {
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;

  @include calByContainer(margin-left, 80px);
  @include breakPoint(min) {
    margin-left: 0;
    padding-left: 0;

    .navbar-item {
      padding-top: 8px;
      padding-bottom: 8px;
    }
  }
}

.navbar-end {
  align-items: center;
  padding-left: 10px;
  margin-right: 24px;
  @include calByContainer(min-width);

  .navbar-item {
    padding: 8px 4px;

    &:last-child {
      padding-right: 15px;
    }
  }
}

.navbar-menu {
  background: transparent /*!important*/;
  font-weight: 500;
  flex: 1;

  @include breakPoint(min) {
    padding: 10px 10px;
    padding-top: 0px;
    width: inherit;
    background-color: var(--theme-100);
    box-shadow: 0 7px 6px 0 rgba(169, 169, 169, 0.64);
  }
}

.ara-logo {
  height: 27px;
  width: 50px;
}

.user {
  display: flex;
}

.picture-url {
  width: 23px;
  height: 23px;
  object-fit: cover;

  border-radius: 100%;
  margin-left: 5px;
  margin-right: 10px;
}

</style>
