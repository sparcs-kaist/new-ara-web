<template>
  <TheLayout class="post" :key="postId">
    <template #aside>
      <TheSidebar />
    </template>

    <ThePostHeader :post="post" :context="context" @archive="archive" @report="report" @vote="vote" />
    <ThePostDetail :post="post" @archive="archive" @report="report" @vote="vote" />
    <ThePostComments
      :comments="post.comments"
      :postId="postId"
      @upload="addNewComment"
      @update="updateComment"
      @refresh="refresh"
    />
    <ThePostNavigation :post="post" :context="context" />
    <!-- @TODO: <TheBoard :board="board"/> -->
  </TheLayout>
</template>

<script>
import { archivePost, fetchPost, reportPost, unarchivePost, votePost } from '@/api'
import { fetchWithProgress } from './helper.js'
import ThePostComments from '@/components/ThePostComments.vue'
import ThePostDetail from '@/components/ThePostDetail.vue'
import ThePostHeader from '@/components/ThePostHeader.vue'
import ThePostNavigation from '@/components/ThePostNavigation.vue'
import TheBoard from '@/components/TheBoard.vue'
import TheLayout from '@/components/TheLayout.vue'
import TheSidebar from '@/components/TheSidebar.vue'

export default {
  name: 'post',
  props: {
    postId: { required: true }
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
        query['page'] = from_page
      }

      if (search_query) {
        query['query'] = search_query
      }

      switch (from_view) {
        case 'user':
          return { name: 'user', params: { created_by: this.$route.query.user }, query }

        case 'recent':
          query.board = 'recent'
          return { name: 'myinfo', query }

        case 'scrap':
          return { name: 'archive', query }

        case 'all':
          return { name: 'board', query }

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
  methods: {
    async addNewComment (comment) {
      if (comment.parent_comment) {
        /* Save the new recomment in local first. */
        /*
        const rootComment = this.post.comments.find(parent => parent.id === comment.parent_comment)
        rootComment.comments = [
          ...rootComment.comments,
          comment
        ]
        */
        /* Then fetch data from DB. */
        return this.refresh()
      }

      /* Save the new comment in local first. */
      /*
      this.post.comments = [
        ...this.post.comments,
        comment
      ]
      */

      /* Then fetch data from DB. */
      return this.refresh()
    },

    async updateComment (update) {
      if (update.parent_comment) {
        const rootComment = this.post.comments.find(comment => comment.id === update.parent_comment)
        const replyIndex = rootComment.comments.findIndex(replyComment => replyComment.id === update.id)
        if (replyIndex < 0) return

        this.$set(rootComment.comments, replyIndex, update)
        return
      }

      const commentIndex = this.post.comments.findIndex(comment => comment.id === update.id)
      if (commentIndex < 0) return

      this.$set(this.post.comments, commentIndex, update)
    },

    // @TODO: 매번 refresh 하는게 최선인지는 좀 생각해 봐야할듯
    async refresh () {
      this.post = await fetchPost({ postId: this.postId })
    },

    async vote ({ id, vote }) {
      await votePost(id, vote)
      await this.refresh()
    },

    async archive () {
      if (this.post.my_scrap) {
        await unarchivePost(this.post.my_scrap.id)
        this.post.my_scrap = null
        alert(this.$t('unarchived'))
      } else {
        const result = await archivePost(this.post.id)
        this.post.my_scrap = result
        alert(this.$t('archived'))
      }
      await this.$store.dispatch('fetchArchivedPosts')
    },

    async report () {
      await reportPost(this.post.id)
      alert(this.$t('reported'))
    }
  },

  async beforeRouteEnter ({ params: { postId }, query }, from, next) {
    const [ post ] = await fetchWithProgress([
      fetchPost({ postId, context: query })
    ])
    next(vm => { vm.post = post })
  },

  async beforeRouteUpdate ({ params: { postId }, query }, from, next) {
    const [ post ] = await fetchWithProgress([
      fetchPost({ postId, context: query })
    ])
    this.post = post
    next()
  },

  components: {
    TheBoard,
    TheLayout,
    ThePostComments,
    ThePostDetail,
    ThePostHeader,
    ThePostNavigation,
    TheSidebar
  }
}
</script>

<i18n>
ko:
  archived: '담아둔 게시글에 담아졌습니다!'
  unarchived: '담아둔 게시글에서 제거하였습니다!'
  reported: '신고되었습니다!'

en:
  archived: 'Successfully added to your archive!'
  unarchived: 'Successfully removed from your archive!'
  reported: 'Successfully reported!'
</i18n>
