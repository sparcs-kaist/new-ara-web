<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-show="this.editable">
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
    <div class="content">
      <editor-content :editor="editor" class="editor-content" />
    </div>
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
  props: ['showOnly', 'content', 'editable'],
  data() {
    return {
      editor: new Editor({
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
        content: JSON.parse(this.content),
        editable: this.editable,
      }),
    }
  },
  methods: {
    getContent() {
      return this.editor.getJSON()
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


  p::before {
    content: attr(data-empty-text);
    float: left;
    color: #aaa;
    pointer-events: none;
    height: 0;
    font-style: italic;
  }
}

</style>