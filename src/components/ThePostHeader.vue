<template>
  <div class="post">
    <div class="title">
      <a class="title__board">
        <i class="material-icons title__board--icon">arrow_back_ios</i>
        <span class="title__board--name" @click="hasHistory() ? $router.back() : $router.push(beforeBoard)">
          {{ beforeBoardName }}
        </span>
        <span v-if="beforeBoardName === '전체보기' || beforeBoardName === 'All'" class="title__info">
          <router-link :to="{name: 'board', params: { boardSlug: post.parent_board['slug'] }} " class="title__info">
            | {{ post.parent_board[`${$i18n.locale}_name`] }}
          </router-link>
        </span>
      </a>
      <hr class="title__divider">
      <span class="title__text">
        <span v-if="post.parent_topic" class="title__topic">
          [{{ post.parent_topic[`${$i18n.locale}_name`] }}]
        </span>
        {{ title }}
        <span class="title__comments">
          ({{ post.comment_count }})
        </span>
      </span>
      <span class="title__detail">
        <span class="title__date">
          작성일 · {{ postCreatedAt }}
        </span>
        <span class="title__hit">
          조회수 · {{ post.hit_count }}
        </span>
        <span class="board-item__author status">
          <span
            v-if="isCommunicationPost"
            :class="{
              'polling': status === 0,
              'preparing': status === 1,
              'answered': status === 2
            }"
            class="status--button"
          >
            {{ statusText }}
          </span>
          <span v-if="dday && isCommunicationAdmin" class="d-day">
            {{ dday }}
          </span>
        </span>
      </span>
    </div>
    <div class="metadata">
      <router-link
        :is="isRegular ? 'router-link' : 'span'"
        :to="{
          name: 'user',
          params: { username: postAuthorId }
        }"
        class="author"
      >
        <img :src="userPictureUrl" class="author__picture">
        <span class="author__nickname">{{ postAuthor }}</span>
        <i v-if="isRegular" class="author__icon material-icons">chevron_right</i>
      </router-link>
      <LikeButton
        v-if="!post.is_hidden"
        :item="post"
        class="metadata__like"
        votable
        :is-mine="post.is_mine"
        @vote="$emit('vote', $event)"
      />
    </div>
    <hr class="divider">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { date } from '@/helper'
import LikeButton from '@/components/LikeButton.vue'
import i18n from '@/i18n'

