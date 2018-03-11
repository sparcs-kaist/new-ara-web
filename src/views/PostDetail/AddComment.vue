<template>
  <div>
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
                <input class="file-input" type="file" @change="onFileChange">
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
                    {{ filename }}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button :class="{'is-loading': pending}" @click="addCommentHandler" id="button-add-comment" class="button is-primary is-pulled-right">댓글쓰기</button>
    <div class="is-clearfix"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      content: '',
      is_anonymous: false,
      use_signature: false,
      attachment: '',
      filename: '',
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
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      const formData = new FormData();
      formData.append('file', files[0]);
      this.$axios({
        url: `${this.apiUrl}/api/attachments/`,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          this.filename = files[0].name;
          this.attachment = res.data.id;
        })
        .catch(() => {
        });
    },
    addCommentHandler() {
      this.pending = true;
      console.log(this.attachment);
      if (this.isArticle) {
        this.$axios({
          url: `${this.apiUrl}/api/comments/`,
          method: 'POST',
          data: {
            parent_article: this.context.id,
            parent_comment: null,
            content: this.content,
            is_anonymous: this.is_anonymous,
            use_signature: this.use_signature,
            attachment: this.attachment,
          },
        })
          .then(() => {
            this.pending = false;
            this.fetchPost({ postId: this.post.id });
            this.$emit('successAdd');
          })
          .catch(() => {
            this.pending = false;
          });
      } else {
        this.$axios({
          url: `${this.apiUrl}/api/comments/`,
          method: 'POST',
          data: {
            parent_article: null,
            parent_comment: this.context.id,
            content: this.content,
            is_anonymous: this.isAnonymous,
            use_signature: this.useSignature,
            attachment: this.attachment,
          },
        })
          .then(() => {
            this.pending = false;
            this.fetchPost({ postId: this.post.id });
            this.$emit('successAdd');
          })
          .catch(() => {
            this.pending = false;
          });
      }
    },
  },
};
</script>

<style scoped>

</style>
