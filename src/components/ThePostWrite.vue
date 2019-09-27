<template>
  <div>
    <h1 id="title"> 글쓰기 </h1>

    <div class="title-wrapper">
      <i 
        class="material-icons title-warning"
        v-if="isTitleEmpty && !title">
        warning
      </i>
      <input
        v-model="title"
        class="input title-input"
        :class="{ 'is-empty': isTitleEmpty }"
        type="text"
        :placeholder="titlePlaceholder"
      />
    </div>

    <div class="select board-input"
      :class="{
        'is-placeholder': !boardId,
      }" >
      <i 
        class="material-icons board-warning"
        v-if="isBoardEmpty && !boardId">
        warning
      </i>
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
    <p class="help is-danger" v-if="isBoardEmpty && !boardId">게시판을 선택해주세요</p>

    <div class="content-wrapper">
      <TextEditor
        ref="textEditor"
        editable="true"
        :content="initialPostContent"
      />
    </div>

    <div class="attachment-input">
      <input
        type="file"
        multiple
        @change="attachFiles"
      />
    </div>
    <button
      @click="savePostByThePostWrite"
      class="button post-publish-button"
      :class="{ 'is-loading': saving }"
    >
      게시
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TextEditor from '../components/TheTextEditor'

export default {
  name: 'the-post-write',
  props: [ 'post', 'saving', 'isTitleEmpty', 'isContentEmpty', 'isBoardEmpty' ],
  data () {
    return {
      boardId: '',
      title: '',
      content: '',
      attachment: null,
    }
  },
  computed: {
    ...mapState([ 'boardList' ]),
    ...mapGetters([ 'getIdBySlug' ]),
    titlePlaceholder: function() {
      if (this.isTitleEmpty) {
        return '제목을 입력하세요'
      } else {
        return '제목'
      }
    },
    initialPostContent() {
      return this.post ? this.post.content : null
    }
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
    },
    savePostByThePostWrite() {
      const { title, boradId, attachments } = this;
      const postContent = JSON.stringify(this.$refs.textEditor.getContent())
      this.$emit('save-post', 
        {
          title: this.title, 
          content: postContent,
          boardId: this.boardId,
          attachments: this.attachments,
        }
      )
    }
  },
  components: { TextEditor }
}
</script>

<style lang="scss" scoped>
@import '@/theme.scss';
#title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.title-wrapper {
  position: relative;
}

.title-wrapper .material-icons.title-warning {
  position: absolute;
  left: -32px;
  top: 20.8px;
  font-size: 20px;
  color: red;
}

.title-input {
  padding-left: 0;
  padding-bottom: 0;
  font-size: 1.5rem;
  font-weight: 700;
  &.input::placeholder {
    color: #ccc;
  }
  &.is-empty::placeholder {
    color: $theme-red;
  }
}

.board-input {
  margin-top: -5px;
  margin-bottom: 1.5rem;
  position: relative;
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
  .material-icons.board-warning {
    position: absolute;
    left: -32px;
    top: 8px;
    font-size: 20px;
    color: red;
  }
}

.content-wrapper {
  position: relative;
  .material-icons.content-warning {
    position: absolute;
    left: -32px;
    top: 47px;
    font-size: 20px;
    color: red;
  }
}

p.help.is-danger {
  display: inline-block;
}

.attachment-input {
  margin-bottom: 1.5rem;
}
</style>