export default {
  methods: {
    loadingStart() {
      this.loading = true
    },
    loadingEnd() {
      this.loading = false
    }
  },
  data() {
    return {
      loading: false
    }
  }
}
