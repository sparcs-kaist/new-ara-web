import { Node } from 'tiptap'
import ThePostBookmark from '../components/ThePostBookmark'
import {nodePasteRule} from './nodePasteRule'

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g

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
          tag: 'a',
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
        return ['a', {href: node.attrs.href}, node.attrs.href]
      }
    }
  }

  pasteRules ({ type }) {
    return [
      nodePasteRule(
        URL_REGEX,
        type,
        match => {
          return {
            href: match[0],
            title: match[0]
          }
        }
      )
    ]
  }

  get name () {
    return 'link-bookmark'
  }

  get view () {
    return ThePostBookmark
  }
}
