<template>
  <div>
    <div>
      <div class="oneline">작성자</div>
      <div class="oneline">{{ boardOrHeading }}</div>
      <div class="oneline">제목</div>
      <div class="oneline">추천/반대</div>
      <div class="oneline">조회수</div>
      <div class="oneline">작성일자</div>
    </div>
      <div v-for="item in postItems" :key="item.id">
        <router-link v-if="!post || item.id !== post.id" :to="{ name: 'PostDetail', params: { board, post_id: item.id }, query: $route.query }">
          <post-item :board="board" :item="item" ></post-item>
        </router-link>
        <span v-else>
          <post-item :board="board" :item="item" ></post-item>
        </span>
      </div>
    <div>
      <a @click="updatePageAndFetch(1)">«</a>
      <a v-if="page > 10" @click="updatePageAndFetch(pageBase)">&lt;</a>
      <span v-else>&lt;</span>
      <span class="paging">
        <div v-for="iterPage in pageList" style="display: inline-block">
          <a v-if="iterPage != page" @click="updatePageAndFetch(iterPage)" :key="pageListIndex(iterPage)">{{ iterPage }}</a>
          <span v-else>{{ iterPage }}</span>
        </div>
      </span>
      <a v-if="pageBase + 10 < numPages" @click="updatePageAndFetch(pageBase + 11)">&gt;</a>
      <span v-else>&gt;</span>
      <a @click="updatePageAndFetch(numPages)">»</a>
    </div>
    <div>
      <select id="search_type" name="search_type">
        <option value="title" selected>제목</option>
        <option value="content">내용</option>
        <option value="created_by">글쓴이</option>
      </select>
      <input id="search_query" @keyup.enter="searchArticles()" type="text" />
      <button type="button" @click="searchArticles()">검색</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions, mapGetters } from 'vuex';
import PostItem from './PostItem';

export default {
  name: 'PostList',
  data() {
    return {
      postItems: [],
      numPages: 0,
    };
  },
  computed: {
    boardOrHeading() {
      if (this.board === 'all') return '게시판';
      return '말머리';
    },
    pageBase() {
      return (this.page - 1) - ((this.page - 1) % 10);
    },
    pageList() {
      const base = this.pageBase;
      const pageList = [];
      const pageListMax = (this.numPages < base + 10 ? this.numPages : base + 10);
      for (let i = base + 1; i <= pageListMax; i += 1) {
        pageList.push(i);
      }
      return pageList;
    },
    ...mapState([
      'post',
      'board',
      'page',
      'auth',
      'boardList',
    ]),
    ...mapGetters([
      'boardNameList',
    ]),
  },
  methods: {
    pageListIndex(page) {
      return this.pageList.indexOf(page) + 1;
    },
    ...mapActions([
      'fetchPost',
      'updateBoard',
      'updatePage',
      'updateBoardList',
    ]),
    refresh() {
      const condition = this.$route.query;
      const keys = Object.keys(condition);
      let url = '?';
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        url += `${key}=${condition[key]}&`;
      }
      if (this.board !== 'all') url += `parent_board=${this.boardNameList.indexOf(this.board) + 1}&`;
      url += `page=${this.page}`;

      axios.get(`http://13.124.216.27:8000/api/articles/${url}`, { auth: this.auth })
      .then((res) => {
        this.postItems = res.data.results;
        this.numPages = res.data.num_pages;
      })
      .catch(() => {
      });
    },
    searchArticles() {
      const searchTypeElement = document.getElementById('search_type');
      const searchType = searchTypeElement.options[searchTypeElement.selectedIndex].value;
      const searchInputElement = document.getElementById('search_query');
      const queryStr = searchInputElement.value;
      const query = {};

      if (searchType === 'title') query.title__contains = queryStr;
      else if (searchType === 'content') query.content__contains = queryStr;
      else if (searchType === 'created_by') query.created_by = queryStr;

      searchTypeElement.selectedIndex = 0;
      searchInputElement.value = '';

      this.fetchPost(undefined);
      this.updatePage(1);
      this.$router.push({
        name: 'PostList',
        params: { board: this.board },
        query,
      });
    },
    updatePageAndFetch(page) {
      this.updatePage(page);
      this.updateBoardList(this.refresh);
    },
  },
  components: {
    PostItem,
  },
  watch: {
    $route(to, from) {
      if (from.params.board !== to.params.board) {
        this.updateBoard(to.params.board);
        this.updatePage(1);
      }
      this.updateBoardList(this.refresh);
    },
  },
  mounted() {
    if (this.board !== this.$route.params.board) {
      this.updateBoard(this.$route.params.board);
      this.updatePage(1);
    }
    this.updateBoardList(this.refresh);
  },
};
</script>

<style>

</style>
