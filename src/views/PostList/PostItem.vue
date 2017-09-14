<template>
  <div>
    <div class="oneline">
      {{ item.created_by }}
    </div>
    <div class="oneline">
      {{ heading }}
    </div>
    <div class="oneline">
      {{ item.title }}
    </div>
    <div class="oneline">
      {{ item.positive_vote_count }}/{{ item.negative_vote_count }}
    </div>
    <div class="oneline">
      {{ item.hit_count }}
    </div>
    <div class="oneline">
      {{ item.created_at }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['board', 'item'],
  computed: {
    heading() {
      if (this.board === 'all') return this.item.parent_board.ko_name;
      if (this.item.parent_topic !== null) return this.item.parent_topic.ko_name;
      return '';
    },
  },
};
</script>

<style>
  .oneline {
    display: inline-block;
  }
</style>
