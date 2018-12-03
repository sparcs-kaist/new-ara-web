<template>
  <div>
    <h1 id="title"> 글쓰기 </h1>

    <input
      v-model="title"
      class="input title-input"
      type="text"
      placeholder="제목"
    />

    <div class="select board-input" :class="{ 'is-placeholder': !boardId }">
      <select v-model="boardId">
        <option value="" disabled selected> 게시판 </option>
        <option
          v-for="board in boardList"
          :key="board.id"
          :selected="boardId === board.id"
          :value="board.id">
          {{ board.en_name }}
        </option>
      </select>
    </div>
    <!-- @TODO toolbar option!! -->
    <VueEditor
      v-model="content"
      :editorOptions="{ theme: 'bubble' }"
      class="content-input"
      placeholder="내용"
    />

    <div class="attachment-input">
      <input
        type="file"
        multiple
        @change="attachFiles"
      />
    </div>
    <button
      @click="$emit('save-post', { title, content, boardId, attachments })"
      class="button post-publish-button"
      :class="{ 'is-loading': saving }"
    > 게시 </button>
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
      content: '',
      attachments: []
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
  methods: {
    attachFiles (e) {
      this.attachments = [...e.target.files]
      e.target.value = null /* 같은 파일을 연속으로 첨부하려면 필요한 코드 */
    }
  },
  components: { VueEditor }
}
</script>

<style lang="scss" scoped>
@import '@/theme.scss';
#title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.title-input {
  padding-left: 0;
  padding-bottom: 0;
  font-size: 1.5rem;
  font-weight: 700;
  &::placeholder {
    color: #888;
  }
}

.board-input {
  margin-top: -5px;
  margin-bottom: 1.5rem;
  &.is-placeholder {
    select {
      color: #888;
    }
    &::after {
      border-color: #888;
    }
    &:hover::after {
      border-color: #888;
    }
  }
  select {
    padding-left: 0;
  }
}

.attachment-input {
  margin-bottom: 1.5rem;
}

.post-publish-button {
  border: 0;
  padding: 0;
  color: $theme-red;
  &:hover {
    text-decoration: underline;
  }
}
</style>

<style lang="scss">
@import url('https://cdn.quilljs.com/1.3.6/quill.bubble.css');

#quill-container {
  .ql-editor {
    padding: 0;
    &::before {
      left: 0;
      font-style: normal;
      color: #888;
    }
  }
}
</style>
