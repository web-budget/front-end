<template>
  <div>
    <h1 class="mb-4">{{ $t('login.title') }}</h1>
    <validation-observer ref="observer" v-slot="{ passes, invalid }">
      <validation-provider
        rules="required"
        v-slot="{ errors, valid }"
        :name="$t('login.form.username')" >
        <b-field :type="{ 'is-danger': errors[0], 'is-success': valid }">
          <b-input
            type="text"
            icon="user"
            class="mb-3"
            tabindex="1"
            icon-pack="fas"
            v-model="credential.username"
            :placeholder="$t('login.form.username')"/>
        </b-field>
      </validation-provider>
      <validation-provider
        rules="required"
        v-slot="{ errors, valid }"
        :name="$t('login.form.password')">
        <b-field :type="{ 'is-danger': errors[0], 'is-success': valid }">
          <b-input
            icon="lock"
            tabindex="2"
            class="mb-5"
            type="password"
            icon-pack="fas"
            password-reveal
            v-model="credential.password"
            @keypress.native.enter="doLogin"
            :placeholder="$t('login.form.password')"/>
        </b-field>
      </validation-provider>
      <router-link :to="{ name: 'recover-password' }">
        {{ $t('login.actions.recover-password') }}
      </router-link>
      <b-button
        tabindex="3"
        type="is-primary"
        :loading="loading"
        :disabled="invalid || loading"
        @click.prevent="passes(doLogin)"
        class="is-block is-fullwidth mt-4">
        {{ $t('login.actions.login') }}
      </b-button>
    </validation-observer>
  </div>
</template>

<script>
import Credential from '@/models/administration/credential.js'

import AuthenticationClient from '@/clients/authentication.client.js'

import LoadingStateMixin from '@/components/mixins/loading-state.mixin.js'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'login',
  mixins: [
    LoadingStateMixin
  ],
  computed: {
    ...mapGetters('userSession', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('userSession', ['createSession']),
    async doLogin() {
      try {
        this.loadingStart()
        const response = await this.authenticationClient.login(this.credential)
        this.createSession(response.data)
        this.$router.push(this.$router.currentRoute.params.redirect || { name: 'home' })
      } catch (error) {
        console.log(error) // FIXME handle this properly
      } finally {
        this.loadingEnd()
      }
    }
  },
  data() {
    return {
      authenticationClient: null,
      credential: new Credential()
    }
  },
  created() {
    this.authenticationClient = new AuthenticationClient()
  },
  mounted() {
    if (this.isLoggedIn) {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
