export default {
  methods: {
    loadingStarted() {
      this.loading = true
    },
    loadingEnded() {
      this.loading = false
    }
  },
  data() {
    return {
      loading: false
    }
  }
}
