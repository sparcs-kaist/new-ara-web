<template>
  <div>
    <div v-if="!error">
      <p>
        <router-link v-for="board in board_list" :to="`/posts/${board}/1`" :key="board_list_index(board)"><h1>{{ board }}</h1></router-link>
      </p>
      <div>
        <div class="oneline">
          작성자
        </div>
        <div class="oneline">
          {{ board_or_heading }}
        </div>
        <div class="oneline">
          제목
        </div>
        <div class="oneline">
          추천/반대
        </div>
        <div class="oneline">
          조회수
        </div>
        <div class="oneline">
          작성일자
        </div>
      </div>
      <post-item v-for="item in post_items" :board="board" :item="item" :key="item.id"></post-item>
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
import PostItem from './PostItem';

export default {
  name: 'PostList',
  data() {
    return {
      board: 'all',
      board_list: ['all', 'talk', 'love', 'play'],
      curr_page: 0,
      page_num: 0,
      post_items: [],
      error: false,
    };
  },
  computed: {
    board_or_heading() {
      if (this.board === 'all') return '게시판';
      return '말머리';
    },
    page_list() {
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
      url += `page=${this.curr_page}`;

      axios.get(`http://13.124.216.27:8000/api/articles/${url}`, {
        auth: {
          username: 'jsh56son',
          password: 'asdfasdf1234',
        },
      })
      .then((req) => {
        this.error = false;
        this.post_items = req.data.results;
        this.page_num = req.num_pages;
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
    PostItem,
  },
  watch: {
    $route(to) {
      this.board = to.params.board;
      this.curr_page = to.params.page;

      this.refresh({});
    },
  },
  mounted() {
    this.board = this.$route.params.board;
    this.curr_page = this.$route.params.page;

    this.refresh({});
  },
};
</script>

<style>

</style>
