<template>
  <div>
    <table class="table centerh">
      <tr>
        <th>.</th>
        <th class="w-102">{{ boardOrHeading }}</th>
        <th class="w-313">제목</th>
        <th class="w-102">작성자</th>
        <th class="w-60">추천</th>
        <th class="w-60">조회</th>
        <th class="w-102">시간</th>
      </tr>
      <post-item v-for="item in postItems" :key="item.id" :board="board" :item="item" :post="post"></post-item>
    </table>
    <div class="centerh">
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
    <div class="centerh">
      <select id="search_type" name="search_type">
        <option value="title" selected>제목</option>
        <option value="content">내용</option>
        <option value="created_by">글쓴이</option>
      </select>
      <input id="search_query" @keyup.enter="searchArticles()" type="text" />
      <button type="button" @click="searchArticles()">검색</button>
    </div>

    <div class="field has-addons centerh">
      <p class="control">
        <span class="select">
          <select v-model="searchType">
            <option value="title" selected>제목</option>
            <option value="content">내용</option>
            <option value="created_by">글쓴이</option>
          </select>
        </span>
      </p>
      <div class="control">
        <input class="input" type="text" placeholder="검색" v-model="searchText" v-on:input="typing" @keyup.enter="search()" />
      </div>
      <div class="control">
        <a class="button is-info" @click="search()">검색</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import PostItem from './PostItem';

export default {
  name: 'PostList',
  data() {
    return {
      postItems: [],
      numPages: 0,
      searchType: 'title',
      searchText: '',
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
      'apiUrl',
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

      this.$axios.get(`${this.apiUrl}/api/articles/${url}`)
        .then((res) => {
          this.postItems = res.data.results;
          this.numPages = res.data.num_pages;
        })
        .catch(() => {
        });
    },
    typing(e) {
      this.searchText = e.target.value;
    },
    search() {
      const query = {};

      if (this.searchType === 'title') query.title__contains = this.searchText;
      else if (this.searchType === 'content') query.content__contains = this.searchText;
      else if (this.searchType === 'created_by') query.created_by = this.searchText;
      this.searchText = '';

      this.fetchPost(undefined);
      this.updatePage(1);
      this.$router.push({
        name: 'PostList',
        params: { board: this.board },
        query,
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
    async updatePageAndFetch(page) {
      this.updatePage(page);
      await this.updateBoardList();
      this.refresh();
    },
  },
  components: {
    PostItem,
  },
  watch: {
    async $route(to, from) {
      if (from.params.board !== to.params.board) {
        this.updateBoard(to.params.board);
        this.updatePage(1);
      }
      await this.updateBoardList();
      this.refresh();
    },
  },
  async mounted() {
    if (this.board !== this.$route.params.board) {
      this.updateBoard(this.$route.params.board);
      this.updatePage(1);
    }
    await this.updateBoardList();
    this.refresh();
  },
};
</script>

<style>
.oneline { display: inline-block;}
.bold { font-weight: 800;}
.w-35 { width:35px;}
.w-60 { width: 60px;}
.w-102 { width: 102px;}
.w-313 { width: 313px;}
.w-780 { width: 780px;}
.centerh { margin: 0 auto; text-align: center;}
</style>
