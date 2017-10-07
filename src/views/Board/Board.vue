<template>
  <div>
    <div v-if="!error">
      <p>
        <router-link v-for="board in board_list" :to="`/posts/${board}/1`" :key="board_list_index(board)"><h1>{{ board }}</h1></router-link>
      </p>
      <post-detail v-if="post_id" :post_id="post_id"></post-detail>
      <post-list :board="board" :page="currPage" :post_items="post_items"></post-list>
      <div>
        <router-link :to="new_url(1)">«</router-link>
        <router-link v-if="currPage > 10" :to="new_url(page_base)">&lt;</router-link>
        <span v-else>&lt;</span>
        <span class="paging">
          <div v-for="page in page_list" style="display: inline-block">
            <router-link v-if="page != currPage" :to="new_url(page)" :key="page_list_index(page)">{{ page }}</router-link>
            <span v-else>{{ page }}</span>
          </div>
        </span>
        <router-link v-if="page_base + 10 < num_pages" :to="new_url(page_base + 11)">&lt;</router-link>
        <span v-else>&gt;</span>
        <router-link :to="new_url(num_pages)">»</router-link>
      </div>
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
      currPage: 0,
      num_pages: 0,
      post_items: [],
      post_id: 0,
      error: false,
    };
  },
  computed: {
    page_base() {
      return (this.currPage - 1) - ((this.currPage - 1) % 10);
    },
    page_list() {
      // TODO: return correct page list
      const base = this.page_base;
      const pageList = [];
      const pageListMax = (this.num_pages < base + 10 ? this.num_pages : base + 10);
      for (let i = base + 1; i <= pageListMax; i += 10) {
        pageList.push(i);
      }
      return pageList;
    },
  },
  methods: {
    board_list_index(board) {
      return this.board_list.indexOf(board);
    },
    page_list_index(page) {
      return this.page_list.indexOf(page) + 1;
    },
    new_url(page) {
      if (!this.post_id) return `/posts/${this.board}/${page}`;
      return `/posts/${this.board}/${page}/${this.post_id}`;
    },
    refresh(condition) {
      let url = '?';
      const keys = Object.keys(condition);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        url += `${key}=${condition[key]}&`;
      }
      if (this.board !== 'all') url += `parent_board=${this.board_list_index(this.board)}&`;
      url += `page=${this.currPage}`;

      axios.get(`http://13.124.216.27:8000/api/articles/${url}`, {
        auth: {
          username: 'jsh56son',
          password: 'asdfasdf1234',
        },
      })
      .then((res) => {
        this.error = false;
        this.post_items = res.data.results;
        this.num_pages = res.data.num_pages;
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
      this.currPage = to.params.page;
      this.post_id = to.params.post_id;

      this.refresh({});
    },
  },
  mounted() {
    this.board = this.$route.params.board;
    this.currPage = this.$route.params.page;
    this.post_id = this.$route.params.post_id;

    this.refresh({});
  },
};
</script>

<style>

</style>
