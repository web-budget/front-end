export default {
  methods: {
    notifySavedSuccess() {
      this.notifySuccess('commons.notification.saved')
    },
    notifyUpdatedSuccess() {
      this.notifySuccess('commons.notification.updated')
    },
    notifyDeletedSuccess() {
      this.notifySuccess('commons.notification.deleted')
    },
    notifySuccess(text, translate = true) {
      this.defaultToast.message = translate ? this.translate(text) : text
      this.showToast(this.defaultToast)
    },
    notifyInfo(text, translate = true) {
      this.defaultToast.message = translate ? this.translate(text) : text
      this.defaultToast.type = 'is-info'
      this.showToast(this.defaultToast)
    },
    notifyWarning(text, translate = true) {
      this.defaultToast.message = translate ? this.translate(text) : text
      this.defaultToast.type = 'is-warning'
      this.showToast(this.defaultToast)
    },
    notifyError(text, translate = true) {
      this.defaultToast.message = translate ? this.translate(text) : text
      this.defaultToast.type = 'is-danger'
      this.showToast(this.defaultToast)
    },
    showToast(data) {
      this.$buefy.toast.open(data)
    },
    translate(text) {
      return this.$t(text)
    }
  },
  data() {
    return {
      defaultToast: {
        message: '',
        position: 'is-top',
        type: 'is-success',
        duration: 3500,
        pauseOnHover: true
      }
    }
  }

}
