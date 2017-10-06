<template>
  <div>
    <div v-if="!error">
      <p>
        <router-link v-for="board in board_list" :to="`/posts/${board}/1`" :key="board_list_index(board)"><h1>{{ board }}</h1></router-link>
      </p>
      <post-detail v-if="post_id" :post_id="post_id"></post-detail>
      <post-list :board="board" :page="page" :post_items="post_items"></post-list>
      <p class="paging">
        <router-link v-for="page in page_list" :to="`/posts/${board}/${page}`" :key="page_list_index(page)">{{ page }}</router-link>
      </p>
      <div>
        <select id="search_type" name="search_type">
          <option value="title" selected>제목</option>
          <option value="content">내용</option>
          <option value="created_by">글쓴이</option>
        </select>
        <input id="search_query" type="text" />
        <button type="button" @click="searchArticles()">검색</button>
      </div>
    </div>
    <div v-else>
      Database error
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PostDetail from './../PostDetail/PostDetail';
import PostList from './../PostList/PostList';

export default {
  name: 'Board',
  data() {
    return {
      board: 'all',
      board_list: ['all', 'talk', 'love', 'play'],
      page: 0,
      page_num: 0,
      post_items: [],
      post_id: 0,
      error: false,
    };
  },
  computed: {
    page_list() {
      // TODO: return correct page list
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    },
  },
  methods: {
    board_list_index(board) {
      return this.board_list.indexOf(board);
    },
    page_list_index(page) {
      return this.page_list.indexOf(page) + 1;
    },
    refresh(condition) {
      let url = '?';
      const keys = Object.keys(condition);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        url += `${key}=${condition[key]}&`;
      }
      if (this.board !== 'all') url += `parent_board=${this.board_list_index(this.board)}&`;
      url += `page=${this.page}`;

      axios.get(`http://13.124.216.27:8000/api/articles/${url}`, {
        auth: {
          username: 'jsh56son',
          password: 'asdfasdf1234',
        },
      })
      .then((res) => {
        this.error = false;
        this.post_items = res.data.results;
        this.page_num = res.num_pages;
      })
      .catch(() => {
        this.error = true;
      });
    },
    searchArticles() {
      const searchTypeElement = document.getElementById('search_type');
      const searchType = searchTypeElement.options[searchTypeElement.selectedIndex].value;
      const searchInputElement = document.getElementById('search_query');
      const queryStr = searchInputElement.value;
      const condition = {};

      if (searchType === 'title') condition.title__contains = queryStr;
      else if (searchType === 'content') condition.content__contains = queryStr;
      else if (searchType === 'created_by') condition.created_by = queryStr;

      this.refresh(condition);
      searchTypeElement.selectedIndex = 0;
      searchInputElement.value = '';
    },
  },
  components: {
    PostDetail,
    PostList,
  },
  watch: {
    $route(to) {
      this.board = to.params.board;
      this.page = to.params.page;
      this.post_id = to.params.post_id;

      this.refresh({});
    },
  },
  mounted() {
    this.board = this.$route.params.board;
    this.page = this.$route.params.page;
    this.post_id = this.$route.params.post_id;

    this.refresh({});
  },
};
</script>

<style>

</style>
