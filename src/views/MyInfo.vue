<template>
  <TheLayout class="my-info" :isColumnLayout="false">
    <template #aside-right>
      <div class="column is-one-quarter">
        <div class="box profile-box">
          <a class="setting-button" @click="mobileSettings = !mobileSettings">
            <i class="material-icons">settings</i>
          </a>

          <div
            class="profile-container"
            :style="{ backgroundColor: user.pictureSrc ? 'white' : 'grey' }"
          >
            <img
              v-if="user.pictureSrc"
              :src="user.pictureSrc"
              class="profile-container__image"
              alt="profile image"
            />
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
            <div class="row" v-if="!isNicknameEditable">
              <h1 class="nickname">{{ user.nickname }}</h1>
              <a style="margin-left: 0.25rem;" @click="toggleNicknameInput">
                <i class="material-icons" style="font-size: 1.2rem;">create</i>
              </a>
            </div>
            <div v-else>
              <input class="nickname nickname__input" v-model="newNickname">
              <div class="nickname__buttons">
                <button
                  class="button"
                  @click="toggleNicknameInput(false)"
                  style="margin-right: 0.2rem;"
                >
                  {{ $t('cancel') }}
                </button>
                <button
                  class="button is-link"
                  :class="{ 'is-loading': updating }"
                  @click="toggleNicknameInput(true)">
                  {{ $t('save') }}
                </button>
              </div>
            </div>
            <h2 class="email">{{ user.email ? user.email : $t('empty-email') }}</h2>
          </div>
        </div>

        <div class="boxes" :class="{ 'boxes--mobile-open': mobileSettings }">
          <div class="mobile-header">
            <a class="mobile-header__back" @click="mobileSettings = false">
              <i class="material-icons">chevron_left</i>
            </a>
            <span class="mobile-header__title"> {{ $t('settings') }} </span>
          </div>

          <div class="box">
            <h1 class="box__title">{{ $t('post-settings')}}</h1>

            <div class="setting-container">
              <span>{{ $t('post-settings-sexual') }}</span>
              <label class="checkbox">
                <input v-model="user.sexual" type="checkbox">
              </label>
            </div>

            <div class="setting-container">
              <span>{{ $t('post-settings-social') }}</span>
              <label class="checkbox">
                <input v-model="user.social" type="checkbox">
              </label>
            </div>
            <div class="setting-container__button">
              <button
                class="button"
                :class="{ 'is-loading': updating }"
                @click="updateSettings">
                {{ $t('save') }}
              </button>
            </div>
          </div>

          <div class="box">
            <h1 class="box__title">
              {{ $t('blocked-list') }}
            </h1>

            <ul v-if="blocks && blocks.results && blocks.results.length > 0">
              <li v-for="blockedUser in blocks.results" :key="blockedUser.id">
                <div class="block-user">
                  <img
                    :src="blockedUser.user.profile.picture"
                    class="profile-image__block"
                  />
                  {{ blockedUser.user.profile.nickname }}
                  <a style="margin-left: auto;" @click="deleteBlockedUser(blockedUser.id)">
                    <i class="material-icons" style="font-size: 1.3rem;">close</i>
                  </a>
                </div>
              </li>
            </ul>
            <span v-else>{{ $t('blocked-list-empty') }}</span>
          </div>
        </div>
      </div>
    </template>
    <!--Deleted 'is-half'.-->
    <div class="column ">
      <div class="tabs is-boxed" style="margin: 0 0 0 -1px;">
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

        <SearchBar class="desktop-search is-hidden-touch" searchable small />
      </div>
      <!--Deleted aside-right and the contents of them have been re-located to above.-->
      <div class="board-container">
        <TheBoard v-if="posts" :title="boardTitle" :board="posts" :fromQuery="fromQuery" />
      </div>
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
import { fetchWithProgress } from './helper'
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
  name: 'my-info',
  data () {
    return {
      user: {
        nickname: null,
        email: null,
        picture: null,
        pictureSrc: '',
        sexual: null,
        social: null
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
    }
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
        await deleteBlock(userId)
        this.blocks = await fetchBlocks()
      } catch (err) {
        this.$store.dispatch('dialog/toast', {
          text: this.$t('unblock-failed') + (err.apierr ? '\n' + err.apierr : ''),
          type: 'error'
        })
      }
    }
  },

  async beforeRouteEnter ({ query }, from, next) {
    const [ , posts, blocks ] = await fetchWithProgress([
      store.dispatch('fetchMe'),
      fetchByQuery(query),
      fetchBlocks()
    ], 'myinfo-failed-fetch')

    const { userNickname, userEmail, userPicture, userConfig } = store.getters

    next(vm => {
      vm.user = {
        nickname: userNickname,
        email: userEmail,
        pictureSrc: userPicture,
        sexual: userConfig.sexual,
        social: userConfig.social
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

  components: { SearchBar, TheLayout, TheBoard }
}
</script>

<i18n>
ko:
  empty-email: '이메일 주소가 없습니다.'
  post-settings: '게시글 보기 설정'
  post-settings-sexual: '성인글 보기 설정'
  post-settings-social: '정치글 보기 설정'
  board-my: '내가 쓴 글'
  board-recent: '최근 본 글'
  board-archive: '담아둔 글'
  blocked-list: '내가 차단한 유저 목록'
  blocked-list-empty: '차단한 유저가 없습니다.'
  save: '저장'
  cancel: '취소'
  setting-change-failed: '설정 변경 중 문제가 발생했습니다.'
  unblock-failed: '차단 유저 삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
  document-title: 'Ara - 내정보'
  success: '저장되었습니다.'
  settings : '설정'

en:
  empty-email: 'No email address'
  post-settings: 'Post settings'
  post-settings-sexual: 'Show sexual posts'
  post-settings-social: 'Show political posts'
  board-my: 'My posts'
  board-recent: 'Recently viewed'
  board-archive: 'Bookmarks'
  blocked-list: 'Blocked users'
  blocked-list-empty: 'There are no blocked users.'
  save: 'Save'
  cancel: 'Cancel'
  setting-change-failed: 'Failed while updating settings.'
  unblock-failed: 'Failed while unblocking user. Please try again after a while.'
  document-title: 'Ara - MyInfo'
  success: 'Saved successful.'
  settings : 'Settings'
</i18n>

<style lang="scss" scoped>
@import "@/theme.scss";

/*h1{
  word-break:keep-all;
}

span{
  word-break:keep-all;
}*/

//Temporary-solution. But better then the code in the comment above.
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

.tabs {
  height: 3rem;
  overflow: visible;

  ul {
    align-items: stretch;
    border: none;
    overflow: hidden;
    overflow-x: auto;
  }

  li {
    display: flex;
    align-items: stretch;
    border: none;
    border-radius: 6px 6px 0 0;
    transition: background var(--duration) var(--background-timing);

    &.is-active {
      box-shadow: 0 0 15px 0 rgba(169, 169, 169, 0.16);

      &:hover {
        background: transparent;
      }

      a:hover {
        background: #fafafa;
      }
    }

    &:hover {
      background: whitesmoke;
    }

    a {
      border: none;
      border-radius: 6px 6px 0 0;
      position: relative;
      z-index: 1;
      transition: background all var(--duration) var(--background-timing);

      &:hover {
        background: transparent;
      }
    }
  }
}

.box {
  padding: 40px;
  background: #fff;
  box-shadow: 0 0 15px 0 rgba(169, 169, 169, 0.16);

  &__title {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  @include breakPoint(mobile) {
    padding: 20px;

    &__title {
      font-size: 1rem;
      margin-bottom: 2rem;
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

.row {
  display: flex;
  align-items: center;
}

.profile-box {
  position: relative;
  @include breakPoint(mobile) {
    display: flex;
    flex-wrap: wrap;
  }
}

.profile-container {
  position: relative;
  display: inline-flex;
  width: 6rem;
  height: 6rem;
  margin-bottom: 0.5rem;
  border-radius: 50%;

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
    width: 3rem;
    height: 3rem;
    margin-right: 2rem;

    &__image {
      width: 3rem;
      height: 3rem;
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
  }

  &__input {
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
}

.nickname-container {
  @include breakPoint(mobile) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 0;
    flex: 1;
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

  .material-icons {
    font-size: 1.3rem;
  }

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
  margin-top: -10px;

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
