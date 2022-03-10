<template>
  <div>
    <div class="page page-center">
      <div class="container-tight py-4">
        <div class="text-center mb-3">
          <span class="wb-logo">web</span>
          <span class="wb-logo wb-logo-black">Budget</span>
        </div>
        <form class="card card-md" action="." method="get" autocomplete="off">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">{{ $t('login.title') }}</h2>
            <div class="mb-3">
              <label class="form-label">{{ $t('login.form.username') }}</label>
              <input type="email" class="form-control" :placeholder="$t('login.form.username-placeholder')">
            </div>
            <div class="mb-2">
              <label class="form-label">
                {{ $t('login.form.password') }}
                <span class="form-label-description">
                  <a href="./forgot-password.html">{{ $t('login.action.forgot-password') }}</a>
                </span>
              </label>
              <div class="input-group input-group-flat">
                <input type="password" class="form-control" :placeholder="$t('login.form.password-placeholder')" autocomplete="off">
                <span class="input-group-text">
                  <a href="#" class="link-secondary" title="Show password" data-bs-toggle="tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="2" /><path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" /></svg>
                  </a>
                </span>
              </div>
            </div>
            <div class="form-footer">
              <button type="submit" class="btn btn-primary w-100">{{ $t('login.action.sign-in') }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>
