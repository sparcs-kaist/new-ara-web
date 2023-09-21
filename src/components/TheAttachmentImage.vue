<template>
  <div class="image-container">
    <div class="dropdown is-hoverable is-up">
      <div class="dropdown-trigger material-icons">
        drag_indicator
      </div>
      <div class="dropdown-menu">
        <div class="dropdown-content">
          <div
            v-for="(size, name) in sizes"
            :key="name"
            :class="{ 'selected': width === size }"
            class="dropdown-item"
            @click="resize(size)"
          >
            {{ $t(name) }}
          </div>
        </div>
      </div>
    </div>

    <img
      :src="src"
      :alt="alt"
      :title="title"
      :width="width"
      class="image"
      @error="imageLoadError"
    >
  </div>
</template>

<script>
export default {
  name: 'TheAttachmentImage',

  props: {
    node: Object,
    updateAttrs: Function,
    view: Object,
    options: Object
  },

  data () {
    return {
      sizes: {
        small: 250,
        mid: 500,
        large: 1000
      }
    }
  },

  computed: {
    src () {
      return this.node.attrs.src
    },
    alt () {
      return this.node.attrs.alt
    },
    title () {
      return this.node.attrs.title
    },
    width () {
      return this.node.attrs.width
    },
    'data-attachment': {
      get () {
        return this.node.attrs['data-attachment']
      }
    }
  },

  methods: {
    imageLoadError () {
      if (this.options.errorCallback) {
        this.options.errorCallback()
      }
    },
    resize (width) {
      this.updateAttrs({ width })
    }
  }
}
</script>

<i18n>
ko:
  small: '작게'
  mid: '중간'
  large: '크게'
en:
  small: 'small'
  mid: 'mid'
  large: 'large'
</i18n>

<style lang="scss" scoped>
.image-container {
  display: flex;
  flex-flow: row;
  margin-top: 10px;
}

.dropdown {
  &-trigger {
    width: 25px;
    height: 25px;
    margin-left: -25px;
  }

  &-content {
    display: flex;
    flex-flow: row;
    transform: translate(0, 45px);
    justify-content: space-around;
    width: 170px;
    cursor: pointer;
    margin: 0;
  }

  &-menu {
    margin: 0;
  }

  &-item {
    font-size: 15px;
    width: 50px;
    padding: 5px;
    text-align: center;
    margin: 0;
  }
}

.selected {
  font-weight: bold;
  color: black;
}
</style>
