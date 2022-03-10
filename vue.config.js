const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    i18n: {
      locale: 'pt_BR',
      fallbackLocale: 'en_US',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  }
})
