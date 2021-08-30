<template>
  <div></div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import NotificationsMixin from '@/components/mixins/notifications.mixin.js'

const { mapGetters } = createNamespacedHelpers('errorHandler')

export default {
  name: 'error-handler',
  mixins: [
    NotificationsMixin
  ],
  computed: {
    ...mapGetters({
      data: 'data',
      error: 'error',
      status: 'status',
      statusText: 'statusText'
    }),
    errorMessage() {
      return this.data.error_description || this.data.error
    }
  },
  watch: {
    error() {
      this.handleError()
    }
  },
  methods: {
    handleError() {
      if ([400, 409, 422].includes(this.status)) {
        this.notifyWarning(this.data.message)
      } else if (this.status === 401) {
        this.handleUnauthorized()
      } else if (this.status === 403) {
        this.$router.push({ name: '403' })
      } else if (this.status === 500) {
        this.handleServerError()
      }
    },
    handleUnauthorized() {
      if (this.data.path === '/authentication/login') {
        this.notifyWarning('errors.bad-credentials')
      } else {
        console.log('nao autorizado')
        this.$router.push({ name: '401' })
      }
    },
    handleServerError() {
      if (typeof this.data === 'string' && this.data.includes('ECONNREFUSED')) {
        this.notifyError('errors.no-connection')
      } else {
        this.notifyError('errors.unknown')
      }
    }
  }
}
</script>
