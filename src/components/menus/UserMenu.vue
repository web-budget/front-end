<template>
  <b-dropdown position="is-bottom-left" append-to-body aria-role="menu" trap-focus>
    <button class="button" slot="trigger" slot-scope="{ active }">
      <span v-once v-if="subject">{{ subject }}</span>
      <b-icon pack='fas' size="is-small" :icon="active ? 'angle-up' : 'angle-down'"></b-icon>
    </button>
    <b-dropdown-item aria-role="listitem">
      <b-icon pack='fas' size="is-small" icon="cog"></b-icon>
      {{ $t('user-menu.profile') }}
    </b-dropdown-item>
    <b-dropdown-item aria-role="listitem" @click="doLogout">
      <b-icon pack='fas' size="is-small" icon="sign-out-alt"></b-icon>
      {{ $t('user-menu.logout') }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'user-menu',
  computed: {
    ...mapGetters('userSession', ['subject'])
  },
  methods: {
    ...mapActions('userSession', ['destroySession']),
    doLogout() {
      this.destroySession()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
