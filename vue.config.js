module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'pt_BR',
      fallbackLocale: 'en_US',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8085',
        ws: true,
        changeOrigin: true
      },
      '/authentication': {
        target: 'http://localhost:8085',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
