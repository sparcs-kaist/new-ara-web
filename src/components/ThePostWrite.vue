<template>
  <div class="write">
    <h1 class="write__title"> {{ writeTitle }} </h1>
    <hr />

    <div class="write__row">
      <i class="material-icons write__warning"
        v-if="isCategoryWarning || isBoardWarning">

        warning
      </i>

      <div class="write__input">
        <div class="select" :class="{ 'is-placeholder': !boardId }" >
          <select v-model="boardId" :disabled="editMode">
            <option value="" disabled selected> {{ $t('input-board') }} </option>
            <option
              v-for="board in boardList"
              :key="board.id"
              :selected="boardId === board.id"
              :value="board.id">
              {{ board[`${$i18n.locale}_name`] }}
            </option>
          </select>
        </div>
        <p
          class="write__help help is-danger"
          v-if="isBoardWarning">

          {{ $t('input-board-warning') }}
        </p>
      </div>

      <div class="write__input">
        <div class="select" :class="{ 'is-placeholder': categoryNotSet }">
          <select v-model="categoryId" :disabled="editMode">
            <option value="$not-set" disabled selected> {{ $t('input-category') }} </option>
            <option value="" v-if="boardId"> {{ $t('no-category') }} </option>

            <template v-if="categoryList.length">
              <option
                v-for="category in categoryList"
                :key="category.id"
                :selected="categoryId === category.id"
                :value="category.id">
                {{ category[`${$i18n.locale}_name`] }}
              </option>
            </template>
          </select>
        </div>

        <p
          class="write__help help is-danger"
          v-if="isCategoryWarning">

          {{ $t('input-category-warning') }}
        </p>
      </div>

      <div class="write__input write__content-checkbox">
        <label class="checkbox">
          {{ $t('is-sexual') }}
          <input type="checkbox" v-model="isSexual">
        </label>

        <label class="checkbox">
          {{ $t('is-social') }}
          <input type="checkbox" v-model="isSocial">
        </label>
      </div>
    </div>

    <div class="write__row">
      <i
        class="material-icons write__warning"
        v-if="isTitleWarning">
        warning
      </i>

      <div class="write__input write__title-input">
        <input
          v-model="title"
          type="text"
          class="input"
          :class="{ 'is-empty': isTitleWarning }"
          :placeholder="$t('input-title')"
        />
      </div>
    </div>

    <div class="write__content">
      <TextEditor
        ref="textEditor"
        :content="initialPostContent"
        @attach-files="attachFiles"
        @open-image-upload="openImageUpload"
        editable
      />

      <i
        class="material-icons write__warning"
        v-if="emptyWarnings.includes('content')">
        warning
      </i>
    </div>

    <div class="write__attachment">
      <Attachments
        ref="attachments"
        multiple
        @add="addAttachments"
        @delete="deleteAttachment">
      </Attachments>
    </div>

    <div class="write__footer">
      <button
        @click="savePostByThePostWrite"
        class="button write__publish"
        :class="{ 'is-loading': saving }"
      >
        {{ post ? $t('write-edit') : $t('write-publish') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Attachments from '@/components/TheAttachments'
import TextEditor from '@/components/TheTextEditor'

export default {
  name: 'the-post-write',

  props: {
    post: {},
    saving: {
      type: Boolean
    },
    emptyWarnings: {
      type: Array
    }
  },

  data () {
    return {
      boardId: '',
      categoryId: '$not-set',
      title: '',
      isSexual: false,
      isSocial: false,
      loaded: true
    }
  },

  computed: {
    ...mapState({ boardListAll: 'boardList' }),
    ...mapGetters([ 'getIdBySlug' ]),

    initialPostContent () {
      if (!this.post) return null
      if (this.post.is_hidden) return this.post.hidden_content

      return this.post.content
    },

    boardList () {
      return this.boardListAll.filter(v => !v.is_readonly)
    },

    board () {
      return this.boardListAll.find(v => v.id === this.boardId)
    },

    categoryList () {
      if (!this.board) {
        return []
      }

      return this.board.topics
    },

    categoryNotSet () {
      return this.categoryId === '$not-set'
    },

    isCategoryWarning () {
      return this.categoryNotSet && this.emptyWarnings.includes('category')
    },

    isBoardWarning () {
      return !this.boardId && this.emptyWarnings.includes('board')
    },

    isTitleWarning () {
      return !this.title && this.emptyWarnings.includes('title')
    },

    editMode () {
      return !!this.post
    },

    writeTitle () {
      if (this.editMode) return this.$t('write-edit')
      return this.$t('write')
    }
  },

  created () {
    if (this.post) {
      this.boardId = this.post.parent_board.id
      this.title = this.post.title
      this.isSocial = this.post.is_content_social
      this.isSexual = this.post.is_content_sexual
      this.loaded = false

      this.$nextTick(() => {
        this.categoryId = this.post.parent_topic ? this.post.parent_topic.id : ''
      })
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
        this.$store.dispatch('dialog/toast', {
          text: this.$t('uploading'),
          type: 'info'
        })
        return
      }

      const { title, boardId, categoryId, isSocial, isSexual } = this
      this.$emit('save-post',
        {
          title,
          boardId,
          categoryId,
          isSocial,
          isSexual,
          attachments: this.$refs.attachments.files
        }
      )
    },

    openImageUpload () {
      this.$refs.attachments.openImageUpload()
    },

    updateAttachments (attachmentUpdate) {
      this.$refs.textEditor.applyImageUpload(attachmentUpdate)
    },

    getContent () {
      return this.$refs.textEditor.getContent()
    }
  },

  watch: {
    boardId () {
      this.categoryId = '$not-set'
    }
  },

  components: { Attachments, TextEditor }
}
</script>

<i18n>
ko:
  write: '게시물 작성하기'
  input-title: '제목을 입력하세요'
  input-board: '게시판을 선택하세요'
  input-board-warning: '게시판을 선택해주세요'
  input-category: '말머리를 선택하세요'
  input-category-warning: '말머리를 선택해주세요'
  write-publish: '게시글 등록하기'
  write-edit: '게시글 수정하기'
  no-category: '말머리 없음'
  uploading: '현재 업로딩 중입니다.'
  is-sexual: '성인글'
  is-social: '정치글'

en:
  write: 'Write a post'
  input-title: 'Type title here'
  input-board: 'Select Board'
  input-board-warning: 'You should select a board'
  input-category: 'Select Category'
  input-category-warning: 'You should select a category'
  no-category: 'No Category'
  write-publish: 'Publish Post'
  write-edit: 'Edit a post'
  uploading: 'It is currently uploading post. Please wait for a second.'
  is-sexual: 'Adult Post'
  is-social: 'Politics Post'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';

.write {
  &__title {
    color: var(--theme-400);
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }

  &__row {
    position: relative;
    margin: 0 -5px;
  }

  &__input {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    margin: 5px;

    input[type="text"], select {
      font-size: 1.1rem;
      padding-left: 28px;
      height: 2.7rem;
      border-width: 1px !important;
      border-color: var(--grey-300) !important;
    }

    input[type="text"] {
      padding-right: 28px;

      &::placeholder {
        color: var(--grey-400);
      }
    }

    select {
      padding-right: 4em;
    }

    .select {
      &::after {
        right: 28px;
      }
    }
  }

  &__title-input {
    display: flex;
  }

  &__content-checkbox {
    align-items: center;
    flex-direction: row;
    padding-bottom: 5px;

    .checkbox {
      margin: 5px;
    }
  }

  &__warning {
    position: absolute;
    left: -32px;
    top: 12px;
    font-size: 20px;
    color: red;
  }

  &__help {
    display: inline-flex;
  }

  &__content {
    position: relative;
    margin: 1.5rem 0;

    .write__warning {
      position: absolute;
      left: -32px;
      top: 20px;
      font-size: 20px;
      color: red;
    }
  }

  &__attachment {
    margin-bottom: 1.5rem;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }

  &__publish {
    box-sizing: content-box;
    color: var(--theme-400);
    font-weight: 500;
    padding: 4px 20px;
  }
}
</style>
