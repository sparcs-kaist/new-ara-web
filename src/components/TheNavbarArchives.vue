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
  archive: '담아둔 글'

en:
  archive: 'Bookmarks'
</i18n>
