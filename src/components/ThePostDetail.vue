<template>
  <div class="post">
    <div class="title" id="title">{{ post.title }}</div>
    <div class="dropdown is-right is-hoverable alignright">
      <div class="dropdown-trigger">
        <button class="button no-border" aria-haspopup="true" aria-controls="dropdownMenu">
          <i class="material-icons">more_vert</i>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdownMenu" role="menu">
        <div class="dropdown-content">
          <div class="dropdown-item">
            <a class="dropdown-item" @click="archive"
              :class="{ 'is-loading': isArchiving }">
              담아두기
            </a>
            <router-link v-if="postUserId === userId" class="dropdown-item"
              :to="{
                name: 'write',
                params: {
                  postId: post.id
                }
              }">
              수정
            </router-link>
            <a v-if="postUserId === userId"
              @click="deletePost"
              href="#"
              class="dropdown-item">
              삭제
            </a>
            <a v-else class="dropdown-item"
              @click="report"
              :class="{ 'is-loading': isReporting }">
              신고
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="metadata">
      <img :src="userPictureUrl" class="post-author-profile-picture"/>
      <div class="post-author">
        {{ postAuthor }}
      </div>
      <div class="post-time">
        {{ postCreatedAt }}
      </div>
      <div class="post-board-name">
        {{ boardName }}
      </div>
    </div>
    <div class="content">
      <TextEditor :editable="editable" :content="post.content"/>
    </div>
    <div v-if="pictureUrls && pictureUrls.length !== 0">
      <img
        v-for="url in pictureUrls"
        :src="url"
        :key="url"
      />
    </div>
    <div>
      <a class="button button-default" @click="vote(true)"
      :class="{ 'button-selected': liked }">
        <span class="icon">
          <i class="material-icons">thumb_up</i>
        </span>
        <span>
          {{ postLikedCount }}
        </span>
      </a>
      <a class="button button-default" @click="vote(false)"
        :class="{ 'button-selected': disliked }">
        <span class="icon">
          <i class="material-icons">thumb_down</i>
        </span>
        <span>
          {{ postDislikedCount }}
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { archivePost, reportPost, votePost, deletePost, getAttachmentUrls } from '@/api'
import { date } from '@/helper.js'
import { fetchUser } from '@/api'
import TextEditor from '../components/TheTextEditor'

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
      pictureUrls: null,
    }
  },
  computed: {
    liked() { return this.post.my_vote === true },
    disliked() { return this.post.my_vote === false },
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
  updated() {
    if (this.post.attachments && this.post.attachments.length !== 0 && this.pictureUrls === null) {
      getAttachmentUrls(this.post.attachments)
        .then(results => {
          this.pictureUrls = results.map(( result ) => {
            return result.data.file
          })
        })
    }
  },
  methods: {
    async vote(ballot) {
      this.isVoting = true
      await votePost(this.post.id,
      this.post.my_vote == ballot ? 'vote_cancel' : ballot ? 'vote_positive' : 'vote_negative')
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
    async deletePost() {
      await deletePost(this.post.id)
      this.$router.push('/')
    }
  },
  components: {
    TextEditor,
  }
}
</script>

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
  margin: 30px 0px 20px -7px;
}

.text-contents-view {
  font-size: 1rem;
  margin: 10px 0px 10px 0px;
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
</style>
