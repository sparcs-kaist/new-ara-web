import { CodeBlock } from 'tiptap-extensions'
import { insertText, setBlockType } from 'tiptap-commands'

export default class CustomCodeBlock extends CodeBlock {
  keys ({ type }) {
    return {
      'Shift-Ctrl-\\': setBlockType(type),
      Tab: (state, dispatch) => {
        const { selection: { $from } } = state

        if ($from.node().type === type) {
          insertText('\t')(state, dispatch)
          return true
        }

        return false
      }
    }
  }
}
