<template>
  <div>
    <button class="button" @click="action('like')">추천</button>
    <span>{{ this.post.positive_vote_count }}</span>
    <button class="button" @click="action('dislike')">반대</button>
    <span>{{ this.post.negative_vote_count }}</span>
    <span v-if="isArticle" @click="action('scrap')">스크랩</span>
    <span @click="action('report')">신고</span>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  props: ['isArticle'],
  computed: {
    ...mapState({
      post: 'post',
    }),
  },
  methods: {
    action(type) {
      if (this.post.my_vote) {
        alert('you already voted');
      } else {
        let voteType;
        if (type === 'like') {
          voteType = 'vote_positive';
        } else if (type === 'dislike') {
          voteType = 'vote_negative';
        }
        axios.post(`http://13.124.216.27:8000/api/articles/${this.post.id}/${voteType}/`, {
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
