<template>
  <div class="columns">
    <div class="column is-2 placeholder"></div>
    <div class="column is-1">{{ item.created_by }}</div>
    <div class="column is-1">{{ heading }}</div>
    <div class="column is-3">{{ item.title }}</div>
    <div class="column is-1">
      <span class="vote-up">+{{ item.positive_vote_count }}</span>
      <a class="vote-down">-{{ item.negative_vote_count }}</a>
    </div>
    <!-- <div class="column is-1">{{ item.hit_count }}</div> -->
    <div class="column is-1">{{ item.created_at }}</div>
    <div class="column is-2 placeholder"></div>
  </div>
</template>

<script>
import timeago from 'timeago';

export default {
  props: ['board', 'item'],
  computed: {
    heading() {
      if (this.board === 'all') return this.item.parent_board.en_name;
      if (this.item.parent_topic !== null) return this.item.parent_topic.en_name;
      return '';
    },
  },
  methods: {
    formatTime(rawdate) {
      return timeago.format(rawdate);
    },
  },
};
</script>

<style scoped>
.vote-up {
  font-weight: bold;
}
.vote-down {
  font-weight: bold;
  color: darkcyan;
}
</style>
