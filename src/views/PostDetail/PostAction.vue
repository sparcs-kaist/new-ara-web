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
import { mapState, mapActions } from 'vuex';

export default {
  props: [
    'context',
    'isArticle',
  ],
  computed: {
    ...mapState([
      'apiUrl',
      'auth',
      'post',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchPost',
    ]),
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
        if (voteTypeBool) {
          alert('you already voted positive');
        } else {
          alert('you already voted negative');
        }
      } else {
        axios({
          url: `${this.apiUrl}/api/${contextType}/${this.context.id}/${voteTypeStr}/`,
          method: 'POST',
          auth: this.auth,
        })
          .then(() => {
            this.fetchPost({ postId: this.post.id, context: this.$route.query });
          })
          .catch((err) => {
            alert('failed to vote');
            console.log(err);
          });
      }
    },
  },
};
</script>

<style>

</style>
