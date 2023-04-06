import { reactive } from 'vue'
import { useI18nYupSchema } from '@/composables/useI18nYupSchema'

import i18n from '@/locales'

const { t } = i18n.global
const { yup } = useI18nYupSchema()

const formDefaults = reactive({
  active: true,
  name: '',
  email: '',
  password: '',
  confirmation: '',
  authorities: [],
})

const validationSchema = yup.object().shape({
  name: yup.string().min(3).max(150).required(),
  email: yup.string().email().max(150).required(),
  password: yup.string().min(6).required(),
  confirmation: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      t('form.validation.must-match', { matcher: t('user.form.password') })
    ),
  authorities: yup.array().min(1).required(),
})

export { formDefaults, validationSchema }
