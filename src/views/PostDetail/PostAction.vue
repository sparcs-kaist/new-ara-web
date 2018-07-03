<template>
  <div>
    <span class="action-container" @click="vote(true)">
      <i class="mdi mdi-18px mdi-thumb-up"/>
      <span :class="{ 'voted': context.my_vote === true }">{{ context.positive_vote_count }}</span>
    </span>
    <span class="action-container" @click="vote(false)">
      <i class="mdi mdi-18px mdi-thumb-down"/>
      <span :class="{ 'voted': context.my_vote === false }">{{ context.negative_vote_count }}</span>
    </span>
    <span>
      <a><u>신고하기</u></a>
    </span>
    <!--<span v-if="isArticle" @click="action('scrap')">스크랩</span>-->
    <!--<button class="button" @click="openReportModal">신고</button>-->
    <!--<div class="modal" :class="{ 'is-active': reportToggle }">-->
      <!--<div class="modal-background" @click="reportToggle = false"></div>-->
      <!--<div class="modal-content">-->
        <!--<div class="modal-card">-->
          <!--<section class="modal-card-body">-->
            <!--<p>신고할 대상 : {{ isArticle ? context.title : context.content }}</p>-->
            <!--<p>신고 사유</p>-->
            <!--<input class="input" v-model="reportContent" />-->
          <!--</section>-->
          <!--<footer class="modal-card-foot">-->
            <!--<button class="button is-danger" @click="report">신고하기</button>-->
            <!--<button class="button" @click="reportToggle = false">취소</button>-->
          <!--</footer>-->
        <!--</div>-->
      <!--</div>-->
      <!--<button class="modal-close is-large" aria-label="close"></button>-->
    <!--</div>-->
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
      'post',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchPost',
    ]),
    vote(newVoteType) {
      const contextType = this.isArticle ? 'articles' : 'comments';

      let updateVoteUrlDetail;
      if (this.context.my_vote === newVoteType) updateVoteUrlDetail = 'vote_cancel/';
      else updateVoteUrlDetail = `${newVoteType ? 'vote_positive' : 'vote_negative'}/`;
      this.$axios.post(`${contextType}/${this.context.id}/${updateVoteUrlDetail}`)
        .then(() => {
          this.fetchPost({ postId: this.post.id, context: this.$route.query });
        })
        .catch(() => {});

    },
    openReportModal() {
      if (this.context.my_report) alert(`You've already reported this ${this.isArticle ? 'article' : 'comment'}!`);
      else this.reportToggle = true;
    },
    report() {
      const data = {
        content: this.reportContent,
        [this.isArticle ? 'parent_article' : 'parent_comment']: this.context.id,
      };

      this.$axios.post('reports/', data)
        .then((res) => {
          alert('report accepted!');
          this.context.my_report = res.data;
        }).catch(() => {});

      this.reportContent = '';
      this.reportToggle = false;
    },
  },
};
</script>

<style lang="scss">
  @import '../../styles/variables.scss';

  .voted {
    color: $theme-red;
  }

  .action-container {
    cursor: pointer;
    padding: 0.5em 0.5em;
    &:hover {
      background-color: whitesmoke;
    }
  }
</style>
