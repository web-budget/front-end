<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useSessionStore } from '@/stores/session.store'
import { useRoute, useRouter } from 'vue-router'
import TokenClient from '@/http/token.client'

const route = useRoute()
const router = useRouter()

const { isValid, login } = useSessionStore()

const loading = ref(false)

const credentials = reactive({
  username: '',
  password: '',
  remember: false,
})

const tokenClient = new TokenClient()

async function doLogin() {
  try {
    loading.value = true
    const { data } = await tokenClient.generate(credentials)
    login(data)
    doAfterLoginNavigation()
  } catch (error) {
    console.log(error) // FIXME
  } finally {
    loading.value = false
  }
}

function doAfterLoginNavigation() {
  const redirectTo = route.query.redirect
  if (redirectTo) {
    router.push({ path: redirectTo })
  } else {
    router.push({ name: 'home' })
  }
}

onMounted(() => {
  if (isValid()) {
    doAfterLoginNavigation()
  }
})
</script>

<template>
  <div
    class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden"
  >
    <div class="flex flex-col items-center justify-center">
      <div class="border-gradient">
        <div
          class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20"
          style="border-radius: 53px"
        >
          <div class="text-center mb-8">
            <div class="mb-8 shrink-0 mx-auto">
              <span class="wb-logo">web</span>
              <span class="wb-logo wb-logo-black">Budget</span>
            </div>
            <span class="text-muted-color font-medium">{{ $t('login.subtitle') }}</span>
          </div>

          <div>
            <label
              for="email"
              class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
            >
              {{ $t('login.form.email') }}
            </label>
            <InputText
              id="email"
              type="text"
              v-model="credentials.username"
              class="w-full md:w-[30rem] mb-8"
              :placeholder="$t('login.form.email-placeholder')"
            />

            <label
              for="password"
              class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
            >
              {{ $t('login.form.password') }}
            </label>
            <Password
              fluid
              id="password"
              class="mb-4"
              :feedback="false"
              :toggleMask="true"
              v-model="credentials.password"
              :placeholder="$t('login.form.password-placeholder')"
            ></Password>

            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
              <div class="flex items-center">
                <Checkbox
                  id="rememberme"
                  binary
                  class="mr-2"
                  v-model="credentials.remember"
                ></Checkbox>
                <label for="rememberme">
                  {{ $t('login.form.remember-me') }}
                </label>
              </div>
              <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">
                {{ $t('login.form.forgot-password') }}
              </span>
            </div>
            <Button
              class="w-full"
              @click="doLogin()"
              :label="$t('login.form.sign-in')"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-gradient {
  border-radius: 56px;
  padding: 0.3rem;
  background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
}
</style>
