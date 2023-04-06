import * as yup from 'yup'

import i18n from '@/locales'

const { t } = i18n.global

export function useI18nYupSchema() {
  yup.setLocale({
    mixed: {
      default: ({ label }) => t('form.validation.invalid', { field: label }),
      required: ({ label }) => t('form.validation.required', { field: label }),
    },
    string: {
      min: ({ min }) => t('form.validation.min-value', { min: min }),
      max: ({ max }) => t('form.validation.max-value', { max: max }),
    },
    number: {
      min: ({ min }) => t('form.validation.min-value', { min: min }),
      max: ({ max }) => t('form.validation.max-value', { max: max }),
    },
    array: {
      required: ({ label }) => t('form.validation.required', { field: label }),
      min: ({ min }) => t('form.validation.array-min-value', { min: min }),
    },
  })

  return { yup }
}
