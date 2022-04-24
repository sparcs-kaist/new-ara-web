<template>
  <TheLayout :key="postId" class="post">
    <template #aside-right>
      <TheSidebar />
    </template>

    <ThePostHeader
      :post="post"
      :context="context"
      @archive="archive"
      @report="report"
      @vote="vote"
    />

    <ThePostDetail
      :post="post"
      @archive="archive"
      @block="block"
      @report="report"
      @vote="vote"
      @show-hidden="overrideHidden"
    />

    <ThePostComments
      :post="post"
      :comments="post.comments"
      @upload="addNewComment"
      @update="updateComment"
      @refresh="refresh"
      @fetch-comment="overrideHiddenComment"
    />
    <ThePostNavigation :post="post" :context="context" />
    <!-- @TODO: <TheBoard :board="board"/> -->
  </TheLayout>
</template>

<script>
import {
  archivePost,
  blockUser,
  fetchPost,
  reportPost,
  unarchivePost,
  unblockUser,
  votePost,
  fetchComment
} from '@/api'
import { fetchWithProgress } from '@/views/helper'
import ThePostComments from '@/components/ThePostComments.vue'
import ThePostDetail from '@/components/ThePostDetail.vue'
import ThePostHeader from '@/components/ThePostHeader.vue'
import ThePostNavigation from '@/components/ThePostNavigation.vue'
import TheLayout from '@/components/TheLayout.vue'
import TheSidebar from '@/components/TheSidebar.vue'

