<template>
  <main class="column">
    <div class="columns is-multiline">
      <div class="container">
        <div class="notification has-text-centered">
          <h1 class="title is-2">{{ $t('errors.404.page-not-found') }}</h1>
          <h1 class="subtitle is-4 mt-4">
            <b-button
              type="is-ghost"
              @click="goHome">
              {{ $t('errors.404.go-to-home') }}
            </b-button>
          </h1>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'http-404',
  methods: {
    goHome() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
