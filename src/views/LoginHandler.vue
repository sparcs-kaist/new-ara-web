<template>
  <div/>
</template>

<script>
export default {
  beforeCreate() {
    localStorage.setItem('JWT', this.$route.query.jwt);
    this.$router.push('/');
  },
};
</script>