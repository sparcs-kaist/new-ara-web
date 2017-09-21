<template>
  <div>
    <span @click="action('like')">추천</span>
    <span @click="action('dislike')">반대</span>
    <span v-if="isArticle" @click="action('scrap')">스크랩</span>
    <span @click="action('report')">신고</span>
  </div>
</template>

<script>

export default {
  props: ['isArticle'],
  methods: {
    action(type) {
      let url;
      if (type === 'like') url = 'like';
      else if (type === 'dislike') url = 'dislike';
      console.log(url);
    },
  },
};
</script>

<style>

</style>
