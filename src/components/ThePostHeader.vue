<template>
  <div class="post">
    <div class="title">
      <div class="title__title-wrapper">
        <router-link class="title__board" :to="{
          name: 'board',
          params: { boardSlug }
        }">
          {{ boardName }}
        </router-link>

        <span class="title__title">
          <span class="title__topic" v-if="post.parent_topic">
            [{{ post.parent_topic[`${$i18n.locale}_name`] }}]
          </span>

          {{ title }}
        </span>
      </div>

      <div class="title__buttons">
        <component
          class="button title__button title__button--wide"
          :is="prevPost ? 'router-link' : 'span'"
          :disabled="!prevPost"
          :to="prevPost && { name: 'post', params: { postId: prevPost.id }, query: $route.query }"
        >
          <i class="material-icons">chevron_left</i>
          {{ $t('previous') }}
        </component>

        <component
          class="button title__button title__button--wide"
          :is="nextPost ? 'router-link' : 'span'"
          :disabled="!nextPost"
          :to="nextPost && { name: 'post', params: { postId: nextPost.id }, query: $route.query }"
        >
          {{ $t('next') }}
          <i class="material-icons">chevron_right</i>
        </component>

        <router-link
          class="button title__button"
          :to="context"
        >
          {{ $t('list') }}
        </router-link>
      </div>
    </div>
    <div class="metadata">
      <img :src="userPictureUrl" class="post-author-profile-picture"/>
      <div class="post-header">
        <router-link :to="{
          name: 'user', params: { username: postAuthorId }
        }" class="post-header__author">
          {{ postAuthor }}
        </router-link>

        <div class="post-header__time">
          {{ postCreatedAt }}
        </div>

        <div class="post-header__status">
          <LikeButton class="post-header__status-item" :item="post" votable @vote="$emit('vote', $event)"/>

          <div class="post-header__status-item">
            <span class="post-header__label">
              {{ $t('comments') }}
            </span>

            {{ post.nested_comments_count }}
          </div>

          <div class="post-header__status-item">
            <span class="post-header__label">
              {{ $t('views') }}
            </span>

            {{ post.hit_count }}
          </div>

          <span class="dropdown is-right is-hoverable">
            <div class="post-header__status-item dropdown-trigger">
              <button
                class="post-header__dropdown-button"
                aria-haspopup="true"
                aria-controls="dropdownMenu">

                <i class="material-icons">more_vert</i>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdownMenu" role="menu">
              <div class="dropdown-content">
                <div class="dropdown-item">
                  <a class="dropdown-item" @click="$emit('archive')">
                    {{ $t(post.my_scrap ? 'unarchive' : 'archive') }}
                  </a>

                  <template v-if="postUserId === userId">
                    <router-link class="dropdown-item"
                      :to="{
                        name: 'write',
                        params: {
                          postId: post.id
                        }
                      }">
                        {{ $t('edit') }}
                    </router-link>

                    <a @click="deletePost"
                      href="#"
                      class="dropdown-item">
                      {{ $t('delete') }}
                    </a>
                  </template>
                  <template v-else>
                    <a class="dropdown-item" @click="$emit('report')">
                      {{ $t('report') }}
                    </a>

                    <a class="dropdown-item" @click="$emit('block')">
                      <template v-if="isBlocked">
                        {{ $t('unblock') }}
                      </template>
                      <template v-else>
                        {{ $t('block') }}
                      </template>
                    </a>
                  </template>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
    <hr class="divider" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { deletePost as apiDeletePost } from '@/api'
import { date } from '@/helper.js'
import LikeButton from '@/components/LikeButton.vue'

