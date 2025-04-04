<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { zodResolver } from '@primevue/forms/resolvers/zod'

import { formValues, validationSchema } from '@/models/registration/cost-center.model'

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  updating: {
    type: Boolean,
    default: false,
  },
})

const resolver = zodResolver(validationSchema)

const router = useRouter()

const loading = ref(false)

function selectAction({ values }) {
  loading.value = true
  if (props.updating) {
    update(values)
  } else {
    create(values)
  }
}

async function create(values) {
  // TODO
}

async function update(values) {
  // TODO
}

function changeToListing() {
  router.push({ name: 'cost-centers' })
}
</script>

<template>
  <Fluid class="card flex flex-col gap-4 w-full">
    <Form
      v-slot="{ valid }"
      @submit="selectAction"
      :resolver="resolver"
      :initialValues="formValues"
    >
      <div class="font-semibold text-xl mb-8">
        <span v-if="props.updating">
          {{ $t('cost-centers.form.editing', { what: 'the cost center' }) }}
        </span>
        <span v-else>{{ $t('cost-centers.form.new') }}</span>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="name">{{ $t('cost-centers.form.name') }}</label>
          <InputText id="name" type="text" name="name" />
        </div>
      </div>

      <div class="flex mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="description">{{ $t('cost-centers.form.description') }}</label>
          <Textarea id="description" name="description" rows="4" />
        </div>
      </div>

      <div class="flex justify-end">
        <div class="flex flex-nowrap gap-2">
          <Button
            :loading="loading"
            variant="outlined"
            severity="secondary"
            :label="$t('form.back')"
            @click.prevent="changeToListing()"
          />
          <Button
            type="submit"
            :disabled="!valid"
            :loading="loading"
            :label="$t('form.save')"
          />
        </div>
      </div>
    </Form>
  </Fluid>
</template>
