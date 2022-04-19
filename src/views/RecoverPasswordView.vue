<template>
  <div class="card card-md">
    <div class="card-body">
      <h2 class="card-title text-center mb-4">Forgot password</h2>
      <p class="text-muted mb-4">Enter your email address and your password will be reset and emailed to you.</p>
      <div class="mb-3">
        <label class="form-label">New password</label>
        <input type="email" class="form-control" placeholder="Enter a new password">
      </div>
      <div class="mb-3">
        <label class="form-label">Confirmation</label>
        <input type="email" class="form-control" placeholder="Confirm new password">
      </div>
      <div class="form-footer">
        <a href="#" class="btn btn-primary w-100">
          Change my password
        </a>
      </div>
    </div>
  </div>
  <div class="text-center text-muted mt-3">
    Forget it, <router-link :to="{ name: 'login' }">send me back</router-link> to the sign in screen.
  </div>
</template>

<script setup>

</script>
