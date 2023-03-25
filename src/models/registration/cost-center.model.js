import { reactive } from 'vue'
import { useI18nYupSchema } from '@/composables/useI18nYupSchema'

const { yup } = useI18nYupSchema()

const formDefaults = reactive({
  active: true,
  name: '',
  description: '',
})

const validationSchema = yup.object().shape({
  name: yup.string().min(3).max(150).required(),
})

export { formDefaults, validationSchema }
