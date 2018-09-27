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
            .loader('@kazupon/vue-i18n-loader')
            .end()
          .use('yaml')
            .loader('yaml-loader')
            .end()
    config.module
      .rule("yaml")
        .test(/\.yaml$/)
          .use("json-loader")
            .loader("json-loader")
            .end()
          .use("yaml-loader")
            .loader("yaml-loader")
  }
}
