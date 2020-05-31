module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'ko',
      fallbackLocale: 'ko',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')
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