export default {
  name: 'ThePostHeader',

  components: {
    LikeButton
  },

  props: {
    post: {
      type: Object,
      required: true
    },
    context: Object
  },

  data () {
    return {
      attachments: null
    }
  },

  computed: {
    ...mapGetters(['isCommunicationAdmin', 'userPicture']),
    dday () {
      if (this.status === 1) {
        if (this.post.days_left === 0) {
          return 'D-Day'
        } else if (this.post.days_left > 0) {
          return `D-${this.post.days_left}`
        } else {
          return '기간 경과'
        }
      }
      return undefined
    },
    status () {
      return this.post.communication_article_status ?? 0
    },
    isCommunicationPost () {
      if (this.post.parent_board?.id === 14) {
        return true
      } else {
        return false
      }
    },
    statusText () {
      const t = ['polling', 'preparing', 'answered'][this.status]
      return this.$t(`status.${t}`).toString()
    },
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
    boardSlug () {
      return this.post.parent_board && this.post.parent_board.slug
    },
    boardName () {
      return this.post.parent_board && this.post.parent_board[`${this.$i18n.locale}_name`]
    },
    title () {
      if (this.post.is_hidden) return i18n.t(this.post.why_hidden[0])

      return this.post.title
    },
    isRegular () {
      return this.post.name_type === 0
    },
    beforeBoard () {
      const { from_view: fromView, topic_id: topicId, current } = this.$route.query
      const name = 'board'
      const params = { boardSlug: this.boardSlug }
      const query = { page: current }
      if (fromView === 'board') {
        return { name, params, query }
      }
      if (fromView === 'topic') {
        return { name, params, query: { ...query, topic: topicId } }
      }
      if (fromView === 'scrap') {
        return { name: 'archive', query }
      }
      if (fromView === '-portal') {
        return { name, query: { ...query, portal: 'exclude' } }
      }
      return { name, query }
    },
    beforeBoardName () {
      const fromView = this.$route.query.from_view
      if (fromView === 'board' || fromView === 'topic') {
        return this.boardName
      }
      if (fromView === 'scrap') {
        return this.$t('archive')
      }
      if (this.hasHistory()) {
        if (fromView === 'all') {
          return this.$t('all')
        }
        return this.$t('prev-page')
      }
      return this.$t('all')
    },
    ...mapGetters([ 'userId' ])
  },
  methods: {
    hasHistory () {
      // The reason why this is 3 is that Vue basically uses 2.
      // If referrer is outside of newara, then it doesn't have history.
      return window.history.length > 3 ||
       (document.referrer &&
       (document.referrer.includes('sparcs.org') || document.referrer.includes('localhost')))
    }
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
  all: '전체보기'
  prev-page: '이전 페이지'
  status:
    polling: '달성전'
    preparing: '답변 준비중'
    answered: '답변 완료'

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
  all: 'All'
  prev-page: 'Previous Page'
  status:
    polling: 'Polling'
    preparing: 'Preparing'
    answered: 'Answered'
</i18n>

<style lang="scss" scoped>
@import "@/theme.scss";

.status {
  .d-day {
    color: black;
    margin-right: 17px;
    margin-left: 10px;
  }
  color: var(--theme-400);
  div {
    padding: 2px 5px;
    border-radius: 5px;
    width: 5rem;
    text-align: center;
  }
  .polling {
    color:var(--grey-600);
    border: var(--grey-600) solid 1px;
    background-color: white;
    padding: 1px 3.5px 1px 3.5px;
  }
  .preparing {
    color:var(--theme-400);
    border:var(--theme-400) solid 1px;
    background-color: white;
    padding: 1px 3.5px 1px 3.5px;
  }
  .answered {
    color: white;
    background-color: var(--theme-400);
    padding: 1px 3.5px 1px 3.5px;
  }
  &--button{
    border-radius: 4px;
    font-size: 12px;
  }
}
.board-item {
    &__author {
    // display: flex;
    // justify-content: flex-end;
    align-items: center;
    margin-left: 5px;
    margin-right: 10px;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 500;

    &__mobile{
      white-space: nowrap;
      font-size: 11px;
      font-weight: 500;
      color: unset;
      margin-left: auto;
    }
  }

}

.title {
  color: var(--grey-700);
  font-family: var(--font);
  font-size: 1.35rem;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  font-weight: 500;

  &__board {
    color: var(--theme-400);
    display: flex;
    align-items: center;

    &--icon {
      margin-right: -5px;
      font-size: 1.35rem !important;
      height: 18px;
      width: 1.35rem;
    }

    &--name {
      font-size: 18px;
      line-height: 18px;
    }
  }

  &__info {
    color: #A9A9A9;
    font-size: 18px;
    padding-left:2px;
  }

  &__text {
    font-size: 18px;
  }

  &__divider {
    height: 1px;
    background-color: black;
    margin: 10px 0;
    width: 100%;
  }

  &__topic {
    color: var(--theme-400)
  }

  &__comments {
    color: var(--theme-400);
    margin-left: 5px;
  }

  &__detail {
    font-size: .9rem;
    margin-top: 12px;
    font-weight: 400;
  }

  &__date {
    margin-right: 9px;
  }
}

.metadata {
  font-family: var(--font);
  color: var(--grey-700);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 0.9rem;

  .author {
    display: flex;
    align-items: center;

    &__picture {
      width: 24px;
      height: 24px;
      font-size: 24px;
      object-fit: cover;
      border-radius: 100%;
      margin-right: 0.5rem;
    }

    &__nickname {
      line-height: 24px;
      font-weight: 500;
    }

    &__icon {
      height: 24px;
      width: 24px;
      font-size: 24px;
    }
  }

  &__like {
    height: 24px;
    font-size: 15px;
  }
}

.divider {
  margin-top: 10px;
  height: 1px;
  background-color: #f0f0f0;
}
</style>
