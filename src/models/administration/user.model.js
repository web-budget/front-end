import YupPassword from 'yup-password'

import { reactive } from 'vue'
import { useI18nYupSchema } from '@/composables/useI18nYupSchema'

import i18n from '@/locales'

const { t } = i18n.global
const { yup } = useI18nYupSchema()

YupPassword(yup)

const formDefaults = reactive({
  active: true,
  name: '',
  email: '',
  password: '',
  confirmation: '',
  authorities: [],
  defaultLanguage: 'PT_BR',
  sendActivationEmail: true,
})

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .minNumbers(3, t('form.validation.min-3-numbers'))
    .minLowercase(3, t('form.validation.min-3-lc-letters'))
    .required(),
  confirmation: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      t('form.validation.must-match', { matcher: t('user.form.password') })
    ),
})

const updateValidationSchema = yup.object().shape({
  name: yup.string().min(3).max(150).required(),
  email: yup.string().email().max(150).required(),
  defaultLanguage: yup.string().required(),
  authorities: yup.array().min(1).required(),
})

const createValidationSchema = updateValidationSchema.concat(passwordSchema)

const defaultLanguages = {
  EN_US: 'languages.type.english',
  PT_BR: 'languages.type.portuguese',
}

export {
  formDefaults,
  updateValidationSchema,
  createValidationSchema,
  passwordSchema,
  defaultLanguages,
}
