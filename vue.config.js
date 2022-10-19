const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    i18n: {
      locale: 'pt_BR',
      fallbackLocale: 'en_US',
      localeDir: 'locales',
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8085',
        ws: true,
        changeOrigin: true
      },
      '/token': {
        target: 'http://localhost:8085',
        ws: true,
        changeOrigin: true
      }
    }
  }
})
