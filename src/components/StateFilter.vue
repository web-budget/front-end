<template>
  <b-field>
    <b-radio-button
      native-value="all"
      v-model="state"
      type="is-primary is-light is-outlined">
      <span>{{ $t('state-filter.all') }}</span>
    </b-radio-button>
    <b-radio-button
      native-value="active"
      v-model="state"
      type="is-success is-light is-outlined">
      <span>{{ $t('state-filter.active') }}</span>
    </b-radio-button>
    <b-radio-button
      native-value="inactive"
      v-model="state"
      type="is-danger is-light is-outlined">
      <span>{{ $t('state-filter.inactive') }}</span>
    </b-radio-button>
  </b-field>
</template>

<script>
export default {
  name: 'state-filter',
  props: {
    value: {
      type: String,
      default: 'active'
    }
  },
  computed: {
    state: {
      get() {
        return this.value
      },
      set(data) {
        this.$emit('input', data)
      }
    }
  }
}
</script>
