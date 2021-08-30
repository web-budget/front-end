<template>
  <main class="column">
    <div class="columns is-multiline">
      <div class="container">
        <div class="notification has-text-centered">
          <h1 class="title is-2">{{ $t('errors.401.session-expired') }}</h1>
          <h1 class="subtitle is-4 mt-4">
            <b-button
              type="is-ghost"
              @click="doLogout">
              {{ $t('errors.401.go-to-login') }}
            </b-button>
          </h1>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'http-401',
  methods: {
    ...mapActions('userSession', ['destroySession']),
    doLogout() {
      this.destroySession()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
