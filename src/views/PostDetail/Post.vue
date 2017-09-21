<template>
  <div>
    <div v-if="error">
      Database error
    </div>
    <h1>{{ post_item.title }}</h1>
    <p>작성자 : {{ post_item.created_by }}</p>
    <p>{{ post_item.content }}</p>
    <post-action :isArticle="true"></post-action>
  </div>
</template>

<script>
import axios from 'axios';
import PostAction from './PostAction';

export default {
  props: ['post_id'],
  data() {
    return {
      error: false,
      msg: `message ${this.post_id}`,
      post_item: {},
    };
  },
  components: {
    PostAction,
  },
  mounted() {
    axios.get(`http://13.124.216.27:8000/api/articles/${this.post_id}/`, {
      auth: {
        username: 'jsh56son',
        password: 'asdfasdf1234',
      },
    })
    .then((res) => {
      this.error = false;
      this.post_item = res.data;
    })
    .catch(() => {
      this.error = true;
    });
  },
};
</script>

<style>

</style>
