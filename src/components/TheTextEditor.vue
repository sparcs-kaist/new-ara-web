<template>
  <div class="editor" :class="{'editor--editable': this.editable, 'editor--focused': this.editor.focused}">
    <EditorMenuBar :editor="editor" v-show="this.editable">
      <div
        class="editor-menu-bar"
        slot-scope="{ commands, isActive }"
      >
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <span class="icon">
            <i class="material-icons">format_bold</i>
          </span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <span class="icon">
            <i class="material-icons">format_italic</i>
          </span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <span class="icon">
            <i class="material-icons">format_strikethrough</i>
          </span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <span class="icon">
            <i class="material-icons">format_underline</i>
          </span>
        </button>

        <button
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
          <span class="icon">
            <i class="material-icons">horizontal_rule</i>
          </span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <span class="icon">
            <i class="material-icons">code</i>
          </span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 })}"
          @click="commands.heading({ level: 1 })"
        >
          <span class="icon">
            <i class="material-icons">looks_one</i>
          </span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 })}"
          @click="commands.heading({ level: 2 })"
        >
          <span class="icon">
            <i class="material-icons">looks_two</i>
          </span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 })}"
          @click="commands.heading({ level: 3 })"
        >
          <span class="icon">
            <i class="material-icons">looks_3</i>
          </span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <span class="icon">
            <i class="material-icons">format_list_bulleted</i>
          </span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <span class="icon">
            <i class="material-icons">format_list_numbered</i>
          </span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <span class="icon">
            <i class="material-icons">format_quote</i>
          </span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <span class="icon">
            <i class="material-icons">code</i>
          </span>
        </button>

        <button
          class="menubar__button"
          @click="showImageDialog(commands.attachmentImage)"
        >
          <span class="icon">
            <i class="material-icons">image</i>
          </span>
        </button>

        <button
          class="menubar__button"
          @click="commands.undo"
        >
          <span class="icon">
            <i class="material-icons">undo</i>
          </span>
        </button>

        <button
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
      <EditorContent :editor="editor" class="editor-content" />
    </div>

    <div class="dialogs" v-if="editable">
      <TheTextEditorImageDialog ref="imageDialog" @attach-files="attachFiles" />
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
  Heading,
  History,
  HorizontalRule,
  Italic,
  Link,
  ListItem,
  OrderedList,
  Placeholder,
  Strike,
  Underline
} from 'tiptap-extensions'
import AttachmentImage from '@/editor/AttachmentImage'
import CodeBlock from '@/editor/CodeBlock'
import TheTextEditorImageDialog from '@/components/TheTextEditorImageDialog'

export default {
  name: 'the-text-editor',
  props: {
    content: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean
    }
  },
  data () {
    return {
      editor: new Editor({
        extensions: [
          new AttachmentImage(),
          new Blockquote(),
          new Bold(),
          new BulletList(),
          new Code(),
          new CodeBlock(),
          new Heading({ levels: [ 1, 2, 3 ] }),
          new History(),
          new HorizontalRule(),
          new Italic(),
          new Link(),
          new ListItem(),
          new OrderedList(),
          new Placeholder({
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Write something …',
            showOnlyWhenEditable: true
          }),
          new Strike(),
          new Underline()
        ],
        content: this.content,
        editable: this.editable
      })
    }
  },

  methods: {
    getContent () {
      return this.editor.getHTML()
    },

    showImageDialog (command) {
      this.$refs.imageDialog.showDialog(imageUrl => {
        if (imageUrl) {
          command({ src: imageUrl })
        }
      })
    },

    attachFiles (files) {
      this.$emit('attach-files', files)
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
      let imagePosition = null

      this.editor.state.doc.descendants((node, pos) => {
        if (imagePosition !== null) return false

        if (node.type.name !== 'attachmentImage') return true
        if (node.attrs['data-attachment'] === file.key) {
          imagePosition = pos
          return false
        }
      })

      const transaction = this.editor.state.tr.delete(imagePosition, imagePosition + 1)
      this.editor.view.dispatch(transaction)
    },

    applyImageUpload (attachmentUpdate) {
      this.editor.state.doc.descendants(node => {
        if (node.type.name !== 'attachmentImage') return true

        const fileKey = node.attrs['data-attachment']
        const newItem = attachmentUpdate[fileKey]

        if (newItem) {
          node.attrs['data-attachment'] = newItem.id
          node.attrs['src'] = newItem.file // TODO is it correct?
        }
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

  components: {
    EditorContent,
    EditorMenuBar,
    TheTextEditorImageDialog
  }
}
</script>

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
.editor--editable {
  .editor-content {
    img.ProseMirror-selectednode {
      filter: brightness(.5);
    }
  }

  .ProseMirror {
    min-height: 400px;
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
</style>
