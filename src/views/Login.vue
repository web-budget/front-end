<template>
  <div>
    <h1>Login</h1>
    <input type="text" v-model="credential.username">
    <input type="password" v-model="credential.password">
    <button @click="doLogin">Login</button>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

import { Credential } from '@/models/authentication/credential'
import { AuthenticationService } from '@/services/authentication.service'

export default class Login extends Vue {

  private credential!: Credential
  private authenticationService!: AuthenticationService

  created(): void {
    this.credential = new Credential()
    this.authenticationService = new AuthenticationService()
  }

  private doLogin(): void {
    this.authenticationService.authenticate(this.credential)
  }
}
</script>
