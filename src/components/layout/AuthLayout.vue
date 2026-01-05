<template>
  <div
    class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden"
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
          </div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
  <Toast position="top-center" />
</template>

<style scoped>
.border-gradient {
  border-radius: 56px;
  padding: 0.3rem;
  background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
}
</style>
