<template>
  <div>
    <button class="button" @click="action('like')">추천</button>
    <span>{{ this.context.positive_vote_count }}</span>
    <button class="button" @click="action('dislike')">반대</button>
    <span>{{ this.context.negative_vote_count }}</span>
    <span v-if="isArticle" @click="action('scrap')">스크랩</span>
    <span @click="action('report')">신고</span>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: [
    'context',
    'isArticle',
  ],
  methods: {
    action(type) {
      let contextType;
      let voteTypeBool;
      let voteTypeStr;
      if (this.isArticle) {
        contextType = 'articles';
      } else {
        contextType = 'comments';
      }
      if (type === 'like') {
        voteTypeBool = true;
        voteTypeStr = 'vote_positive';
      } else if (type === 'dislike') {
        voteTypeBool = false;
        voteTypeStr = 'vote_negative';
      }
      if (this.context.my_vote === voteTypeBool) {
        alert('you already voted');
      } else {
        axios.post(`http://13.124.216.27:8000/api/${contextType}/${this.context.id}/${voteTypeStr}/`, {
          auth: {
            username: 'sparcs',
            password: 'newara@sparcs',
          },
        })
          .then((res) => {
            console.log(res.data);
          })
          .catch(() => {
          });
      }
    },
  },
};
</script>

<style>

</style>
