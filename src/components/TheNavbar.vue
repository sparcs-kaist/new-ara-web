<template>
  <div>
    <IdentityBar />
    <div
      :class="{ 'navbar-shadow': false }"
      class="navbar"
      aria-label="main"
      role="navigation"
    >
      <div
        :class="{
          'navbar-active': isMobileMenuActive||isMobileAlarmShow
        }"
        class="navbar-brand"
      >
        <router-link :to="{ name: 'home' }" class="navbar-item navbar-ara">
          <img src="@/assets/ServiceAra.svg" class="ara-logo">
        </router-link>

        <router-link
          :to="{ name: 'write', params: {board: $route.path} }"
          class="navbar-item navbar-item--mobile-write is-hidden-desktop"
        >
          <i class="material-icons write-icon">create</i>
        </router-link>

        <a
          :to="{ name: 'notifications' }"
          class="navbar-item navbar-item--mobile-alarm is-hidden-desktop"
          @click="toggleMobileAlram"
        >
          <i class="material-icons write-icon">notifications</i>
        </a>

        <a
          :class="{ 'is-active': isMobileMenuActive }"
          class="navbar-burger"
          role="button"
          aria-label="menu"
          aria-expanded="false"
          @click="toggleMobileMenu"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        :class="{ 'navbar-clicked': !isMobileAlarmShow }"
        class="navbar-alarm has-dropdown"
      >
        <div class="navbar-dropdown">
          <div class="alarm-popup">
            <AlarmPopupNotifications
              v-for="notification in showedNotifications"
              :key="notification.id"
              :notification="notification"
              class="alarm-content"
            />
            <router-link
              :to="{ name: 'notifications' }"
              class="alarm-popup-router"
            >
              <span>
                {{ $t('morealarm') }}
              </span>
            </router-link>
          </div>
        </div>
      </div>

      <div :class="{ 'is-active': isMobileMenuActive }" class="navbar-menu">
        <div class="navbar-start">
          <router-link :to="{ name: 'board' }" class="navbar-item">
            <span>{{ $t('all') }}</span>
          </router-link>

          <div
            v-for="(groupClicked, groupName, groupId) in boardGroup"
            :key="groupName"
            class="navbar-item has-dropdown is-hoverable boardlist"
          >
            <div class="navbar-item" @click="click(groupName)">
              <i v-if="groupClicked" class="material-icons is-hidden-desktop">expand_less</i>
              <i v-else class="material-icons is-hidden-desktop">expand_more</i>
              <span>{{ $t(`group.${groupName}`) }}</span>
            </div>
            <div
              :class="{
                'navbar-clicked': !groupClicked,
                'is-boxed': true
              }"
              class="navbar-dropdown"
            >
              <router-link
                v-for="board in groupedBoardList[groupId+1]"
                :key="board.id"
                :to="{
                  name: 'board',
                  params: {
                    boardSlug: board.slug
                  }
                }"
                class="navbar-item"
              >
                <div>{{ board[`${$i18n.locale}_name`] }}</div>
              </router-link>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <router-link
            :to="{ name: 'write', params: {board: $route.path} }"
            class="navbar-item navbar-item--write is-hidden-touch"
          >
            <span>{{ $t('write') }}</span>
          </router-link>

          <a
            id="toggle-language"
            class="navbar-item"
            @click="changeLocale"
          >
            <span class="icon">
              <i class="material-icons">language</i>
            </span>

            <span class="is-hidden-desktop">
              {{ $t('language') }}
            </span>
          </a>

          <div
            v-clickOutside="closeAlram"
            class="navbar-item has-dropdown is-hidden-touch is-active"
          >
            <div class="alarmicon" @click="toggleAlram">
              <span
                :class="{'unread-noti': isUnreadNotificationExist}"
                data-badge=" "
                class="icon"
              >
                <i class="material-icons">notifications</i>
              </span>
            </div>
            <div
              v-if="isAlramShow"
              :class="{ 'is-boxed': isHome }"
              class="alarm-popup navbar-dropdown is-hidden-touch"
            >
              <AlarmPopupNotifications
                v-for="notification in showedNotifications"
                :key="notification.id"
                :notification="notification"
                class="alarm-content"
              />
              <router-link
                :to="{ name: 'notifications' }"
                class="alarm-popup-router"
              >
                <span>
                  {{ $t('morealarm') }}
                </span>
              </router-link>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link
              :to="isMobileMenuActive ? { name: 'my-info' } : $route.fullPath"
              class="user"
            >
              <img :src="userPicture" class="picture-url">
              <span class="username">{{ userNickname }}</span>
            </router-link>

            <div :class="{ 'is-boxed': isHome }" class="navbar-dropdown is-hidden-touch">
              <router-link :to="{ name: 'my-info' }" class="navbar-item">
                <span>{{ $t('my-page') }}</span>
              </router-link>
              <router-link :to="{ name: 'logout-handler' }" class="navbar-item logout">
                <span>{{ $t('logout') }}</span>
              </router-link>
            </div>
          </div>

          <router-link
            :to="{ name: 'logout-handler' }"
            class="navbar-item is-hidden-desktop"
          >
            {{ $t('logout') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import IdentityBar from '@/components/IdentityBar.vue'
import { fetchUnreadNotifications } from '@/api'
import { fetchWithProgress } from '@/views/helper'
import { changeLocale } from '@/i18n'
import AlarmPopupNotifications from '@/components/AlarmPopupNotifications.vue'
import _ from 'lodash'
import { onMessageListener } from '@/firebase'

export default {
  name: 'TheNavbar',

  components: {
    IdentityBar,
    AlarmPopupNotifications
  },

  directives: {
    clickOutside: {
      bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  },

  data () {
    return {
      isMobileMenuActive: false,
      notifications: [],
      isUnreadNotificationExist: false,
      isHome: true,
      boardGroup: {
        notice: false,
        talk: false,
        clubs: false,
        money: false,
        communication: false
      },
      isAlramShow: false,
      isMobileAlarmShow: false
    }
  },

  computed: {
    ...mapState(['boardList']),
    ...mapGetters(['userNickname', 'userPicture']),
    boardListVisible () {
      return this.boardList.filter(v => !v.is_hidden)
    },
    groupedBoardList () {
      return _.groupBy(this.boardList, 'group_id')
    },
    showedNotifications () {
      return this.notifications.slice(0, 4)
    }
  },

  watch: {
    $route () {
      this.isMobileMenuActive = false
      this.isHome = this.$route.name === 'home'
    }
  },

  mounted () {
    onMessageListener(this)
  },

  async beforeMount () {
    this.isHome = this.$route.name === 'home'
    await this.reloadNotification()
  },

  methods: {
    toggleMobileMenu () {
      this.isMobileMenuActive = !this.isMobileMenuActive
      this.isMobileAlarmShow = false
    },
    changeLocale,
    ...mapActions(['toggleDarkMode']),
    click (boardName) {
      if (this.boardGroup[boardName]) {
        this.boardGroup[boardName] = false
        return
      }
      for (const board in this.boardGroup) {
        this.boardGroup[board] = false
      }
      this.boardGroup[boardName] = true
    },
    toggleAlram () {
      this.isAlramShow = !this.isAlramShow
    },
    toggleMobileAlram () {
      this.isMobileAlarmShow = !this.isMobileAlarmShow
      this.isMobileMenuActive = false
    },
    closeAlram () {
      this.isAlramShow = false
    },
    closeMobileAlram () {
      this.isMobileAlarmShow = false
    },
    async reloadNotification () {
      // Get only first page of notification.
      const query = { ...this.$route.query, page: '1' }
      const [notifications] = await fetchWithProgress(
        [fetchUnreadNotifications({ query })],
        'notifications-failed-fetch'
      )
      this.notifications = notifications.results
      if (this.notifications.some(noti => !noti.is_read)) {
        this.isUnreadNotificationExist = true
      }
    }
  }
}
</script>

<i18n>
ko:
  language: 'English'
  notification: '알림'
  write: '게시글 작성하기'
  all: '전체보기'
  my-page: '마이페이지'
  logout: '로그아웃'
  group:
    notice: '공지'
    talk: '잡담'
    clubs: '학생 단체 및 동아리'
    money: '거래'
    communication: '소통'
  morealarm: '알림 더 보기'

en:
  language: '한국어'
  notification: 'Notifications'
  write: 'Write Post'
  all: 'All'
  my-page: 'My Page'
  logout: 'Logout'
  group:
    notice: 'Notice'
    talk: 'Talk'
    clubs: 'Organizations and Clubs'
    money: 'Money'
    communication: 'Communication'
  morealarm: 'See more Alarms'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';

@mixin calByContainer($property, $offset: 0px) {
  @media screen and (min-width: $min-desktop-width) {
    #{$property}: calc((100vw - 960px) / 2 - #{$offset});
  }

  @media screen and (min-width: 1280px) {
    #{$property}: calc((100vw - 1152px) / 2 - #{$offset});
  }

  @media screen and (min-width: 1472px) {
    #{$property}: calc((100vw - 1344px) / 2 - #{$offset});
  }
}

div {
  user-select: none;
}

.is-boxed {
  border-radius: 15px !important;
}

.logout {
  color: var(--theme-400);
  transition: color var(--duration) var(--text-timing);
}

.has-dropdown {
  @include breakPoint(min) {
    padding: 0 !important;
  }

  & > .navbar-item > span {
    text-align: left !important;
    @include breakPoint(min) {
      cursor: pointer;
    }
  }
  .user{
    display: flex;
    flex-flow: row;
    align-items: center;
  }
  .alarmicon{
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .navbar-dropdown {
    padding: 0.5rem;
    border-color: white;
    border-bottom: {
      left-radius: 15px;
      right-radius: 15px;
    }
    @include breakPoint(min) {
      width: 100% !important;
      padding: 0 !important;
      padding-left: 15px !important;
    }
  }
  .alarm-popup {
    $dropdown-width: 362px;
    width: $dropdown-width;
    left: calc(50% - #{$dropdown-width/1.3});
    margin: 10px;
    margin-top: 0px;
    border-radius: 0px 0px 20px 20px;
    padding: 0;
    display: flex;
    flex-flow: column;
    @include breakPoint(min) {
      width: 100%;
      border-radius: 0px 0px 20px 20px;
      margin: 0;
      padding-right: 15px;
    }
    .alarm-popup-router {
      padding: 0;
      margin-top: 10px;
      width: 100%;
      height: 40px;
      background: var(--theme-400);
      border: hidden;
      border-radius: 0px 0px 20px 20px;
      display: flex;
      font-size: 14px;
      font-weight: 700;
      color: white;
      align-items: center;
      text-align: center;
      span {
        width: 100%;
      }
      @include breakPoint(min) {
        width: 110%;
        border-radius: 0px;
        margin-left: -15px;
      }
    }
  }

  .navbar-item {
    margin: 0 auto;
    width: 100%;
    text-align: center;
    &:hover {
      background-color: inherit !important;
      text-align: center;
    }
    span {
      text-align: center;
      width: 100%;
    }
    i {
      cursor: pointer;
    }
  }
}

.navbar {
  &-brand {
    display: flex;
    align-items: center;
  }

  @include from(min) {
    &-shadow {
      box-shadow: 0 0 7px 0 grey;
    }
  }

  &-clicked {
    @include breakPoint(min) {
      display: none;
    }
  }

  &-item {
    display: flex;
    font-size: 15px;
    height: 100%;

    .unread-noti {
      &[data-badge] {
        content: attr(data-badge);
        position: relative;
        &::after {
          content: attr(data-badge);
          position: absolute;
          background: red;
          border-radius: 50%;
          display: block;
          padding: 0.3em;
          color: black;
          font-size: 15px;
          max: {
            height: 20px;
            width: 20px;
          }
          right: 2px;
          top: 0px;
        }
      }
    }

    .write-icon {
      color: var(--theme-400);
    }

    .alarm-icon {
      color: var(--theme-400);
    }

    &--mobile-write {
      width: 24px;
      padding: 0;
    }

    &--mobile-alarm {
      width: 24px;
      margin-left: 15px;
      margin-right: 5px;
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

  &-brand {
    display: flex;
    @include breakPoint(min) {
      flex: 1;
    }
  }

  &-burger {
    width: 40px;
    margin: {
      left: 5px;
      right: 10px;
    }
    span {
      height: 2px;
      width: 18px;
    }
    &:hover {
      background-color: transparent;
    }
  }

  &-ara {
    flex:1;
    padding-left: 24px;
  }

  &-active {
    background-color: transparent;
    @include breakPoint(min) {
      background-color: var(--theme-100);
    }
  }

  &-menu {
    background: transparent;
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

  &-alarm {
    @include breakPoint(min) {
      width: inherit;
      background-color: var(--theme-100);
      box-shadow: 0 7px 6px 0 rgba(169, 169, 169, 0.64);
    }
  }

  &-start {
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    flex: 1;

    .has-dropdown {
      display: flex;
      flex-flow: column;
    }

    & > .navbar-item:hover {
      @include from(min) {
        span {
          margin-bottom: -2px;
          border-bottom: 2px solid var(--theme-400);
        }
      }
    }

    @include calByContainer(margin-left, 80px);

    @include breakPoint(min) {
      margin-left: 0;
      padding-left: 0;

      .navbar-item {
        padding: {
          top: 8px;
          bottom: 8px;
        }
      }
    }
  }

  &-end {
    z-index: 2 !important;

    align-items: center;
    padding-left: 10px;
    margin-right: 24px;
    @include calByContainer(min-width);

    .has-dropdown {
      padding-top: 5px !important;
      padding-bottom: 5px !important;
    }

    .navbar-item {
      padding: 8px 4px;

      &:last-child {
        padding-right: 15px;
      }
    }
  }

  @media screen and (min-width: 1088px) {
    display: flex;
  }
  width: 100%;
}

.ara-logo {
  height: 27px;
  width: 50px;
}

.picture-url {
  width: 23px;
  height: 23px;
  object-fit: cover;
  border-radius: 100%;
  margin: {
    left: 5px;
    right: 10px;
  }
}
</style>