export default {
  name: 'the-post-header',
  props: {
    post: { required: true },
    context: { type: Object },
    showHidden: { type: Boolean }
  },
  data () {
    return {
      attachments: null
    }
  },
  computed: {
    userPictureUrl () {
      return this.post.created_by && this.post.created_by.profile.picture
    },
    postAuthor () {
      return this.post.created_by && this.post.created_by.profile.nickname
    },
    postAuthorId () {
      return this.post.created_by && this.post.created_by.id
    },
    postCreatedAt () {
      return date(this.post.created_at)
    },
    postUserId () {
      return this.post.created_by && this.post.created_by.profile.user_id
    },
    nextPost () {
      return this.post.side_articles && this.post.side_articles.after
    },
    prevPost () {
      return this.post.side_articles && this.post.side_articles.before
    },
    boardSlug () {
      return this.post.parent_board && this.post.parent_board.slug
    },
    boardName () {
      return this.post.parent_board && this.post.parent_board[`${this.$i18n.locale}_name`]
    },
    title () {
      if (this.post.is_hidden) {
        if (this.showHidden) {
          return this.post.hidden_title
        }

        return this.post.why_hidden
          .slice(0, 1)
          .map(reason => reason.detail)
          .join(' ')
      }

      return this.post.title
    },
    isBlocked () {
      return this.post.created_by && this.post.created_by.is_blocked
    },
    ...mapGetters([ 'userId' ])
  },

  methods: {
    async deletePost () {
      const result = await this.$store.dispatch('dialog/confirm', this.$t('confirm-delete'))
      if (!result) return

      await apiDeletePost(this.post.id)
      this.$router.push('/')
    }
  },
  components: {
    LikeButton
  }
}
</script>

<i18n>
ko:
  archive: '담아두기'
  unarchive: '담기 취소'
  edit: '수정'
  delete: '삭제'
  report: '신고'
  comments: '댓글'
  views: '조회수'
  previous: '이전글'
  next: '다음글'
  list: '목록'
  block: '사용자 차단'
  unblock: '사용자 차단해제'
  confirm-delete: '정말로 삭제하시겠습니까?'

en:
  archive: 'Bookmark'
  unarchive: 'Delete Bookmark'
  edit: 'Edit'
  delete: 'Delete'
  report: 'Report'
  comments: 'Comments'
  views: 'View'
  previous: 'Previous'
  next: 'Next'
  list: 'Posts'
  block: 'Block User'
  unblock: 'Unblock User'
  confirm-delete: 'Are you really want to delete this post?'
</i18n>

<style lang="scss" scoped>
@import "@/theme.scss";

.title {
  color: var(--grey-700);
  font-family: var(--font);
  font-size: 1.35rem;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  flex: 1;

  &__title-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__topic {
    margin-right: 10px;
  }

  &__board {
    color: var(--theme-400);
    font-weight: 500;
    margin-bottom: 12px;
  }

  &__button {
    margin-left: 0.5rem;
    font-size: .9rem;
    font-weight: 400;

    &--wide {
      padding: 0 15px;
    }
  }

  @include breakPoint(min) {
    flex-direction: column;

    &__title {
      align-self: flex-start;
    }

    &__buttons {
      align-self: flex-end;
      margin-top: 20px;
    }
  }
}

.metadata {
  font-family: var(--font);
  color: var(--grey-700);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;

  .post-author-profile-picture {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 1rem;
  }

  .post-header {
    display: flex;
    flex-direction: column;
    flex: 1;

    &__author {
      font-size: 15px;
      font-weight: bold;
    }

    &__time {
      color: var(--grey-600);
      font-size: 13px;
      font-weight: normal;
      flex: 1;
    }

    &__status {
      display: inline-flex;
      align-self: flex-end;
      justify-content: flex-end;
      font-size: .95rem;
      margin-top: -30px;
    }

    &__status-item {
      font-size: 0.9rem;
      display: inline-flex;
      align-items: center;
      margin: 10px;
      white-space: nowrap;
    }

    &__label {
      margin-right: 5px;
      font-weight: 500;
    }

    &__dropdown-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 5px;
      background: transparent;
      width: 1.8rem;
      height: 1.8rem;
    }

    .dropdown:hover {
      .post-header__dropdown-button {
        background: var(--grey-300);
      }
    }
  }

  @include breakPoint(min) {
    .post-header__status {
      margin-top: 0;
      flex-wrap: wrap;
    }
  }
}

.divider {
  margin-top: 10px;
}

.material-icons {
  font-size: 16px;
}

.dropdown-content {
  min-width: 40%;
  float: right;
  text-align: right;
}

.dropdown-item {
  padding: 0.2rem 0.4rem
}
</style>
