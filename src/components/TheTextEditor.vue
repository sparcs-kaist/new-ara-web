<template>
  <div class="editor">
    <editor-menu-bar :editor="editor">
      <div
        class="editor-menu-bubble"
        slot-scope="{ commands, isActive }"
      >
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          B
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          {{"</>"}}
        </button>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" />
    <button @click="showContent">Content</button>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Bold,
  Code,
  Placeholder,
} from 'tiptap-extensions'

export default {
  name: 'the-text-editor',
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
        new Placeholder({
          emptyNodeClass: 'is-empty',
          emptyNodeText: 'Write something …',
          showOnlyWhenEditable: true,
        }),
      ],
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
.editor p.is-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}
</style>