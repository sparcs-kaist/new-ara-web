<template>
  <div :class="{ 'like-button--enabled': votable, 'like-button--table': table }" class="like-button">
    <button
      :class="{ 'like-button__item--like-selected': liked }"
      class="like-button__item"
      @click="vote(true)"
    >
      <i v-if="liked" class="like-button__icon material-icons">thumb_up</i>
      <i v-else class="like-button__icon material-icons-outlined">thumb_up</i>
      {{ likedCount }}
    </button>

    <button
      :class="{ 'like-button__item--dislike-selected': disliked }"
      class="like-button__item"
      @click="vote(false)"
    >
      <i v-if="disliked" class="like-button__icon material-icons">thumb_down</i>
      <i v-else class="like-button__icon material-icons-outlined">thumb_down</i>
      {{ dislikedCount }}
    </button>
  </div>
</template>

<script>
import elideText from '@/utils/elideText'

const elideText3 = elideText(3)

export default {
  name: 'LikeButton',

  props: {
    item: {
      type: Object,
      required: true
    },
    votable: Boolean,
    elide: Boolean,
    table: Boolean,
    isSchool: Boolean,
    isMine: Boolean
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
    async vote (ballot) {
      if (!this.votable) {
        return
      }
      if (this.isSchool) {
        if (this.isMine) {
          this.$store.dispatch('dialog/toast', this.$t('nonvotable-myself'))
          return
        }

        if (this.liked) {
          this.$store.dispatch('dialog/toast', this.$t('agreed'))
          return
        }
        if (ballot) {
          const result = await this.$store.dispatch('dialog/confirmAgree', {
            message: this.$t('confirm-message'),
            agreeText: this.$t('agree-text')
          })
          if (!result) return
        }
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

<i18n>
ko:
  confirm-message: '해당 글에 동의하려면 아래에 <span style="color: #e15858;">동의합니다!</span>를 작성해주세요.<div style="color: #a9a9a9; font-size: 13px;">동의는 취소할 수 없으며 실명이 노출되지 않습니다.</div>'
  agree-text: '동의합니다!'
  agreed: '이미 동의한 글입니다. 동의는 취소할 수 없습니다.'
  nonvotable-myself: '본인 게시물에는 좋아요를 누를 수 없습니다!'
en:
  confirm-message: 'If you want to like this post, please enter <span style="color: #e15858;">I agree!</span><div style="color: #a9a9a9; font-size: 13px;">You could not cancel it and it is anonymous.</div>'
  agree-text: 'I agree!'
  agreed: 'You already agreed. You cannot cancel it'
  nonvotable-myself: 'You cannot vote for your post!'
</i18n>

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
