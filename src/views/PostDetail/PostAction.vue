<template>
  <div>
    <button class="button" :class="{ 'is-danger': context.my_vote === true }" @click="action('like')">추천</button>
    <span>{{ this.context.positive_vote_count }}</span>
    <button class="button" :class="{ 'is-danger': context.my_vote === false }" @click="action('dislike')">반대</button>
    <span>{{ this.context.negative_vote_count }}</span>
    <span v-if="isArticle" @click="action('scrap')">스크랩</span>
    <button class="button" @click="openReportModal">신고</button>
    <div class="modal" :class="{ 'is-active': reportToggle }">
      <div class="modal-background" @click="reportToggle = false"></div>
      <div class="modal-content">
        <div class="modal-card">
          <section class="modal-card-body">
            <p>신고할 대상 : {{ isArticle ? context.title : context.content }}</p>
            <p>신고 사유</p>
            <input class="input" v-model="reportContent" />
          </section>
          <footer class="modal-card-foot">
            <button class="button is-danger" @click="report">신고하기</button>
            <button class="button" @click="reportToggle = false">취소</button>
          </footer>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: [
    'context',
    'isArticle',
  ],
  data() {
    return {
      reportToggle: false,
      reportContent: '',
    };
  },
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
        this.$axios({
          url: `${this.apiUrl}/api/${contextType}/${this.context.id}/vote_cancel/`,
          method: 'POST',
        })
          .then(() => {
            this.fetchPost({ postId: this.post.id, context: this.$route.query });
          })
          .catch((err) => {
            alert('failed to cancel vote. please retry.');
            console.log(err);
          });
      } else {
        this.$axios({
          url: `${this.apiUrl}/api/${contextType}/${this.context.id}/${voteTypeStr}/`,
          method: 'POST',
        })
          .then(() => {
            this.fetchPost({ postId: this.post.id, context: this.$route.query });
          })
          .catch((err) => {
            alert('failed to vote. please retry.');
            console.log(err);
          });
      }
    },
    openReportModal() {
      if (this.context.my_report) {
        alert(`You've already reported this ${this.isArticle ? 'article' : 'comment'}!`);
      } else {
        this.reportToggle = true;
      }
    },
    report() {
      const data = {
        content: this.reportContent,
      };
      if (this.isArticle) {
        data.parent_article = this.context.id;
      } else {
        data.parent_comment = this.context.id;
      }
      this.$axios({
        url: `${this.apiUrl}/api/reports/`,
        method: 'POST',
        data,
      })
        .then((res) => {
          alert('report accepted!');
          this.context.my_report = res.data;
        })
        .catch(() => {
          alert('');
        });
      this.reportContent = '';
      this.reportToggle = false;
    },
  },
};
</script>

<style>

</style>
