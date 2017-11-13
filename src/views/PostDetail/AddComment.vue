<template>
  <div>
    <section class="section">
      <h1 class="title">댓글쓰기</h1>
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
              <vue-editor/>
            </div>
          </div>
        </div>
      </div>
      <button :class="{'is-loading': pending}" @click="postArticleHandler" id="button-post-create"class="button is-primary is-pulled-right">게시하기</button>
      <div class="is-clearfix"></div>
    </section>
    <!--본문-->
    <!--익명-->
    <!--서명사용-->
    <!--첨부파일-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content: '',
        isAnonymous: false,
        useSignature: false,
        attachment: '',
      };
    },
  };
</script>

<style scoped>

</style>
