<template>
  <div class="editor">
    <editor-menu-bar :editor="editor">
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
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <span class="icon">
            <i class="material-icons">code</i>
          </span>
        </button>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" class="editor-content"/>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Bold,
  Code,
  Heading,
  Placeholder,
} from 'tiptap-extensions'

export default {
  name: 'the-text-editor',
  props: ['showOnly'],
  data() {
    return {
      editor: null,
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Bold(),
        new Code(),
        new Heading({ levels: [1] }),
        new Placeholder({
          emptyNodeClass: 'is-empty',
          emptyNodeText: 'Write something …',
          showOnlyWhenEditable: true,
        }),
      ],
      content: ''
      // editable: this.props.showOnly,
    })
  },
  methods: {
    showContent() {
      console.log(this.editor.getHTML())
    },
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  components: {
    EditorContent,
    EditorMenuBar,
  }
}
</script>

<style lang="scss" scoped>
.editor {

  .editor-menu-bar {
  
    .menubar__button {
      background-color: transparent;
      cursor: pointer;
      border: none;
  
      .material-icons {
        font-size: 18px ;
      }
    }
  }

  .editor-content {
    margin-left: 5px;
  }
}
</style>