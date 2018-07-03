<template>
  <div>
    <!---->
    <!--<div class="field is-horizontal">-->
      <!--<div class="field-label is-normal">-->
        <!--<label class="label"> 본문 </label>-->
      <!--</div>-->
      <!--<div class="field-body">-->
        <!--<div class="field">-->
          <!--<div class="control">-->
            <!--<textarea v-model="content" class="textarea"></textarea>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="field is-horizontal">-->
      <!--<div class="field-label is-normal">-->
        <!--<label class="label"> 익명 </label>-->
      <!--</div>-->
      <!--<div class="field-body">-->
        <!--<div class="field">-->
          <!--<div class="control">-->
            <!--<label class="checkbox">-->
              <!--<input v-model="isAnonymous" type="checkbox">-->
            <!--</label>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="field is-horizontal">-->
      <!--<div class="field-label is-normal">-->
        <!--<label class="label"> 서명 사용 </label>-->
      <!--</div>-->
      <!--<div class="field-body">-->
        <!--<div class="field">-->
          <!--<div class="control">-->
            <!--<label class="checkbox">-->
              <!--<input v-model="useSignature" type="checkbox">-->
            <!--</label>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="field is-horizontal">-->
      <!--<div class="field-label is-normal">-->
        <!--<label class="label"> 첨부 파일 </label>-->
      <!--</div>-->
      <!--<div class="field-body">-->
        <!--<div class="field">-->
          <!--<div class="control">-->
            <!--<div class="file has-name is-fullwidth">-->
              <!--<label class="file-label">-->
                <!--&lt;!&ndash;TODO: Make file input available&ndash;&gt;-->
                <!--<input class="file-input" type="file" @change="onFileChange">-->
                <!--<span class="file-cta">-->
                  <!--<span class="file-icon">-->
                    <!--&lt;!&ndash;TODO: Add Font Awesome link&ndash;&gt;-->
                    <!--<i class="fa fa-upload"></i>-->
                  <!--</span>-->
                  <!--<span class="file-label">-->
                    <!--Choose a file…-->
                  <!--</span>-->
                <!--</span>-->
                <!--<span class="file-name">-->
                    <!--{{ filename }}-->
                <!--</span>-->
              <!--</label>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<button :class="{'is-loading': pending}" @click="addCommentHandler" id="button-add-comment" class="button is-primary is-pulled-right">댓글쓰기</button>-->
    <!--<div class="is-clearfix"></div>-->

    <textarea v-model="content" class="textarea"></textarea>
    <button :class="{'is-loading': pending}" @click="addCommentHandler" id="button-add-comment" class="button is-dark is-normal">댓글달기</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      content: '',
      isAnonymous: false,
      useSignature: false,
      attachment: '',
      filename: '',
      pending: false,
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
      this.$axios.post('attachments/',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      ).then((res) => {
        this.filename = files[0].name;
        this.attachment = res.data.id;
      }).catch(() => {});
    },
    addCommentHandler() {
      this.pending = true;
      console.log(this.attachment);

      const data = {
        [this.isArticle ? 'parent_article' : 'parent_comment']: this.context.id,
        [this.isArticle ? 'parent_comment' : 'parent_article']: null,
        content: this.content,
        isAnonymous: this.is_anonymous,
        useSignature: this.use_signature,
        attachment: this.attachment,
      };

      this.$axios.post('comments/', data)
      .then(() => {
        this.pending = false;
        this.fetchPost({ postId: this.post.id });
        this.$emit('successAdd');
        this.resetForm();
      }).catch(() => {
        this.pending = false;
      });
    },
    resetForm() {
      this.content = '';
      this.isAnonymous = false;
      this.useSignature = false;
      this.attachment = '';
      this.filename = '';
      this.pending = false;
    },
  },
};
</script>

<style scoped>
  #button-add-comment {
    margin-top: 16px;
  }
</style>
