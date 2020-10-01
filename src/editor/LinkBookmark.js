import { Node } from 'tiptap'
import ThePostBookmark from "../components/ThePostBookmark";
import {nodePasteRule} from "./nodePasteRule";

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g

export default class LinkBookmark extends Node{

  get schema() {
    return {
      attrs: {
        href: {
          default: null,
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
            let raw_href = dom.getAttribute('href')
            return {
              href: raw_href[0] === "!" ? raw_href.substring(1) : raw_href,
              title : dom.innerText
            }
          },
        },
      ],
      toDOM: node => {
        //fetchPost 할 때 post.content내 컴포넌트의 attribute 값이 url 형식이면 날아가버리는 거 같아서
        // (백엔드에서 따로 없애는 부분이 있나요?) 임시 방편으로 앞에 느낌표를 붙여 저장하도록 함
        return ['a', {href : `!${node.attrs.href}`}, node.attrs.href]
      },
    }
  }



  pasteRules({ type }) {
    return [
      nodePasteRule(
        URL_REGEX,
        type,
        match => {
          return {
            href : match[0],
            title : match[0]
          }
        },
      ),
    ]
  }

/*  inputRules({ type }) {
    return [
      nodeInputRule(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=][\s]*)/g,
        type,
        match => {
          return {
            href : match[0]
          }
        },
      ),
    ]
  }*/



  get name() {
    return 'link-bookmark'
  }

  get view(){
    return ThePostBookmark;
  }

}
