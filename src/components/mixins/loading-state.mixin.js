export default {
  methods: {
    loadingStart() {
      this.loading = true
    },
    loadingEnd() {
      this.loading = false
    },
    loadingDataStart() {
      this.loadingData = true
    },
    loadingDataEnd() {
      this.loadingData = false
    },
    loadingPageStart() {
      this.loadingPage = true
    },
    loadingPageEnd() {
      this.loadingPage = false
    }
  },
  data() {
    return {
      loading: false,
      loadingData: false,
      loadingPage: false
    }
  }
}
