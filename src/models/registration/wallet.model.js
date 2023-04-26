import { reactive } from 'vue'
import { useI18nYupSchema } from '@/composables/useI18nYupSchema'

const { yup } = useI18nYupSchema()

const formDefaults = reactive({
  active: true,
  name: '',
  description: '',
  type: null,
  bank: '',
  agency: '',
  number: '',
})

const validationSchema = yup.object().shape({
  name: yup.string().min(3).max(150).required(),
  type: yup.string().required(),
  bank: yup.string().max(150),
  agency: yup.string().max(10),
  number: yup.string().max(16),
})

const walletTypes = {
  PERSONAL: 'wallet.type.personal',
  INVESTMENT: 'wallet.type.investment',
  BANK_ACCOUNT: 'wallet.type.bank-account',
}

export { formDefaults, validationSchema, walletTypes }
