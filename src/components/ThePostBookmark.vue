<template>
  <a class="bookmark-box" :href="href" target="_blank">
    <p class="box-title">{{title}}  <i class="material-icons icon">navigate_next</i> </p>
    <p class="box-info">{{href.length > 50 ? href.substring(0, 50) + "..." : href}}</p>
  </a>
</template>

<script>

import { urlParser } from '../utils/urlParser'

export default {
  name: 'ThePostBookmark',
  props: ['node', 'updateAttrs', 'view'],
  computed: {
    href: {
      get () {
        return this.node.attrs.href
      }
    },
    title: {
      get () {
        const rawTitle = this.node.attrs.title
        if (!rawTitle || rawTitle.replace(' ', '').length === 0) return 'URL'
        let match = urlParser(rawTitle, true)
        if (match) {
          let domains = match[1].split('.')
          domains.pop()
          for (let i of domains.reverse()) if (i.length > 2) return i.toUpperCase()
        }
        return rawTitle
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .bookmark-box {
    max-width: 544px;
    height: auto;
    border-radius: 10px;
    transition: box-shadow .3s;
    box-shadow: 0 0 2px 0 #a9a9a9;
    background-color: #ffffff;
    margin-top: 18px;
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;

    &:hover{
      box-shadow: 0 0 6px 0 #a9a9a9;
    }

    .box-title {
      font-size: 15px;
      line-height: 1.4;
      text-align: left;
      padding: 0 0 0 0;
      margin: 18px 28px 0 28px;
      color: #003333;
    }

    .icon{
      width: 20px;
      height: 20px;
      vertical-align: bottom;
    }

    .box-info {
      font-size: 15px;
      text-align: left;
      padding: 6px 0 0 0;
      margin: 0 28px 18px 28px;
      color: #333333;
    }
  }

</style>
