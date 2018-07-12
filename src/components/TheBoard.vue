<template>
  <div class="board">
    <div v-if="currentQuery">
      검색어: {{ currentQuery }}
    </div>
    <BoardPaginator
      :numPages="board.num_pages"
      :currentPage="board.current"/>
    <div class="field has-addons">
      <div class="control">
        <input
          v-model="query"
          class="input"
          type="text"
          placeholder="글 검색"
        />
      </div>
      <div class="control">
        <router-link
          :to="{ query: { query: this.query } }"
          class="button is-link">
          검색
        </router-link>
      </div>
    </div>
    <div v-for="article in board.results"
      :key="article.id">
      <router-link
        :to="{ name: 'post', params: { postId: article.id } }">
        {{ article.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
import BoardPaginator from '@/components/BoardPaginator'

export default {
  name: 'the-board',
  props: {
    board: { required: true }
  },
  data () {
    return { query: '' }
  },
  computed: {
    currentQuery () {
      return this.$route.query && this.$route.query.query
    }
  },
  watch: {
    $route () {
      this.query = ''
    }
  },
  components: { BoardPaginator }
}
</script>

<style>

</style>
