export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    resetValidations() {
      this.$nextTick(() => {
        this.$refs.formObserver.reset()
      })
    }
  },
  data() {
    return {
      loading: false
    }
  }
}
