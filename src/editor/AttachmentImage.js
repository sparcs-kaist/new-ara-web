import { Node } from 'tiptap'
import TheAttachmentImage from '../components/TheAttachmentImage'

/**
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
*
 * (Disabled as we do not support foreign images)
 * const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/
 */

// Rewrite of default Image plugin of tiptap as it is hard to integrate with attachments,
// and it handles image as data-uri when drag & drop
export default class AttachmentImage extends Node {
  get name () {
    return 'attachmentImage'
  }

  get schema () {
    return {
      inline: true,
      attrs: {
        src: {},
        alt: {
          default: null
        },
        title: {
          default: null
        },
        'data-attachment': {
          default: null
        }
      },
      group: 'inline',
      draggable: true,
      parseDOM: [
        {
          tag: this.options.editable ? 'img[src][data-attachment]' : 'img[src]',
          getAttrs: dom => ({
            src: dom.getAttribute('src'),
            title: dom.getAttribute('title'),
            alt: dom.getAttribute('alt'),
            'data-attachment': dom.getAttribute('data-attachment')
          })
        }
      ],
      toDOM: node => ['img', node.attrs]
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

  /* inputRules ({ type }) {
    return [
      nodeInputRule(IMAGE_INPUT_REGEX, type, match => {
        const [, alt, src, title] = match
        return {
          src,
          alt,
          title
        }
      })
    ]
  } */

  get view () {
    return TheAttachmentImage
  }
}
