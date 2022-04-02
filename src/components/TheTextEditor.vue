<template>
  <div
    :class="{
      'editor--editable': editable,
      'editor--focused': editor.focused
    }"
    class="editor"
  >
    <blockquote v-if="imgError && !editable">
      <p><strong>{{ $t('img-invalid-title') }}</strong></p>
      <p>{{ $t('img-invalid-subtitle') }}</p>
    </blockquote>

    <EditorMenuBar v-show="editable" :editor="editor">
      <div slot-scope="{ commands, isActive }" class="editor-menu-bar">
        <button
          :class="{ 'is-active': isActive.bold() }"
          class="menubar__button"
          @click="commands.bold"
        >
          <span class="icon">
            <i class="material-icons">format_bold</i>
          </span>
        </button>

        <button
          :class="{ 'is-active': isActive.italic() }"
          class="menubar__button"
          @click="commands.italic"
        >
          <span class="icon">
            <i class="material-icons">format_italic</i>
          </span>
        </button>

        <button
          :class="{ 'is-active': isActive.strike() }"
          class="menubar__button"
          @click="commands.strike"
        >
          <span class="icon">
            <i class="material-icons">format_strikethrough</i>
          </span>
        </button>

        <button
          :class="{ 'is-active': isActive.underline() }"
          class="menubar__button"
          @click="commands.underline"
        >
          <span class="icon">
            <i class="material-icons">format_underline</i>
          </span>
        </button>

        <button class="menubar__button" @click="showLinkDialog()">
          <span class="icon">
            <i class="material-icons">link</i>
          </span>
        </button>

        <button class="menubar__button" @click="commands.horizontal_rule">
          <span class="icon">
            <i class="material-icons">horizontal_rule</i>
          </span>
        </button>

        <button
          :class="{ 'is-active': isActive.code() }"
          class="menubar__button"
          @click="commands.code"
        >
          <span class="icon">
            <i class="material-icons">code</i>
          </span>
        </button>

        <button
          :class="{ 'is-active': isActive.heading({ level: 1 })}"
          class="menubar__button"
          @click="commands.heading({ level: 1 })"
        >
          <span class="icon">
            <i class="material-icons">looks_one</i>
          </span>
        </button>

        <button
          :class="{ 'is-active': isActive.heading({ level: 2 })}"
          class="menubar__button"
          @click="commands.heading({ level: 2 })"
        >
          <span class="icon">
            <i class="material-icons">looks_two</i>
          </span>
        </button>

        <button
          :class="{ 'is-active': isActive.heading({ level: 3 })}"
          class="menubar__button"
          @click="commands.heading({ level: 3 })"
        >
          <span class="icon">
            <i class="material-icons">looks_3</i>
          </span>
        </button>

        <button
          :class="{ 'is-active': isActive.bullet_list() }"
          class="menubar__button"
          @click="commands.bullet_list"
        >
          <span class="icon">
            <i class="material-icons">format_list_bulleted</i>
          </span>
        </button>

        <button
          :class="{ 'is-active': isActive.ordered_list() }"
          class="menubar__button"
          @click="commands.ordered_list"
        >
          <span class="icon">
            <i class="material-icons">format_list_numbered</i>
          </span>
        </button>

        <button
          :class="{ 'is-active': isActive.blockquote() }"
          class="menubar__button"
          @click="commands.blockquote"
        >
          <span class="icon">
            <i class="material-icons">format_quote</i>
          </span>
        </button>

        <button
          :class="{ 'is-active': isActive.code_block() }"
          class="menubar__button"
          @click="commands.code_block"
        >
          <span class="icon">
            <i class="material-icons">code</i>
          </span>
        </button>

        <button
          class="menubar__button"
          @click="$emit('open-image-upload')"
        >
          <span class="icon">
            <i class="material-icons">image</i>
          </span>
        </button>

        <!-- Enabling undoDepth will make other components get no focus -->
        <button
          :class="{ /* 'is-disabled': commands.undoDepth() === 0 */ }"
          class="menubar__button"
          @click="commands.undo"
        >
          <span class="icon">
            <i class="material-icons">undo</i>
          </span>
        </button>

        <button
          :class="{ /* 'is-disabled': commands.redoDepth() === 0 */ }"
          class="menubar__button"
          @click="commands.redo"
        >
          <span class="icon">
            <i class="material-icons">redo</i>
          </span>
        </button>
      </div>
    </EditorMenuBar>

    <div class="content">
      <EditorContent
        v-if="editable"
        :editor="editor"
        class="editor-content"
      />
      <div
        v-else
        :editor="editor"
        class="editor-content"
        v-html="getVhtmlContent()"
      />
    </div>

    <div v-if="editable" class="dialogs">
      <TheTextEditorLinkDialog ref="linkDialog" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  Bold,
  BulletList,
  Code,
  HardBreak,
  Heading,
  History,
  HorizontalRule,
  Italic,
  Link,
  ListItem,
  OrderedList,
  Placeholder,
  Strike,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Underline
} from 'tiptap-extensions'
import AttachmentImage from '@/editor/AttachmentImage'
import CodeBlock from '@/editor/CodeBlock'
import LinkBookmark from '@/editor/LinkBookmark'
import TheTextEditorLinkDialog from '@/components/TheTextEditorLinkDialog.vue'

