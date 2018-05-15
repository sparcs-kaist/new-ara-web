<template>
  <div class = "setting-container">
    <section class = "section">
      <h1 class="title">설정</h1>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"> 서명 </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input v-model="signature" class="input" type="text" placeholder="서명">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"> 닉네임 </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input v-model="nickname" class="input" type="text" placeholder="닉네임">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"> 성인/음란성 보기 </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input v-model="see_sexual" type="checkbox">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"> 정치/사회성 보기 </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input v-model="see_social" type="checkbox">
            </div>
          </div>

        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"> 프로필 </label>
          <img :src="picture" alt="프로필 사진">
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input type="file" @change="imageUploadHandler " />
            </div>
          </div>
        </div>
      </div>
      <button :class="{'is-loading': pending}" @click="postProfileHandler" id="button-post-create" class="button is-primary is-pulled-right">수정하기</button>
      <div class="is-clearfix"></div>
    </section>
  </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      picture: null,
      newpictuer: null,
      nickname: '',
      signature: '',
      see_sexual: '',
      see_social: '',
      pending: false,
      userid: 0,
    };
  },
  computed: {
    ...mapState([
      'apiUrl',
      'auth',
    ]),
    ...mapGetters([
      'boardNameList',
    ]),
  },
  methods: {
    postProfileHandler() {
      this.pending = true;
      const formData = new FormData();
      if (this.newpicture) {
        formData.append('picture', this.newpicture);
      }
      formData.append('nickname', this.nickname);
      formData.append('signature', this.signature);
      formData.append('see_sexual', this.see_sexual);
      formData.append('see_social', this.see_social);
      this.$axios({
        url: `${this.apiUrl}/api/user_profiles/${this.userid}/`,
        method: 'PATCH',
        // data: {
        //   picture: this.picture,
        //   nickname: this.nickname,
        //   signature: this.signature,
        //   see_sexual: this.see_sexual,
        //   see_social: this.see_social,
        // },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      }).then((res) => {
        this.pending = false;
        // floating
        console.log(res);
      })
      .catch(() => {
        this.pending = false;
      });
    },
    imageUploadHandler(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.newpicture = files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        this.picture = event.target.result;
      };
      reader.readAsDataURL(files[0]);
    },
  },
  mounted() {
    this.userid = 3; // TODO: need to fix as real user_id
    this.$axios({
      url: `${this.apiUrl}/api/user_profiles/${this.userid}`,
      method: 'GET',
    }).then((res) => {
      this.nickname = res.data.nickname;
      this.signature = res.data.signature;
      this.see_sexual = res.data.see_sexual;
      this.see_social = res.data.see_social;
      this.picture = res.data.picture;
    })
    .catch((err) => {
      console.log(err);
    });
  },
};
</script>

<style>
@media screen and (max-width: 1023px) {
  .quillWrapper {
    border-top: 1px solid #ccc;
  }
}

#button-post-create {
  margin-top: 1.5em;
}

</style>