export default {
  name: 'Post',

  components: {
    TheLayout,
    ThePostComments,
    ThePostDetail,
    ThePostHeader,
    ThePostNavigation,
    TheSidebar
  },

  props: {
    postId: {
      type: [String, Number],
      required: true
    }
  },

  data () {
    return {
      post: {}
    }
  },
  computed: {
    /* eslint-disable camelcase */
    context () {
      const { from_view, from_page, search_query } = this.$route.query
      const query = {}
      if (from_page) {
        query.page = from_page
      }

      if (search_query) {
        query.query = search_query
      }

      if (from_view === 'topic') {
        query.topic = this.post.parent_topic?.slug
      }

      switch (from_view) {
        case 'user':
          return { name: 'user', params: { username: this.$route.query.created_by }, query }

        case 'recent':
          query.board = 'recent'
          return { name: 'my-info', query }

        case 'scrap':
          return { name: 'archive', query }

        case 'all':
          return { name: 'board', query }

        case '-portal':
          return { name: 'board', query: { ...query, portal: 'exclude' } }

        default:
          return {
            name: 'board',
            params: {
              boardSlug: this.post.parent_board ? this.post.parent_board.slug : null
            },
            query
          }
      }
    }
  },

  async beforeRouteEnter ({ params: { postId }, query }, from, next) {
    const [ post ] = await fetchWithProgress([
      fetchPost({ postId, context: query })
    ], 'post-failed-fetch')
    next(vm => {
      vm.post = post
      document.title = `Ara - ${post.is_hidden ? vm.$t('hidden-post') : post.title}`
    })
  },

  async beforeRouteUpdate ({ params: { postId }, query }, from, next) {
    const [ post ] = await fetchWithProgress([
      fetchPost({ postId, context: query })
    ], 'post-failed-fetch')
    document.title = `Ara - ${post.is_hidden ? this.$t('hidden-post') : post.title}`
    this.post = post
    next()
  },

  methods: {
    async addNewComment (comment) {
      comment.is_mine = true
      comment.created_by.profile.nickname = this.post.my_comment_profile.profile.nickname
      comment.created_by.profile.picture = this.post.my_comment_profile.profile.picture
      comment.created_by.id = this.post.my_comment_profile.id
      if (comment.parent_comment) {
        /* Save the new recomment in local first. */
        const rootComment = this.post.comments.find(parent => parent.id === comment.parent_comment)
        rootComment.comments = [
          ...rootComment.comments,
          comment
        ]
      } else {
        // Save the new comment in local first.
        this.post.comments = [
          ...this.post.comments,
          comment
        ]
      }
    },

    async updateComment (update) {
      if (update.parent_comment) {
        const rootComment = this.post.comments.find(comment => comment.id === update.parent_comment)
        const replyIndex = rootComment.comments.findIndex(replyComment => replyComment.id === update.id)
        if (replyIndex < 0) return

        update.created_by.profile = rootComment.comments[replyIndex].created_by.profile
        update.created_by.username = rootComment.comments[replyIndex].created_by.username
        update.created_by.id = rootComment.comments[replyIndex].created_by.id
        this.$set(rootComment.comments, replyIndex, update)
        return
      }

      const commentIndex = this.post.comments.findIndex(comment => comment.id === update.id)
      if (commentIndex < 0) return

      // Code for maintain anonymous / realname profile when user modifies his/her comment.
      update.created_by.profile = this.post.comments[commentIndex].created_by.profile
      update.created_by.username = this.post.comments[commentIndex].created_by.username
      update.created_by.id = this.post.comments[commentIndex].created_by.id
      // Apply
      this.$set(this.post.comments, commentIndex, update)
    },

    // @TODO: 매번 refresh 하는게 최선인지는 좀 생각해 봐야할듯
    async refresh () {
      this.post = await fetchPost({ postId: this.postId, context: this.$route.query })
    },

    async vote ({ id, vote }) {
      try {
        await votePost(id, vote)
      } catch (err) {
        this.$store.dispatch('dialog/toast', this.$t('nonvotable-myself'))
      }
      await this.refresh()
    },

    async archive () {
      if (this.post.my_scrap) {
        await unarchivePost(this.post.my_scrap.id)
        this.post.my_scrap = null
        this.$store.dispatch('dialog/toast', this.$t('unarchived'))
      } else {
        const result = await archivePost(this.post.id)
        this.post.my_scrap = result
        this.$store.dispatch('dialog/toast', this.$t('archived'))
      }
      await this.$store.dispatch('fetchArchivedPosts')
    },

    async report () {
      if (this.post.can_override_hidden === false) {
        this.$store.dispatch('dialog/toast', this.$t('report-unavailable'))
        return
      }
      const { result, selection } = await this.$store.dispatch('dialog/report', this.$t('confirm-report'))
      if (!result) return
      // What can be type_report? : violation_of_code, impersonation, insult, spam, others.
      // Where can I get typeReport?
      const typeReport = 'others'
      let reasonReport = ''
      for (const key in selection) {
        if (selection[key]) {
          reasonReport += key
          reasonReport += ', '
        }
      }
      reasonReport = reasonReport.slice(0, -2)
      try {
        await reportPost(this.post.id, typeReport, reasonReport)
        this.$store.dispatch('dialog/toast', this.$t('reported'))
      } catch (err) {
        this.$store.dispatch('dialog/toast', this.$t('already-reported'))
      }
    },

    async block () {
      try {
        if (!this.post.created_by.is_blocked) {
          const result = await this.$store.dispatch('dialog/confirm', this.$t('confirm-block'))
          if (!result) return
          await blockUser(this.post.created_by.id)
          this.post.created_by.is_blocked = true
          this.$store.dispatch('dialog/toast', this.$t('blocked'))
        } else {
          await unblockUser(this.post.created_by.id)
          this.post.created_by.is_blocked = false
          this.$store.dispatch('dialog/toast', this.$t('unblocked'))
        }
      } catch (e) {
        if (e.response.status === 403) {
          this.$store.dispatch('dialog/toast', this.$t('block-rate-limit'))
        }
      }
      await this.refresh()
    },

    async overrideHidden () {
      const overridenPost = await fetchPost({ postId: this.postId, context: { ...this.$route.query, override_hidden: true } })
      this.post = { ...overridenPost, comments: this.post.comments, side_articles: this.post.side_articles }
      document.title = `Ara - ${this.post.title}`
    },
    async overrideHiddenComment ({ commentId }) {
      const overriddenComment = await fetchComment({
        commentId,
        context: { ...this.$route.query, override_hidden: true }
      })

      for (const [commentIndex, comment] of this.post.comments.entries()) {
        if (comment.id === commentId) {
          const newComment = { ...comment, ...overriddenComment }
          return this.$set(this.post.comments, commentIndex, newComment)
        }
        for (const [replyCommentIndex, replyComment] of comment.comments.entries()) {
          if (replyComment.id === commentId) {
            const newComment = { ...replyComment, ...overriddenComment }
            return this.$set(this.post.comments[commentIndex].comments, replyCommentIndex, newComment)
          }
        }
      }
    }
  }
}
</script>

<i18n>
ko:
  archived: '담아둔 게시글에 담아졌습니다!'
  unarchived: '담아둔 게시글에서 제거하였습니다!'
  reported: '신고되었습니다!'
  blocked: '해당 유저가 차단되었습니다!'
  unblocked: '해당 유저가 차단해제되었습니다!'
  confirm-report: '게시물 신고 사유를 알려주세요.'
  confirm-block: '정말로 차단하시겠습니까?'
  nonvotable-myself: '본인 게시물에는 좋아요를 누를 수 없습니다!'
  already-reported: '이미 신고되었습니다.'
  hidden-post: '숨겨진 글'
  report-unavailable: '신고가 불가능한 글입니다!'
  block-rate-limit: '하루에 최대 10번만 차단/해제 할 수 있습니다.'

en:
  archived: 'Successfully added to your archive!'
  unarchived: 'Successfully removed from your archive!'
  reported: 'Successfully reported!'
  blocked: 'The user has been blocked!'
  unblocked: 'The user has been unblocked!'
  confirm-report: 'Let me know your reason for reporting the post.'
  confirm-block: 'Are you really want to block this user?'
  nonvotable-myself: 'You cannot vote for your post!'
  already-reported: "You've already reported this article."
  hidden-post: 'Hidden post'
  report-unavailable: 'You cannot report this post!'
  block-rate-limit: 'You could block/unblock at most 10 times a day.'
</i18n>