export default {
  name: 'TheTextEditor',

  components: {
    EditorContent,
    EditorMenuBar,
    TheTextEditorLinkDialog
  },

  props: {
    content: {
      type: String,
      default: ''
    },
    editable: Boolean
  },

  data () {
    return {
      imgError: false,
      editor: new Editor({
        extensions: [
          new LinkBookmark(), // Bold, Italic과 underscore inputRule이 겹침 => url 우선
          new AttachmentImage({
            errorCallback: () => { this.imgError = true },
            editable: this.editable
          }),
          new Blockquote(),
          new Bold(),
          new BulletList(),
          new Code(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [ 1, 2, 3 ] }),
          new History(),
          new HorizontalRule(),
          new Link(),
          new Italic(),
          new ListItem(),
          new OrderedList(),
          new Placeholder({
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Write something …',
            showOnlyWhenEditable: true
          }),
          new Strike(),
          new Table(),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
          new Underline()
        ],
        content: this.content,
        editable: this.editable
      })
    }
  },

  watch: {
    content (newContent) {
      if (!this.editable) {
        this.editor.setContent(newContent)
      }
    }
  },

  beforeDestroy () {
    this.editor.destroy()
  },

  methods: {
    getContent () {
      return this.editor.getHTML()
    },
    getVhtmlContent () {
      const content = this.editor.getHTML()
      // Replace <p></p> to <br>(Which done in editor by Prosemirror)
      const removeRegexP = /<p><\/p>/g
      return content.replace(removeRegexP, '<br>')
    },
    showLinkDialog () {
      const { commands, schema, view, selection, state: { doc } } = this.editor

      const { from, to } = selection
      const text = doc.textBetween(from, to, ' ')

      this.$refs.linkDialog.showDialog((url, title, isBookmark) => {
        const { state: { tr } } = this.editor

        if (isBookmark) {
          commands.linkBookmark({ href: url, title })
        } else {
          const node = schema.text(
            title,
            [ schema.marks.link.create({ href: url }) ]
          )

          view.dispatch(tr.replaceSelectionWith(node, false))
        }
      }, text || '')
    },
    addImageByFile (file) {
      if (file.blobUrl) {
        this.editor.commands.attachmentImage({
          src: file.blobUrl,
          'data-attachment': file.key
        })
      }
    },
    removeImageByFile (file) {
      const imagePositions = []

      this.editor.state.doc.descendants((node, pos) => {
        if (node.type.name !== 'attachmentImage') return true
        if (node.attrs['data-attachment'] === file.key) {
          imagePositions.push(pos)
          return false
        }
      })

      if (imagePositions.length <= 0) return

      const transaction = imagePositions
        .sort((v1, v2) => v2 - v1)
        .reduce(
          (transaction, imagePosition) => transaction.delete(imagePosition, imagePosition + 1),
          this.editor.state.tr
        )

      this.editor.view.dispatch(transaction.setMeta('addToHistory', false))
    },
    applyImageUpload (attachmentUpdate) {
      this.editor.state.doc.descendants(node => {
        if (node.type.name !== 'attachmentImage') return true

        const fileKey = node.attrs['data-attachment']
        const newItem = attachmentUpdate[fileKey]

        if (newItem) {
          node.attrs['data-attachment'] = newItem.id
          node.attrs.src = newItem.file // TODO is it correct?
        }
      })
    }
  }
}
</script>

<i18n>
ko:
  img-invalid-title: '이미지를 불러오는데 실패했습니다. 포탈 공지 글인 경우 위 링크를 클릭해 주세요.'
  img-invalid-subtitle: '(로그인 후 포탈 메인 페이지가 보인다면 링크를 다시 클릭해 주세요)'

en:
  img-invalid-title: 'Failed to load image. If it is a portal notice, please click the link above.'
  img-invalid-subtitle: 'If you see the portal main page after logging in, click the link again.'
</i18n>

<style lang="scss" scoped>
.editor {
  position: relative;

  &--editable {
    border: 1px solid var(--grey-300);
    border-radius: 10px;
    box-shadow: 0 2px 6px 0 transparent;
    transition: all var(--duration) var(--background-timing);

    .editor-content {
      padding: 18px 28px;
    }

    &:hover, &.editor--focused {
      box-shadow: 0 2px 6px 0 var(--grey-400);
    }
  }

  .editor-menu-bar {
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    border-bottom: 1px solid var(--grey-300);

    position: sticky;
    top: 0;
    background: var(--grey-100);
    border-radius: 10px 10px 0 0;
    z-index: 1;

    .menubar__button {
      background-color: transparent;
      cursor: pointer;
      color: var(--grey-600);
      border: none;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      margin: 4px;

      .material-icons {
        font-size: 1.5rem;
      }

      &.is-active {
        background-color: var(--grey-300);
      }

      &.is-disabled {
        color: var(--grey-300);
      }
    }
  }

  .editor-content {
    text-rendering: optimizeLegibility;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;

    p {
      display: inline-block;

      code {
        display: block;
      }
    }
  }
}
</style>

<style lang="scss">
@import '@/theme.scss';
.editor--editable {
  .editor-content {
    img.ProseMirror-selectednode {
      filter: brightness(.5);
    }
  }

  .ProseMirror {
    min-height: 400px;

    @include breakPoint(mobile) {
      min-height: 160px;
    }
  }

  p.is-empty:first-child::before {
    content: attr(data-empty-text);
    float: left;
    color: #aaa;
    pointer-events: none;
    height: 0;
    font-style: italic;
  }
}

.editor-content {
  a {
    color: #00b8d4;
  }
}
</style>
