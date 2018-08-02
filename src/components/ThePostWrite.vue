<template>
  <div>
    <h1> 포스트 작성 </h1>
    <div class="select">
      <select v-model="boardId">
        <option
          v-for="board in boardList"
          :key="board.id"
          :selected="boardId === board.id"
          :value="board.id">
          {{ board.en_name }}
        </option>
      </select>
    </div>
    제목
    <input
      v-model="title"
      class="input"
      type="text"
    />
    내용
    <VueEditor
      v-model="content"
    />
    <button
      @click="$emit('save-post', { title, content, boardId })"
      class="button is-primary"
      :class="{ 'is-loading': saving }"
    > 저장 </button>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'the-post-write',
  props: [ 'post', 'saving' ],
  data () {
    return {
      boardId: '',
      title: '',
      content: ''
    }
  },
  computed: {
    ...mapState([ 'boardList' ]),
    ...mapGetters([ 'getIdBySlug' ])
  },
  created () {
    if (this.post) {
      this.boardId = this.post.parent_board.id
      this.title = this.post.title
      this.content = this.post.content
    }
    const { board_slug: boardSlug } = this.$route.query
    if (boardSlug) {
      /* 글 수정인데 글의 parent board와 url query의 board가 다르면 url query의 board를 따른다. */
      this.boardId = this.getIdBySlug(boardSlug)
    }
  },
  components: { VueEditor }
}
</script>

<style>

</style>
