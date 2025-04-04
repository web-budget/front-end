import { z } from 'zod'
import { reactive } from 'vue'

const formValues = reactive({
  active: true,
  name: '',
  description: '',
})

const validationSchema = z.object({
  name: z.string().min(3).max(150),
  active: z.boolean().default(true),
  description: z.string().optional()
})

export { formValues, validationSchema }
