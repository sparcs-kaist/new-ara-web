<template>
  <div class="board">
    <div v-if="currentQuery">
      검색어: {{ currentQuery }}
    </div>
    <router-link :to="{ name: 'write' }"> 글 작성 </router-link>
    <!-- query: { boardSlug: '' } -->
    <TheBoardPaginator
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
          :to="{
            query: {
              query: this.query
            }
          }"
          class="button is-link">
          검색
        </router-link>
      </div>
    </div>
    <div v-for="article in board.results"
      :key="article.id">
      <router-link
        :to="{
          name: 'post',
          params: {
            postId: article.id
          }
        }">
        {{ article.title }}
      </router-link>
      <span> by </span>
      <router-link
        :to="{
          name: 'user',
          params: {
            username: article.created_by
          }
        }">
        {{ article.created_by }}
      </router-link>
    </div>
  </div>
</template>

<script>
import TheBoardPaginator from '@/components/TheBoardPaginator.vue'

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
      // @TODO: 요것도 아래와 같은 의미로 prop으로 받아야될듯..?
      return this.$route.query && this.$route.query.query
    }
  },
  // @TODO: components/ 아래의 컴퍼넌트는 $route에 의존적이지 않아야 한다.
  // 목표는 검색 이후에 navigation을 하면 검색어가 사라지게 하는 것.
  // 다른 관점에서 봐서 부모가 현재 검색어를 prop으로 내려주면 해결되는 듯?
  // watch: {
  //   $route () {
  //     this.query = ''
  //   }
  // },
  components: { TheBoardPaginator }
}
</script>

<style>

</style>
