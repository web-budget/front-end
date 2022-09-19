import * as yup from 'yup'
import { useI18n } from 'vue-i18n'

export function useI18nYupSchema() {
  const { t } = useI18n()

  yup.setLocale({
    mixed: {
      default: ({ label }) => t('form.validation.invalid', { field: label }),
      required: ({ label }) => t('form.validation.required', { field: label })
    },
    string: {
      min: ({ min }) => t('form.validation.min-value', { min: min }),
      max: ({ max }) => t('form.validation.max-value', { max: max })
    },
    number: {
      min: ({ min }) => t('form.validation.min-value', { min: min }),
      max: ({ max }) => t('form.validation.max-value', { max: max })
    }
  })

  return { yup }
}
