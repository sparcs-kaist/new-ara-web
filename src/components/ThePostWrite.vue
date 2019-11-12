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
        @attach-files="attachFiles"
      />
    </div>

    <div class="attachment-input">
      <Attachments
        ref="attachments"
        multiple
        @add="addAttachments"
        @delete="deleteAttachment">
      </Attachments>
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
import Attachments from '@/components/TheAttachments'
import TextEditor from '@/components/TheTextEditor'

export default {
  name: 'the-post-write',
  props: [ 'post', 'saving', 'isTitleEmpty', 'isContentEmpty', 'isBoardEmpty' ],
  data () {
    return {
      boardId: '',
      title: '',
      content: '',
      loaded: true
    }
  },
  computed: {
    ...mapState([ 'boardList' ]),
    ...mapGetters([ 'getIdBySlug' ]),
    titlePlaceholder: function () {
      if (this.isTitleEmpty) {
        return '제목을 입력하세요'
      } else {
        return '제목'
      }
    },
    initialPostContent () {
      return this.post ? this.post.content : null
    }
  },
  created () {
    if (this.post) {
      this.boardId = this.post.parent_board.id
      this.title = this.post.title
      this.content = this.post.content
      this.loaded = false
    }
    const { board } = this.$route.query
    if (board) {
      /* 글 수정인데 글의 parent board와 url query의 board가 다르면 url query의 board를 따른다. */
      this.boardId = this.getIdBySlug(board)
    }
  },

  async mounted () {
    if (this.post) {
      await this.$refs.attachments.init(this.post.attachments)
    }

    this.loaded = true
  },

  methods: {
    attachFiles (files) {
      this.$refs.attachments.handleUpload(files)
    },

    addAttachments (attachments) {
      attachments.forEach(file => {
        if (file.type === 'image') {
          this.$refs.textEditor.addImageByFile(file)
        }
      })
    },

    deleteAttachment (file) {
      if (file.uploaded) {
        // TODO delete file from server
      }

      if (file.type === 'image') {
        this.$refs.textEditor.removeImageByFile(file)
      }
    },

    savePostByThePostWrite () {
      if (!this.loaded) {
        // TODO add error support
        alert("Please wait for a sec!")
        return
      }

      const { title, boardId } = this
      this.$emit('save-post',
        {
          title,
          boardId,
          attachments: this.$refs.attachments.files
        }
      )
    },

    updateAttachments (attachmentUpdate) {
      this.$refs.textEditor.applyImageUpload(attachmentUpdate)
    },

    getContent () {
      return this.$refs.textEditor.getContent()
    }
  },
  components: { Attachments, TextEditor }
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
