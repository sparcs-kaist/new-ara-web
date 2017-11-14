<template>
  <div>
    <section class="section">
      <h1 class="title">댓글쓰기</h1>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"> 본문 </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <textarea v-model="content" class="textarea"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"> 익명 </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="is_anonymous" type="checkbox">
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"> 서명 사용 </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="use_signature" type="checkbox">
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"> 첨부 파일 </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="file has-name is-fullwidth">
                <label class="file-label">
                  <!--TODO: Make file input available-->
                  <input class="file-input" type="file" name="resume">
                  <span class="file-cta">
                    <span class="file-icon">
                      <!--TODO: Add Font Awesome link-->
                      <i class="fa fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Choose a file…
                    </span>
                  </span>
                  <span class="file-name">
                    Screen Shot 2017-07-29 at 15.54.25.png
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button :class="{'is-loading': pending}" @click="addCommentHandler" id="button-add-comment" class="button is-primary is-pulled-right">댓글쓰기</button>
      <div class="is-clearfix"></div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      content: '',
      is_anonymous: false,
      use_signature: false,
      attachment: '',
    };
  },
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
    addCommentHandler() {
      this.pending = true;
      if (this.isArticle) {
        axios({
          url: `${this.apiUrl}/comments/`,
          method: 'POST',
          data: {
            parent_article: this.context.id,
            parent_comment: null,
            content: this.content,
            is_anonymous: this.is_anonymous,
            use_signature: this.use_signature,
//            attachment: this.attachment,
          },
          auth: this.auth,
        })
          .then(() => {
            this.pending = false;
            this.fetchPost({ postId: this.post.id });
//            TODO: After Adding Commment, make AddComment component invisible
          })
          .catch((err) => {
            this.pending = false;
            alert('failed to add comment. please retry.');
            console.log(err);
          });
      } else {
        axios({
          url: `${this.apiUrl}/comments/`,
          method: 'POST',
          data: {
            parent_article: null,
            parent_comment: this.context.id,
            content: this.content,
            is_anonymous: this.isAnonymous,
            use_signature: this.useSignature,
//            attachment: this.attachment,
          },
          auth: this.auth,
        })
          .then(() => {
            this.pending = false;
            this.fetchPost({ postId: this.post.id });
          })
          .catch((err) => {
            this.pending = false;
            alert('failed to add comment. please retry.');
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped>

</style>
