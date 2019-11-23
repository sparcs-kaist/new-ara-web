<template>
  <div class="editor" :class="{'editor--editable': this.editable}">
    <EditorMenuBar :editor="editor" v-show="this.editable">
      <div
        class="editor-menu-bar"
        slot-scope="{ commands, isActive }"
      >
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 })}"
          @click="commands.heading({ level: 1 })"
        >
          <span class="icon">
            <i class="material-icons">title</i>
          </span>
        </button>

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
          @click="showImageDialog(commands.image)"
        >
          <span class="icon">
            <i class="material-icons">image</i>
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
      </div>
    </EditorMenuBar>
    <div class="content">
      <EditorContent :editor="editor" class="editor-content" />
    </div>

    <div class="dialogs" v-if="!showOnly">
      <TheTextEditorImageDialog ref="imageDialog" @attach-files="attachFiles" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Bold,
  Code,
  Heading,
  History,
  Placeholder
} from 'tiptap-extensions'
import AttachmentImage from '@/editor/AttachmentImage'
import TheTextEditorImageDialog from '@/components/TheTextEditorImageDialog'

export default {
  name: 'the-text-editor',
  props: ['showOnly', 'content', 'editable'],
  data () {
    return {
      editor: new Editor({
        extensions: [
          new AttachmentImage(),
          new Bold(),
          new Code(),
          new Heading({ levels: [1] }),
          new History(),
          new Placeholder({
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Write something …',
            showOnlyWhenEditable: true
          })
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
  margin-bottom: 30px;

  .editor-menu-bar {
    margin-bottom: 10px;

    .menubar__button {
      background-color: transparent;
      cursor: pointer;
      border: none;

      margin: -5px;

      .material-icons {
        font-size: 18px ;
      }
    }
  }

  .editor-content {
    margin-left: 5px;

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
