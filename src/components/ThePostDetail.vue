<template>
  <div class="post">
    <h1 class="title" id="title">{{ post.title }}</h1>
    <div class="dropdown is-right is-hoverable alignright">
      <div class="dropdown-trigger">
        <button class="button no-border" aria-haspopup="true" aria-controls="dropdownMenu">
          <i class="fas fa-ellipsis-h"></i>
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
            <a v-if="postUserId === userId" href="#" class="dropdown-item">
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
    <div class="ql-container ql-snow">
      <div v-html="post.content" class="ql-editor"></div>
    </div>
    <div>
      <a class="button button-default"
      :class="{ 'button-selected': liked }">
        <span class="icon">
          <i class="fas fa-thumbs-up"></i>
        </span>
        <span>
          {{ postLikedCount }}
        </span>
      </a>
      <a class="button button-default"
        :class="{ 'button-selected': disliked }">
        <span class="icon">
          <i class="fas fa-thumbs-down"></i>
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
import { archivePost, reportPost } from '@/api'
import { date } from '@/helper.js'

export default {
  name: 'the-post-detail',
  props: {
    post: { required: true }
  },
  data () {
    return {
      isArchiving: false,
      isReporting: false
    }
  },
  computed: {
    boardName () {
      return this.post.parent_board && this.post.parent_board.ko_name
    },
    postAuthor () {
      return this.post.created_by.profile.nickname
    },
    postCreatedAt () {
      return date(this.post.created_at)
    },
    postUserId () {
      return this.post.created_by.profile.id
    },
    postLikedCount () {
      return this.post.positive_vote_count
    },
    postDislikedCount () {
      return this.post.negative_vote_count
    },
    ...mapGetters([ 'userId' ])
  },
  methods: {
    async archive () {
      this.isArchiving = true
      await archivePost(this.post.id)
      this.isArchiving = false
    },
    async report () {
      this.isReporting = true
      await reportPost(this.post.id)
      this.isReporting = false
    }
  }
}
</script>

<style lang="scss" scoped>
#title {
  margin-bottom: 0.25rem;
}

#metadata {
  color: #888;
  margin-bottom: 1rem;
  .post-author {
    color:#4a4a4a;
    font-weight:bold
  }
  .post-author, .post-time, .post-board-name {
    display: inline-block;
    margin-right: 0.75rem;
  }
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
