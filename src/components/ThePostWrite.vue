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
import { mapState } from 'vuex'

export default {
  name: 'the-post-write',
  props: [ 'post', 'saving' ],
  data () {
    return {
      boardId: this.post ? this.post.id : '',
      title: '',
      content: ''
    }
  },
  computed: {
    ...mapState([ 'boardList' ])
  },
  created () {
    if (this.post) {
      this.title = this.post.title
      this.content = this.post.content
    }
  },
  components: { VueEditor }
}
</script>

<style>

</style>
