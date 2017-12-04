<template>
  <div class="container">
    <div class="columns">
      <div class="column is-2 placeholder"></div>
      <div class="column is-8">
        <footer>
          <hr>
          <p class="content text-has-centered">
            아라 by <a href="https://sparcs.org">SPARCS</a><br>
            since 2017
          </p>
        </footer>
      </div>
      <div class="column is-2 placeholder"></div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
  footer {
    text-align: center;
    font-size: 14px;
  }

  @media (min-width: 769px) {
    footer {
      padding: 2rem 0;
    }
  }

  @media (max-width: 768px) {
    footer {
      padding: 2rem 10px;
    }

    .placeholder {
      padding: 0;
    }
  }
</style>
