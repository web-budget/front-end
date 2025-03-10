<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const checked = ref(false)
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
            <span class="text-muted-color font-medium">{{ $t('auth.login.subtitle') }}</span>
          </div>

          <div>
            <label
              for="email"
              class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
            >
              {{ $t('auth.login.form.email') }}
            </label>
            <InputText
              id="email"
              type="text"
              :placeholder="$t('auth.login.form.email-placeholder')"
              class="w-full md:w-[30rem] mb-8"
              v-model="email"
            />

            <label
              for="password"
              class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
            >
              {{ $t('auth.login.form.password') }}
            </label>
            <Password
              id="password"
              v-model="password"
              :placeholder="$t('auth.login.form.password-placeholder')"
              :toggleMask="true"
              class="mb-4"
              fluid
              :feedback="false"
            ></Password>

            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
              <div class="flex items-center">
                <Checkbox v-model="checked" id="rememberme" binary class="mr-2"></Checkbox>
                <label for="rememberme">
                  {{ $t('auth.login.form.remember-me') }}
                </label>
              </div>
              <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">
                {{ $t('auth.login.form.forgot-password') }}
              </span>
            </div>
            <Button :label="$t('auth.login.form.sign-in')" class="w-full" as="router-link" to="/"></Button>
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
