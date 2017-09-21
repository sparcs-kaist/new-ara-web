<template>
  <div class="container">
    <section class="section">
      <h1 class="title">글쓰기</h1>
      <vue-editor v-model="content" :editorToolbar="customToolbar" @imageAdded="imageUploadHandler (file, Editor, cursorLocation)" />
      {{ content }}
      <button id="button-post-create" class="button is-primary is-pulled-right">게시</button>
      <div class="is-clearfix"></div>
    </section>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';

export default {
  data() {
    return {
      content: '',
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        ['image', 'video'],
      ],
    };
  },
  components: {
    VueEditor,
  },
  methods: {
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
#button-post-create {
  margin-top: 1.5em;
}

@media screen and (max-width: 1023px) {
  .quillWrapper {
    border-top: 1px solid #ccc;
  }

  .ql-toolbar {
    display: none;
  }
}
</style>
