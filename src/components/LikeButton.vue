<template>
  <div class="like-button" :class="{ 'like-button--enabled': voteEnabled }">
    <button class="like-button__item" @click="vote(true)"
      :class="{ 'like-button__item--selected': liked }">

      <i class="like-button__icon material-icons">thumb_up</i>
      {{ likedCount }}
    </button>

    <button class="like-button__item" @click="vote(false)"
      :class="{ 'like-button__item--selected': disliked }">

      <i class="like-button__icon material-icons">thumb_down</i>
      {{ dislikedCount }}
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        required: true
      },

      voteFn: {
        type: Function
      }
    },

    computed: {
      liked() { return this.item.my_vote === true },
      disliked() { return this.item.my_vote === false },
      likedCount() { return this.item.positive_vote_count },
      dislikedCount() { return this.item.negative_vote_count },
      voteEnabled() { return !!this.voteFn }
    },

    methods: {
      vote(ballot) {
        if(!this.voteFn)
          return

        const myVote = this.item.my_vote === ballot ?
          'vote_cancel' :
          (ballot ? 'vote_positive' : 'vote_negative')

        this.voteFn(this.item.id, myVote)
        this.$emit('vote')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .like-button {
    display: flex;
    outline: none;

    &--enabled {
      cursor: pointer;
    }

    &--enabled &__item:hover {
      color: #303030;
    }

    &__item {
      display: inline-flex;
      align-items: center;
      border: none;
      background: transparent;
      color: #666666;
      flex: 1;
      white-space: nowrap;

      &--selected {
        color: var(--theme-red);
      }

      &:not(:last-child) {
        margin-right: 5px;
      }

      &:hover {
        color: #666666;
      }
    }

    &__icon {
      font-size: 1rem;
      margin-right: .3rem;
    }
  }
</style>
