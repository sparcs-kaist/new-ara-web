<template>
  <div class="like-button" :class="{ 'like-button--enabled': votable }">
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

      votable: {
        type: Boolean
      }
    },

    computed: {
      // my_vote can be true, false, or null
      liked() { return this.item.my_vote === true },
      disliked() { return this.item.my_vote === false },
      likedCount() { return this.item.positive_vote_count },
      dislikedCount() { return this.item.negative_vote_count }
    },

    methods: {
      vote(ballot) {
        if(!this.votable)
          return

        const myVote = this.item.my_vote === ballot ?
          'vote_cancel' :
          (ballot ? 'vote_positive' : 'vote_negative')

        this.$emit('vote', { id: this.item.id, vote: myVote })
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
      color: var(--grey-700);
    }

    &__item {
      display: inline-flex;
      align-items: center;
      border: none;
      background: transparent;
      color: var(--grey-600);
      flex: 1;
      white-space: nowrap;

      &--selected {
        color: var(--theme-400);
      }

      &:not(:last-child) {
        margin-right: 5px;
      }

      &:hover {
        color: var(--grey-600);
      }
    }

    &__icon {
      font-size: 1rem;
      margin-right: .3rem;
    }
  }
</style>
