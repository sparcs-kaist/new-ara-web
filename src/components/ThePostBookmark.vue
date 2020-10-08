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
  props: [ 'node' ],
  computed: {
    href () {
      return this.node.attrs.href
    },

    title () {
      const rawTitle = this.node.attrs.title
      if (!rawTitle || rawTitle.replace(' ', '').length === 0) return 'URL'

      let match = urlParser(rawTitle, true)
      if (match) {
        let domains = match[1].split('.')
        domains.pop()
        for (let i of domains.reverse()) {
          if (i.length > 2) return i.toUpperCase()
        }
      }

      return rawTitle
    }
  }
}
</script>

<style lang="scss" scoped>
  .bookmark-box {
    display: flex;
    position: relative;
    max-width: 544px;
    height: auto;
    border-radius: 10px;
    border: 1px solid var(--grey-300);
    box-shadow: 0 0 2px 0 var(--grey-400);
    background-color: var(--background);
    margin-top: 18px;
    margin-bottom: 18px;
    flex-direction: column;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 10px;
      box-shadow: 0 0 6px 0 var(--grey-400);
      opacity: 0;
      transition: opacity var(--duration) var(--background-timing);
    }

    &:hover::before {
      opacity: 1;
    }

    .box-title {
      font-size: 15px;
      line-height: 1.4;
      text-align: left;
      padding: 0 0 0 0;
      margin: 18px 28px 0 28px;
      color: var(--grey-700);
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
      color: var(--grey-700);
    }
  }

</style>
