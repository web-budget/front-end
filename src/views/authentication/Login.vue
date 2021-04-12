<template>
  <div>
    <h1 class="mb-4">{{ $t('login.title') }}</h1>
    <validation-observer ref="observer" v-slot="{ passes, invalid }">
      <validation-provider
        rules="required"
        v-slot="{ errors, valid }"
        :name="$t('login.form.email')" >
        <b-field :type="{ 'is-danger': errors[0], 'is-success': valid }">
          <b-input
            type="text"
            icon="user"
            class="mb-3"
            tabindex="1"
            icon-pack="fas"
            v-model="credential.email"
            :placeholder="$t('login.form.email')"/>
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
import Credential from '@/models/credential.js'

export default {
  name: 'login',
  methods: {
    async doLogin() {
      console.log(this.credential)
    }
  },
  data() {
    return {
      loading: false,
      credential: new Credential()
    }
  }
}
</script>
