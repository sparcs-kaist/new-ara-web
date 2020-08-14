<template>
  <router-link :to="{ name: 'archive' }">
    {{ $t('archive') }}
  </router-link>
</template>

<script>
export default {
  name: 'the-navbar-archives'
}
</script>

<i18n>
ko:
  archive: '담아두기'

en:
  archive: 'Archive'
</i18n>
