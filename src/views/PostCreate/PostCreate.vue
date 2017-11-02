<template>
  <div class="container">
    <section class="section">
      <h1 class="title">글쓰기</h1>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"> 제목 </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input v-model="title" class="input" type="text" placeholder="제목">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"> 내용 </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <vue-editor v-model="content" :editorToolbar="customToolbar" @imageAdded="imageUploadHandler (file, Editor, cursorLocation)" />
            </div>
          </div>
        </div>
      </div>
      <button :class="{'is-loading': pending}" @click="postArticleHandler" id="button-post-create"class="button is-primary is-pulled-right">게시하기</button>
      <div class="is-clearfix"></div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { VueEditor } from 'vue2-editor';

export default {
  data() {
    return {
      title: '',
      content: ' ',
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        ['image', 'video'],
      ],
      pending: false,
    };
  },
  computed: {
    ...mapState(['apiUrl', 'auth']),
  },
  components: {
    VueEditor,
  },
  methods: {
    postArticleHandler() {
      this.pending = true;
      this.$axios({
        url: `${this.apiUrl}/articles/`,
        method: 'POST',
        data: {
          title: this.title,
          content: this.content,
          is_anonymous: false,
          is_content_sexual: true,
          is_content_social: false,
          use_signature: false,
          parent_board: 1,
        },
        auth: this.auth,
      }).then((result) => {
        this.pending = false;
        // this.$router.push(`/post/{post_id??}`)
        console.log(result);
      })
      .catch((err) => {
        this.pending = false;
        console.log(err);
        alert(err);
      });
    },
    imageUploadHandler(file, Editor, cursorLocation) {
      const formData = new FormData();
      formData.append('image', file);

      this.$axios({
        url: 'https://fakeapi.yoursite.com/images',
        method: 'POST',
        data: formData,
      })
      .then((result) => {
        const url = result.data.url; // Get url from response
        Editor.insertEmbed(cursorLocation, 'image', url);
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style>
.is-title {
  margin-bottom: 2rem;
}

.ql-container {
  font-size: 16px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-color: #b5b5b5;
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
}

.ql-toolbar.ql-snow {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-color: #b5b5b5;
}

@media screen and (max-width: 1023px) {
  .quillWrapper {
    border-top: 1px solid #ccc;
  }

  .ql-toolbar {
    display: none;
  }
}

#button-post-create {
  margin-top: 1.5em;
}

</style>
