<template>
  <div
    :class="{
      'searchbar--small': small,
      'searchbar--fullwidth': fullwidth,
      'searchbar--long': long
    }"
    class="searchbar field"
  >
    <form class="control has-icons-right" @submit.prevent="search">
      <input
        v-model="searchText"
        class="input is-medium"
        name="query"
        type="text"
      >
      <button class="icon is-small is-right" type="submit">
        <i class="material-icons">search</i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',

  props: {
    searchable: Boolean,
    small: Boolean,
    fullwidth: Boolean,
    long: Boolean
  },

  data () {
    return { searchText: '' }
  },

  methods: {
    search () {
      if (!this.searchable) {
        this.$router.push({ name: 'board', query: { query: this.searchText } })
        return
      }
      // ...this.$route.query removed because of 404 error in search.
      this.$router.push({ query: { ...this.$route.query, query: this.searchText, page: undefined } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/theme.scss";

.searchbar {
  button.icon {
    cursor: pointer;
    background: transparent;
    border: none;
    pointer-events: auto;
  }

  @include breakPoint(min) {
    .input {
      height: 2.5rem;
      font-size: .8rem;
    }
  }

  @include breakPoint(mobile) {
    .input {
      height: 2.25rem;
      font-size: .8rem;
    }
  }

  &--small .input {
    height: 2.5rem;
    font-size: .8rem;
  }

  &--long .input {
    height: 2.5rem;
    width: 20rem;
    font-size: .8rem;
  }

  &--fullwidth form {
    width: 100%;
    margin: 0 20px;
  }
}
</style>
