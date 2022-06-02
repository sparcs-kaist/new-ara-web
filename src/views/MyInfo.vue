<template>
  <TheLayout :is-column-layout="false" class="my-info">
    <template #aside-right>
      <div class="column is-one-quarter">
        <div :class="{ 'boxes--mobile-open': mobileSettings }" class="boxes">
          <div class="mobile-header">
            <a class="mobile-header__back" @click="mobileSettings = false">
              <i class="material-icons">chevron_left</i>
            </a>
            <span class="mobile-header__title"> {{ $t('settings') }} </span>
          </div>

          <div class="box">
            <div class="redbox" />
            <h1 class="box__title">
              {{ $t('ranking-title') }}
            </h1>
            <!--<i18n tag="h2" path="ranking-subtitle" class="box__subtitle">
              <template #user>{{ user.nickname }}</template>
              <template #ranking>
                <span class="ranking-text">{{ myRanking }}</span>
              </template>
            </i18n>-->
            <div class="box__container">
              <div class="ranking">
                <div class="ranking__card">
                  <div class="ranking__card--title">
                    {{ $t('ranking-posts') }}
                  </div>
                  <div class="ranking__card--counts">
                    {{ $t('ranking-posts-count', { count: user.num_articles }) }}
                  </div>
                </div>
                <div class="ranking__card">
                  <div class="ranking__card--title">
                    {{ $t('ranking-comments') }}
                  </div>
                  <div class="ranking__card--counts">
                    {{ $t('ranking-comments-count', { count: user.num_comments }) }}
                  </div>
                </div>
                <div class="ranking__card">
                  <div class="ranking__card--title">
                    {{ $t('ranking-likes') }}
                  </div>
                  <div class="ranking__card--counts">
                    {{ $t('ranking-likes-count', { count: user.num_positive_votes }) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="box">
            <div class="redbox" />
            <h1 class="box__title">
              {{ $t('settings-title') }}
            </h1>
            <h2 class="box__subtitle">
              {{ $t('settings-subtitle') }}
            </h2>

            <div class="box__container">
              <div class="settings">
                <div class="settings__container">
                  <span class="label">{{ $t('settings-sexual') }}</span>
                  <div @click="updateSetting('sexual')">
                    <i v-if="user.sexual" class="material-icons toggle-on">
                      toggle_on
                    </i>
                    <i v-else class="material-icons">
                      toggle_off
                    </i>
                  </div>
                </div>
                <div class="settings__container">
                  <span class="label">{{ $t('settings-social') }}</span>
                  <div @click="updateSetting('social')">
                    <i v-if="user.social" class="material-icons toggle-on">
                      toggle_on
                    </i>
                    <i v-else class="material-icons">
                      toggle_off
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="box">
            <div class="redbox" />
            <h1 class="box__title">
              {{ $t('blocked-title') }}
            </h1>
            <h2 class="box__subtitle" v-html="$t('blocked-subtitle', { user: user.nickname })" />

            <div class="box__container">
              <ul v-if="blocks && blocks.results && blocks.results.length > 0" class="blocked">
                <li v-for="blockedUser in blocks.results" :key="blockedUser.id">
                  <div class="blocked__user">
                    <img
                      :src="blockedUser.user.profile.picture"
                      class="blocked__user--image"
                    >
                    <span class="blocked__user--nickname">
                      {{ blockedUser.user.profile.nickname }}
                    </span>
                    <a class="blocked__user--remove" @click="deleteBlockedUser(blockedUser.id)">
                      <i class="material-icons" style="font-size: 1.3rem;">close</i>
                    </a>
                  </div>
                </li>
              </ul>
              <div v-else class="blocked-empty">
                {{ $t('blocked-empty') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!--Deleted 'is-half'.-->
    <div class="column ">
      <div class="profile-box">
        <button
          v-if="!isNicknameEditable"
          class="button setting-button"
          @click="mobileSettings = !mobileSettings"
        >
          {{ $t('my-info') }}
        </button>

        <div
          :style="{ backgroundColor: user.pictureSrc ? 'white' : 'grey' }"
          class="profile-container"
        >
          <img
            v-if="user.pictureSrc"
            :src="user.pictureSrc"
            class="profile-container__image"
            alt="profile image"
          >
          <label>
            <input
              type="file"
              style="display: none;"
              @change="pictureHandler"
            >
            <a class="profile-container__button">
              <i class="material-icons">camera_alt</i>
            </a>
          </label>
        </div>

        <div class="nickname-container">
          <div v-if="!isNicknameEditable" class="row">
            <h1 class="nickname">
              {{ user.nickname }}
            </h1>
            <a style="margin-left: 0.5rem;" @click="toggleNicknameInput">
              <i class="material-icons">create</i>
            </a>
          </div>
          <div v-else class="nickname__direction">
            <input v-model="newNickname" class="input nickname nickname__input">
            <div class="nickname__buttons">
              <button
                :class="{ 'is-loading': updating }"
                class="button"
                style="margin-left: 0.8rem; color: var(--theme-400)"
                @click="toggleNicknameInput(true)"
              >
                {{ $t('save') }}
              </button>
              <button
                class="button"
                style="margin-left: 0.8rem;"
                @click="toggleNicknameInput(false)"
              >
                {{ $t('cancel') }}
              </button>
            </div>
          </div>
          <h2 class="email">
            {{ user.email ? user.email : $t('empty-email') }}
          </h2>
        </div>
      </div>

      <div class="tabs" style="margin: 0 0 0 -1px;">
        <ul>
          <li :class="{ 'is-active': $route.query.board !== 'recent' && $route.query.board !== 'archive' }">
            <router-link :to="{ query: { board: 'my'} }">
              {{ $t('board-my') }}
            </router-link>
          </li>
          <li :class="{ 'is-active': $route.query.board === 'recent' }">
            <router-link :to="{ query: { board: 'recent'} }">
              {{ $t('board-recent') }}
            </router-link>
          </li>
          <li :class="{ 'is-active': $route.query.board === 'archive' }">
            <router-link :to="{ query: { board: 'archive'} }">
              {{ $t('board-archive') }}
            </router-link>
          </li>
        </ul>

        <SearchBar
          class="desktop-search is-hidden-touch"
          searchable
          long
        />
      </div>
      <hr class="tabs-divider">
      <!--Deleted aside-right and the contents of them have been re-located to above.-->
      <TheBoard
        v-if="posts"
        :title="boardTitle"
        :board="posts"
        :from-query="fromQuery"
        simplify
      />
    </div>
  </TheLayout>
</template>

<script>
import store from '@/store'
import {
  updateUser,
  fetchArchivedPosts,
  fetchArticles,
  fetchBlocks,
  fetchRecentViewedPosts,
  deleteBlock
} from '@/api'
import { mapGetters, mapState } from 'vuex'
import { fetchWithProgress } from '@/views/helper'
import SearchBar from '@/components/SearchBar.vue'
import TheBoard from '@/components/TheBoard.vue'
import TheLayout from '@/components/TheLayout.vue'

const fetchByQuery = query => {
  const { board } = query
  const context = { ...query, board: undefined }

  switch (board) {
    case 'recent':
      return fetchRecentViewedPosts(query)

    case 'archive':
      return fetchArchivedPosts(query)

    default:
      context.username = store.getters.userId
      return fetchArticles(context)
  }
}

export default {
  name: 'MyInfo',

  components: {
    SearchBar,
    TheLayout,
    TheBoard
  },

  data () {
    return {
      user: {
        nickname: null,
        email: null,
        picture: null,
        pictureSrc: '',
        sexual: null,
        social: null,
        num_articles: null,
        num_comments: null,
        num_positive_votes: null
      },
      posts: null,
      blocks: null,
      updating: false,
      tabIndex: 0,
      isNicknameEditable: false,
      newNickname: null,
      mobileSettings: false
    }
  },

  computed: {
    ...mapState([ 'recentPosts', 'archivedPosts' ]),
    ...mapGetters([ 'userId' ]),

    fromQuery () {
      switch (this.$route.query.board) {
        case 'recent':
          return { from_view: 'recent' }

        case 'archive':
          return { from_view: 'scrap' }

        default:
          return { from_view: 'user', created_by: this.userId }
      }
    },

    boardTitle () {
      if (!this.$route.query.query) return ''

      switch (this.$route.query.board) {
        case 'recent':
          return this.$t('board-recent')

        case 'archive':
          return this.$t('board-archive')

        default:
          return this.$t('board-my')
      }
    },

    myRanking () {
      // @TODO: api 미완성
      return '\u{1F476}아기 넙죽이'
    }
  },

  async beforeRouteEnter ({ query }, from, next) {
    const [ , posts, blocks ] = await fetchWithProgress([
      store.dispatch('fetchMe'),
      fetchByQuery(query),
      fetchBlocks()
    ], 'myinfo-failed-fetch')

    const { userNickname, userEmail, userPicture, userConfig, userActivity } = store.getters

    next(vm => {
      vm.user = {
        nickname: userNickname,
        email: userEmail,
        pictureSrc: userPicture,
        sexual: userConfig.sexual,
        social: userConfig.social,
        num_articles: userActivity.articles,
        num_comments: userActivity.comments,
        num_positive_votes: userActivity.positiveVotes
      }

      vm.posts = posts
      vm.blocks = blocks

      document.title = vm.$t('document-title')
    })
  },

  async beforeRouteUpdate ({ query }, from, next) {
    const [ posts ] = await fetchWithProgress([ fetchByQuery(query) ], 'myinfo-failed-fetch')
    this.posts = posts
    next()
  },

  methods: {
    changeTabIndex (index) {
      this.tabIndex = index
    },

    // @TODO: setting update를 vuex에도 반영. 그냥 다시 fetch 해도 될지도 (...)
    async updateSettings (showUpdating = true) {
      this.updating = true && showUpdating
      try {
        await updateUser(this.userId, {
          nickname: this.newNickname ? this.newNickname : this.user.nickname,
          email: this.user.email,
          picture: this.user.picture,
          sexual: this.user.sexual,
          social: this.user.social
        }).then(res => {
          store.commit('setUserProfile', res.data)
          // Toast
          this.$store.dispatch('dialog/toast', {
            text: this.$t('success'),
            type: 'confirm'
          })
          if (this.newNickname) this.user.nickname = this.newNickname
        })
      } catch (err) {
        this.$store.dispatch('dialog/toast', {
          text: this.$t('setting-change-failed') + (err.apierr ? '\n' + err.apierr : ''),
          type: 'error'
        })
      }
      this.updating = false && showUpdating
    },
    async updateSetting (key) {
      if (key !== 'sexual' && key !== 'social') return

      try {
        const { data } = await updateUser(this.userId, {
          ...this.user,
          [key]: !this.user[key]
        })
        store.commit('setUserProfile', data)
        this.user[key] = !this.user[key]
        // Toast
        this.$store.dispatch('dialog/toast', {
          text: ('success'),
          type: 'confirm'
        })
      } catch (err) {
        this.$store.dispatch('dialog/toast', {
          text: this.$t('setting-change-failed') + (err.apierr ? '\n' + err.apierr : ''),
          type: 'error'
        })
      }
    },
    async pictureHandler ({ target: { files: [ file ] } }) {
      let pictureSrc

      const reader = new FileReader()
      reader.onload = e => { pictureSrc = e.target.result }
      reader.readAsDataURL(file)

      this.user.picture = file
      await this.updateSettings(false)

      this.user.pictureSrc = pictureSrc
    },
    async toggleNicknameInput (isUpdate = false) {
      if (!this.isNicknameEditable) {
        this.newNickname = this.user.nickname
        this.isNicknameEditable = true
      } else {
        if (isUpdate && this.user.nickname !== this.newNickname) {
          await this.updateSettings()
        }

        this.isNicknameEditable = false
      }
    },

    async deleteBlockedUser (userId) {
      try {
        const { status } = await deleteBlock(userId)
        if (status === 403) {
          return this.$store.dispatch('dialog/toast', this.$t('block-rate-limit'))
        }
        this.blocks = await fetchBlocks()
      } catch (err) {
        this.$store.dispatch('dialog/toast', {
          text: this.$t('unblock-failed') + (err.apierr ? '\n' + err.apierr : ''),
          type: 'error'
        })
      }
    }
  }
}
</script>

<i18n>
ko:
  ranking-title: '나의 활동 기록'
  ranking-subtitle: '{user} 님의 등급은 {ranking}입니다.'
  ranking-posts: '게시글'
  ranking-comments: '댓글'
  ranking-likes: '받은 공감'
  ranking-posts-count: '{count}개'
  ranking-comments-count: '{count}개'
  ranking-likes-count: '{count}회'
  settings-title: '게시글 보기 설정'
  settings-subtitle: '조회하실 게시글의 종류를 설정해주세요.'
  settings-sexual: '성인글 보기'
  settings-social: '정치글 보기'
  blocked-title: '내가 차단한 유저 목록'
  blocked-subtitle: '{user} 님이 차단하신 유저 목록입니다.<br />하루에 최대 10번만 변경 가능합니다.'
  blocked-empty: '차단한 유저가 없습니다.'
  empty-email: '이메일 주소가 없습니다.'
  save: '확인'
  cancel: '취소'
  my-info: '내 정보'
  board-my: '내가 쓴 글'
  board-recent: '최근 본 글'
  board-archive: '담아둔 글'
  settings: '설정'
  setting-change-failed: '설정 변경 중 문제가 발생했습니다.'
  unblock-failed: '차단 유저 삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
  success: '저장되었습니다.'
  document-title: 'Ara - 내정보'
  block-rate-limit: '하루에 최대 10번만 차단/해제 할 수 있습니다.'

en:
  ranking-title: 'My Activity'
  ranking-subtitle: 'Your ranking is {ranking}'
  ranking-posts: 'Posts'
  ranking-comments: 'Comments'
  ranking-likes: 'Likes'
  ranking-posts-count: '{count}'
  ranking-comments-count: '{count}'
  ranking-likes-count: '{count}'
  settings-title: 'Post settings'
  settings-subtitle: 'Choose types of posts you want to view.'
  settings-sexual: 'Sexual posts'
  settings-social: 'Political posts'
  blocked-title: 'Blocked users'
  blocked-subtitle: 'Users that you blocked<br />You could change it at most 10 times a day'
  blocked-empty: 'There are no blocked users.'
  empty-email: 'No email address'
  save: 'Confirm'
  cancel: 'Cancel'
  my-info: 'My info'
  board-my: 'My posts'
  board-recent: 'History'
  board-archive: 'Bookmarks'
  settings : 'Settings'
  setting-change-failed: 'Failed while updating settings.'
  unblock-failed: 'Failed while unblocking user. Please try again after a while.'
  success: 'Saved successful.'
  document-title: 'Ara - MyInfo'
  block-rate-limit: 'You could block/unblock at most 10 times a day.'
</i18n>

<style lang="scss" scoped>
@import "@/theme.scss";

.column {
  min-width: 300px;
}

.my-info {
  background: var(--grey-100);
  min-height: 100vh;
  margin-bottom: -57px;
  padding-bottom: 57px;
  @include breakPoint(mobile) {
    margin-bottom: -174px;
    padding-bottom: 174px;
  }
}

.tabs-divider {
  margin: 0;
  background: #333333;
}

.tabs {
  height: 3rem;
  overflow: visible;
  font-size: 18px;
  padding-bottom: 8px;

  ul {
    align-items: stretch;
    border: none;
    overflow: hidden;
    overflow-x: auto;
  }

  li:first-child > a{
    padding-left: 0.1rem;
  }

  li:last-child > a{
    padding-right: 0.1rem;
  }

  @include breakPoint(mobile) {
    font-size: 16px;
    padding-bottom: 0;
  }

  li {
    display: flex;
    align-items: stretch;
    border: none;
    a{
      color: var(--grey-400);
      padding: 0.8rem;
    }

    &.is-active {
      a{
        color: var(--theme-400);
      }
    }
  }
}

.boxes {
  @include breakPoint(mobile) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 21;

    visibility: hidden;
    opacity: 0;
    transform: translateY(10vh);
    transition: all var(--duration) var(--background-timing);
    transition-property: visibility, transform, opacity;

    width: 100%;
    height: 100vh;
    padding: 0 10px;
    overflow: auto;
    background: var(--grey-100);

    &--mobile-open {
      visibility: visible;
      transform: translateY(0);
      opacity: 1;
    }
  }
}

.box {
  padding: 5px;
  background-color: transparent;
  box-shadow: none;
  .redbox {
    background-color: var(--theme-400);
    height: 5px;
    width: 10%;
  }
  &__title {
    font-size: 15px;
    font-weight: 700;
    margin: 10px 0;
  }
  &__subtitle {
    font-size: 12px;
    margin-bottom: 10px;
  }
  &__container {
    background-color: white;
    box-shadow: 0 0 15px 0 rgba(169, 169, 169, 0.16);
    border-radius: 10px;
    padding: 10px;
    color: black;
  }
  @include breakPoint(mobile) {
    padding: 10px;

    &__title {
      font-size: 1rem;
      margin-bottom: 2rem;
    }
  }
}

.ranking {
  display: flex;
  flex-flow: row;

  &__card {
    flex: 1;
    display: flex;
    flex-flow: column;
    align-items: center;
    background-color: white;
    border-left: 1px solid #a9a9a9;
    &:first-child {
      border: none;
    }

    &--title {
      font-size: 12px;
      margin: 10px 0;
    }
    &--counts {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
}

.ranking-text {
  color: var(--theme-400);
}

.settings {
  padding: 15px;
  .material-icons {
    color: #a9a9a9;
    cursor: pointer;
  }

  .toggle-on {
    color: var(--theme-400);
  }

  .label {
    font-size: 12px;
    font-weight: 400;
  }

  &__container {
    padding: 8px 8px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__button {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 1rem;
    }

    .material-icons {
      font-size: 30px;
    }
  }
}

.blocked {
  padding: 0 10px;
  font-size: 12px;

  &__user {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px 0;

    &--image {
      width: 2rem;
      height: 2rem;
      margin-right: 0.5rem;
      object-fit: cover;
      border-radius: 50%;
    }

    &--nickname {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &--remove {
      margin-left: auto;
      i {
        height: 2rem;
        line-height: 2rem;
      }
    }
  }
}

.blocked-empty {
  padding: 10px;
  font-size: 12px;
}

.row {
  display: flex;
  align-items: center;
}

.profile-box {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
  @include breakPoint(mobile) {
    flex-wrap: wrap;
  }
}

.profile-container {
  position: relative;
  display: inline-flex;
  width: 6rem;
  height: 6rem;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 2rem;

  &__image {
    width: 6rem;
    height: 6rem;
    object-fit: cover;
    border-radius: 50%;
  }

  &__button {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background-color: #fafafa;
    border-radius: 50%;

    i {
      font-size: 1.3rem;
    }
  }

  @include breakPoint(mobile) {
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;

    &__image {
      width: 4rem;
      height: 4rem;
    }

    &__button {
      right: -0.5rem;
      bottom: -0.5rem;
    }
  }
}

.nickname {
  font-size: 1.4rem;
  font-weight: 800;

  @include breakPoint(mobile) {
    font-size: 1.1rem;
    word-break: break-all;

    &__input {
      margin-left: 2px;
    }

    &__direction{
      display: flex;
      flex-direction: column !important;
    }
  }

  &__input {
    font-size: initial;
    font-weight: normal;
    width: 100%;
    margin-bottom: 0.3rem;
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 0.3rem;
  }

  &__direction{
    display: flex;
    flex-direction: row;
  }
}

.nickname-container {
  @include breakPoint(mobile) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 0;
    flex: 1;
  }

  .material-icons {
    font-size: 1.3rem;
    line-height: 1.6;
  }
}

.email {
  color: #a9a9a9;
  font-size: 0.8rem;
}

.setting-button {
  position: absolute;
  top: 8px;
  right: 10px;
  display: none;
  color: var(--theme-400);

  @include breakPoint(mobile) {
    display: inline;
  }
}

.mobile-header {
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-weight: 500;

  &__back {
    position: absolute;
    left: 5px;
  }

  @include breakPoint(mobile) {
    display: flex;
  }
}

.setting-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;

  &__button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1rem;
  }
}

.desktop-search {
  &::v-deep .input {
    background: #fff;
    box-shadow: 0 0 15px 0 rgba(169, 169, 169, 0.16);
    border: none;
  }
}

.board-container {
  margin-top: -3px;
  padding: 2rem;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0 15px 0 rgba(169, 169, 169, 0.16);
  position: relative;
}

.block-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.profile-image__block {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  object-fit: cover;
  border-radius: 50%;
}
</style>
