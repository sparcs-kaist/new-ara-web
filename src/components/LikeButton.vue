<template>
  <div class="like-button" :class="{ 'like-button--enabled': votable, 'like-button--table': table }">
    <button class="like-button__item" @click="vote(true)"
      :class="{ 'like-button__item--like-selected': liked }">

      <i class="like-button__icon material-icons" v-if="liked">thumb_up</i>
      <i class="like-button__icon material-icons-outlined" v-else>thumb_up</i>
      {{ likedCount }}
    </button>

    <button class="like-button__item" @click="vote(false)"
      :class="{ 'like-button__item--dislike-selected': disliked }">

      <i class="like-button__icon material-icons" v-if="disliked">thumb_down</i>
      <i class="like-button__icon material-icons-outlined" v-else>thumb_down</i>
      {{ dislikedCount }}
    </button>
  </div>
</template>

<script>
import elideText from '@/utils/elideText'

const elideText3 = elideText(3)

export default {
  props: {
    item: {
      required: true
    },

    votable: {
      type: Boolean
    },

    elide: {
      type: Boolean
    },

    table: {
      type: Boolean
    }
  },

  computed: {
    // my_vote can be true, false, or null
    liked () { return this.item.my_vote === true },
    disliked () { return this.item.my_vote === false },
    likedCount () {
      return this.elideText(this.item.positive_vote_count)
    },
    dislikedCount () {
      return this.elideText(this.item.negative_vote_count)
    }
  },

  methods: {
    vote (ballot) {
      if (!this.votable) {
        return
      }

      const myVote = this.item.my_vote === ballot
        ? 'vote_cancel'
        : (ballot ? 'vote_positive' : 'vote_negative')

      this.$emit('vote', { id: this.item.id, vote: myVote })
    },

    elideText (text) {
      if (!this.elide) {
        return text
      }

      return elideText3(text)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/theme.scss";

  .like-button {
    display: inline-flex;
    outline: none;

    &--enabled &__item {
      cursor: pointer;

      &:hover {
        color: var(--grey-700);
      }

      &--selected:hover {
        color: var(--theme-500);
      }
    }

    &--table &__item {
      justify-content: flex-start;
      min-width: 4.5rem;
      margin: 0 5px;

      @include breakPoint(mid) {
        min-width: initial;
      }
    }

    &__item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      color: var(--grey-600);
      font-size: inherit;
      margin: 0 6px;
      flex: 1;
      white-space: nowrap;
      transition: all var(--duration) ease;

      &--like-selected {
        color: var(--theme-400);
      }

      &--dislike-selected {
        color: #535cac
      }

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        color: var(--grey-600);
      }
    }

    &__icon {
      font-size: 20px;
      margin-right: .3rem;
    }
  }
</style>
