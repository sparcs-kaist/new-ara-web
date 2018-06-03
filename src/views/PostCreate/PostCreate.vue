<template>
  <div class="container">
    <div class="columns">
      <div class="column is-2 placeholder"></div>
      <div class="column is-6">
        <div class="article-container">
          <h1 class="title">글쓰기</h1>
          <div class="columns">
            <div class="column is-3">
              <div class="field">
                <label class="label">게시판</label>
                <div class="control">
                  <div class="select">
                    <select v-model="board">
                      <option v-for="boardName in boardNameList">{{ boardName }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-9">
              <div class="field">
                <label class="label">제목</label>
                <div class="control">
                  <input v-model="title" class="input input-field" type="text" placeholder="제목" />
                </div>
              </div>
            </div>
          </div>
          <vue-editor v-model="content" :editorToolbar="customToolbar" @imageAdded="imageUploadHandler(file, Editor, cursorLocation)"></vue-editor>
          <button :class="{'is-loading': pending}" @click="postArticleHandler" id="button-post-create" class="button is-primary">게시</button>
          <div class="is-clearfix"></div>
        </div>
      </div>
      <div class="column is-2 advertisement">광고</div>
      <div class="column is-2 placeholder"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { VueEditor } from 'vue2-editor';

export default {
  data() {
    return {
      board: '', /* TODO: 현재 게시판 default로 설정 */
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
    ...mapState([
      'boardList',
      'apiUrl',
      'auth',
    ]),
    ...mapGetters([
      'boardNameList',
    ]),
  },
  components: {
    VueEditor,
  },
  methods: {
    ...mapActions([
      'updateBoardList',
    ]),
    postArticleHandler() {
      if (!this.validateInput()) {
        /* TODO: Modal로 변경 */
        alert('게시판과 제목, 내용을 모두 적으셔야 합니다.');
        return;
      }
      this.pending = true;
      this.$axios({
        url: `${this.apiUrl}/api/articles/`,
        method: 'POST',
        data: {
          title: this.title,
          content: this.content,
          is_anonymous: false,
          is_content_sexual: false,
          is_content_social: false,
          use_signature: false,
          parent_board: this.boardList[this.boardNameList.indexOf(this.board)].id,
        },
      }).then((res) => {
        this.pending = false;
        this.$router.push(`/posts/${res.data.parent_board > 0
          ? this.boardNameList[res.data.parent_board - 1] : 'all'}/${res.data.id}`);
      })
      .catch(() => {
        this.pending = false;
      });
    },
    validateInput() {
      return this.board !== '' && this.title !== '' && this.content.trim() !== '';
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
  mounted() {
    this.updateBoardList();
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
  margin-top: 16px;
  padding: 5px 60px;
}

  .advertisement {
    background-color: #999999;
    color: #ffffff;
  }

  .label {
    color: #888888;
    font-weight: normal;
  }

  .select select {
    padding-left: 16px;
  }

  .input-field {
    padding-left: 16px;
  }

</style>
