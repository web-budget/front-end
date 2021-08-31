<template>
  <b-field>
    <b-radio-button
      v-model="state"
      native-value="all"
      type="is-primary is-light is-outlined">
      <span>{{ $t('state-filter.all') }}</span>
    </b-radio-button>
    <b-radio-button
      v-model="state"
      native-value="active"
      type="is-success is-light is-outlined">
      <span>{{ $t('state-filter.active') }}</span>
    </b-radio-button>
    <b-radio-button
      v-model="state"
      native-value="inactive"
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
