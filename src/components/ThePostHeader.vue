<template>
  <div class="post">
    <div class="title">
      <div class="title__title">
        {{ post.title }}
      </div>
      <!-- TODO range check and board check-->
      <router-link
        class="button title__button title__button--wide"
        :to="{ name: 'post', params: { postId: post.id - 1 } }"
      >
        <i class="material-icons">chevron_left</i>
        {{ $t('previous') }}
      </router-link>

      <router-link
        class="button title__button title__button--wide"
        :to="{ name: 'post', params: { postId: post.id + 1 } }"
      >
        {{ $t('next') }}
        <i class="material-icons">chevron_right</i>
      </router-link>

      <router-link
        class="button title__button"
        :to="{ name: 'board' }"
      >
        {{ $t('list') }}
      </router-link>
    </div>
    <div id="metadata">
      <img :src="userPictureUrl" class="post-author-profile-picture"/>
      <div class="post-header">
        <router-link :to="{
          name: 'user', params: { username: postAuthor }
        }" class="post-header__author">
          {{ postAuthor }}
        </router-link>

        <div class="post-header__info">
          <span class="post-header__time">
            {{ postCreatedAt }}
          </span>

          <div class="post-header__status">
            <LikeButton class="post-header__like" :item="post" votable @vote="$emit('vote', $event)"/>

            <div class="post-header__comment">
              <span class="post-header__label">
                {{ $t('comments') }}
              </span>

              {{ post.nested_comments_count }}
            </div>

            <div class="post-header__view">
              <span class="post-header__label">
                {{ $t('views') }}
              </span>

              {{ post.hit_count }}
            </div>
          </div>

          <span class="dropdown is-right is-hoverable">
            <div class="dropdown-trigger">
              <button class="button no-border" aria-haspopup="true" aria-controls="dropdownMenu">
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
                  <a v-else class="dropdown-item" @click="$emit('report')">
                    {{ $t('report') }}
                  </a>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { deletePost } from '@/api'
import { date } from '@/helper.js'
import LikeButton from '@/components/LikeButton.vue'

export default {
  name: 'the-post-header',
  props: {
    post: { required: true }
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
    postCreatedAt () {
      return date(this.post.created_at)
    },
    postUserId () {
      return this.post.created_by && this.post.created_by.profile.user_id
    },
    ...mapGetters([ 'userId' ])
  },

  methods: {
    async deletePost () {
      await deletePost(this.post.id)
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
</i18n>

<style lang="scss" scoped>
.title {
  color: var(--grey-700);
  font-family: 'NanumSquareRound',sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  flex: 1;

  &__title {
    flex: 1;
  }

  &__button {
    margin-left: 0.5rem;
    font-size: .9rem;

    &--wide {
      padding: 0 15px;
    }
  }
}

#metadata {
  font-family: 'NanumSquareRound',sans-serif;
  color: var(--grey-700);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  .post-author-profile-picture {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 1rem;
  }

  .post-header {
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

    &__info {
      display: flex;
      align-items: center;
    }

    &__status {
      display: flex;
      font-size: .95rem;

      & > * {
        margin: 0 10px;
      }
    }
  }
}

.material-icons {
  font-size: 16px;
}

.no-border {
  border: none;
  height: 13px;
  width: 13px;
  float: right;
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
