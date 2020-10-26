import { Node } from 'tiptap'
import ThePostBookmark from '../components/ThePostBookmark'

export default class LinkBookmark extends Node {
  get schema () {
    return {
      attrs: {
        href: {
          default: null
        },
        title: {
          default: null
        }
      },
      inline: 'true',
      group: 'inline',
      draggable: true,
      parseDOM: [
        {
          // Should be parsed before Link parses
          priority: 51,
          tag: 'a[data-bookmark][href]',
          getAttrs: dom => {
            let rawHref = dom.getAttribute('href')
            return {
              href: rawHref,
              title: dom.innerText
            }
          }
        }
      ],
      toDOM: node => {
        return ['a', { href: node.attrs.href, 'data-bookmark': true }, node.attrs.title]
      }
    }
  }

  commands ({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }

  get name () {
    return 'linkBookmark'
  }

  get view () {
    return ThePostBookmark
  }
}
