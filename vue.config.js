module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'ko',
      fallbackLocale: 'ko',
      localeDir: 'locales',
      enableInSFC: true
    }
  },

  chainWebpack (config) {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()
      .use('yaml')
      .loader('yaml-loader')
      .end()

    config.module
      .rule('yaml')
      .test(/\.yaml$/)
      .use('json-loader')
      .loader('json-loader')
      .end()
      .use('yaml-loader')
      .loader('yaml-loader')
      .end()

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()

    svgRule
      .oneOf('vue-svg-loader')
      .resourceQuery(/inline/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({ svgo: false })
      .end()
      .end()
      .oneOf('file-loader')
      .use('file-loader')
      .loader('file-loader')
      .options({ name: 'img/[name].[hash:8].[ext]' })
      .end()
      .end()

    // For Safari hot reloading fix 😥
    // See https://github.com/vuejs/vue-cli/issues/1132 for detail
    if (process.env.NODE_ENV === 'development') {
      config
        .output
        .filename('[name].[hash].js')
        .end()
    }
  },

  productionSourceMap: false
}
