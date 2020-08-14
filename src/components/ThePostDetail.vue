<template>
  <div class="post">
    <hr />

    <div class="attachments" v-if="attachments.length > 0">
      <div class="dropdown is-hoverable is-right">
        <div class="dropdown-trigger">
          <a class="attachments__title" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>
              {{ $t('attachments') }} {{ attachments.length }}
            </span>
          </a>
        </div>
        <div class="dropdown-menu">
          <div class="dropdown-content" style="padding: 10px; max-width: 100%; text-align: left;">
            <div class="attachments__item dropdown-item"
              v-for="{id, file, url} in attachments"
              :key="id"
            >
              <div>
                <a :href="url">{{ file }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <TextEditor :editable="editable" :content="post.content"/>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between;">
      <LikeButton class="post-status__like" :item="post" votable />
      <div style="display: flex; align-items: center;">
        <button class="button" style="margin-right: 10px;">담아두기</button>
        <button class="button" style="margin-right: 20px;">신고하기</button>
        <a style="display: flex; align-items: center;">
          <img :src="userPictureUrl" class="post-author-profile-picture" style="width: 30px; height: 30px; border-radius: 15px; margin-right: 10px;"/>
          <span>{{ postAuthor }} 님의 게시글 더보기</span>
          <i class="material-icons" style="font-size: 1.5em;">chevron_right</i>
        </a>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { archivePost, reportPost, votePost, deletePost, getAttachmentUrls } from '@/api'
import { date } from '@/helper.js'
import LikeButton from '@/components/LikeButton'
import TextEditor from '@/components/TheTextEditor'

export default {
  name: 'the-post-detail',
  props: {
    post: { required: true }
  },
  data () {
    return {
      isArchiving: false,
      isReporting: false,
      editable: false,
      isVoting: false,
      attachments: null
    }
  },
  computed: {
    liked () { return this.post.my_vote === true },
    disliked () { return this.post.my_vote === false },
    likedCount () { return this.post.positive_vote_count },
    dislikedCount () { return this.post.negative_vote_count },
    userPictureUrl () {
      return this.post.created_by.profile.picture
    },
    // @TODO: I18n
    boardName () {
      return this.post.parent_board && this.post.parent_board.ko_name
    },
    postAuthor () {
      return this.post.created_by && this.post.created_by.profile.nickname
    },
    postCreatedAt () {
      return date(this.post.created_at)
    },
    postUserId () {
      return this.post.created_by.profile.user_id
    },
    postLikedCount () {
      return this.post.positive_vote_count
    },
    postDislikedCount () {
      return this.post.negative_vote_count
    },
    ...mapGetters([ 'userId' ])
  },
  watch: {
    'post.attachments': {
      async handler (attachments) {
        const results = await getAttachmentUrls(attachments)
        this.attachments = results.map(({ data }) => ({
          url: data.file,
          file: decodeURIComponent(new URL(data.file).pathname.split('/').pop()),
          id: data.id
        }))
      },
      immediate: true
    }
  },
  methods: {
    async vote (ballot) {
      this.isVoting = true
      await votePost(this.post.id,
        this.post.my_vote === ballot ? 'vote_cancel' : ballot ? 'vote_positive' : 'vote_negative')
      this.$emit('vote')
      this.isVoting = false
    },
    async archive () {
      this.isArchiving = true
      await archivePost(this.post.id)
      this.isArchiving = false
    },
    async report () {
      this.isReporting = true
      await reportPost(this.post.id)
      this.isReporting = false
    },
    async deletePost () {
      await deletePost(this.post.id)
      this.$router.push('/')
    }
  },
  components: {
    LikeButton,
    TextEditor
  }
}
</script>

<i18n>
ko:
  archive: '담아두기'
  edit: '수정'
  delete: '삭제'
  report: '신고'
  attachments: '첨부파일 모아보기'
en:
  archive: 'Archive'
  edit: 'Edit'
  delete: 'Delete'
  report: 'Report'
  attachments: 'Attachments'
</i18n>

<style lang="scss" scoped>
#title {
  margin-bottom: 0.25rem;
}

#metadata {
  color: #888;
  margin: 1rem 0px 0.5rem 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .post-author-profile-picture {
    width: 25px;
    height: 25px;
    object-fit: cover;
    border-radius: 100%;

  }

  .post-author {
    color:#4a4a4a;
    font-weight:bold;

  }
  .post-author-profile-picture, .post-author, .post-time, .post-board-name {
    margin-right: 0.75rem;
  }
}

.content {
  margin: 30px 0px 20px -5px;
}

.text-contents-view {
  font-size: 1rem;
  margin: 10px 0px 10px 0px;
}

.post-status__like {
  margin-left: -6px;
}

.material-icons {
  font-size: 16px;
}

.alignright {
  float: right;
}

.no-border {
  border: none;
}

.dropdown-content {
  min-width: 40%;
  max-width: 50%;
  float: right;
  text-align: right;
}

.dropdown-item {
  padding: 0.375rem 0.4rem
}

.button-default {
  color: #888888;
  // border: none;
  font-size: 14px;
  margin-right: 5px;
  text-decoration: none;
}

.button-default:focus {
  outline:0;
}

.button-selected {
  color: #ED3A3A;
}

.attachments {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 30px;

  &__title {
    font-size: 1rem;
    font-weight: 600;
  }

  &__item {
    display: flex;
    flex-direction: row;
  }
}
</style>
