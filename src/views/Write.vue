<template>
  <TheLayout>
    작성/수정
    <ThePostWrite
      v-if="postFetched"
      :post="post"
      :saving="saving"
      @save-post="savePost"
    />
  </TheLayout>
</template>

<script>
import { fetchPost } from '@/api'
// createPost, updatePost
import { fetchWithProgress } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'
import ThePostWrite from '@/components/ThePostWrite.vue'

export default {
  name: 'write',
  props: [ 'postId' ],
  data () {
    return {
      post: null,
      saving: false
    }
  },
  computed: {
    isEditing () {
      return !!this.postId
    },
    postFetched () {
      return !this.isEditing || // 새로운 글을 작성하는 경우 바로 보여줌
        (this.isEditing && this.post) // 기존 글을 수정하는 경우 데이터 페치를 기다림
    }
  },
  methods: {
    async savePost (newArticle) {
      // this.saving = true
      // try {
      //   if (!this.isEditing) {
      //     // @TODO: boardId 하드코딩이라니........
      //     await createPost({ boardId: 1, newArticle })
      //   } else {
      //     await updatePost({ postId: this.postId, newArticle })
      //   }
      // } catch (err) {
      //   // @TODO: 에러 핸들링
      //   console.error(e)
      // }
      // this.saving = false
    }
  },
  async beforeRouteEnter ({ params: { postId } }, from, next) {
    // 새로운 글을 작성하는 경우
    if (!postId) {
      next() // !주의: next는 한번만 호출돼야 함
    // 기존 글을 수정하는 경우
    } else {
      const [ post ] = await fetchWithProgress([ fetchPost({ postId }) ])
      next(vm => { vm.post = post })
    }
  },
  components: { TheLayout, ThePostWrite }
}
</script>

<style>

</style>
