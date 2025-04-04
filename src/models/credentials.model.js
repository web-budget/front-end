import { z } from 'zod'
import { reactive } from 'vue'

const formValues = reactive({
  username: '',
  password: '',
  remember: false
})

const validationSchema = z.object({
  username: z.string().email().min(5),
  password: z.string().min(1)
})

export { formValues, validationSchema }
