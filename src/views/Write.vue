<template>
  <TheLayout>
    작성/수정
    <ThePostWrite
      v-if="postFetched"
      :post="post"
      :saving="saving"
      @save="save"
    />
  </TheLayout>
</template>

<script>
import store from '@/store'
import { progressHandler } from './helper'
import { fetchPost } from '@/api'
// createPost, updatePost
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
    save (newArticle) {
      this.saving = true
      // if (!this.isEditing) {
      //   // @TODO: boardId 하드코딩이라니........
      //   createPost({ boardId: 1, newArticle }).catch(e => {
      //     // @TODO: 에러 핸들링
      //     console.error(e)
      //   }).finally(() => {
      //     this.saving = false
      //   })
      // } else {
      //   updatePost({ postId: this.postId, newArticle }).then(() => {
      //     this.saving = false
      //   }).catch(e => {
      //     // @TODO: 에러 핸들링
      //     console.error(e)
      //     this.saving = false
      //   })
      // }
    }
  },
  beforeRouteEnter ({ params: { postId } }, from, next) {
    // 새로운 글을 작성하는 경우
    if (!postId) {
      next() // !주의: next는 한번만 호출돼야 함
    // 기존 글을 수정하는 경우
    } else {
      store.commit('fetch/startProgress')
      fetchPost({ postId }, progressHandler).then(post => {
        store.dispatch('fetch/endProgress')
        next(vm => { vm.post = post })
      }).catch(() => { next(false) })
    }
  },
  components: { TheLayout, ThePostWrite }
}
</script>

<style>

</style>
