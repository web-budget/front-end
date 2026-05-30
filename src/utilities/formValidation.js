/**
 * Applies a 422 (validation) error onto a PrimeVue `<Form>`, marking each reported field as invalid
 * so it renders with the error style. The field names in the back-end `parameters` map mirror the
 * form field `name`s.
 *
 * @param {import('vue').Ref} formRef the template ref pointing to the `<Form>` component
 * @param {{status: number, parameters: Object}} error the normalized error handed to `onError`
 * @returns {boolean} true when a validation error was applied to the form
 */
export function applyServerValidation(formRef, error) {
  if (error?.status !== 422 || !formRef?.value || !error.parameters) {
    return false
  }

  Object.keys(error.parameters).forEach((field) => {
    const state = formRef.value.getFieldState?.(field)
    if (state) {
      state.invalid = true
      state.valid = false
    }
  })

  return true
}
