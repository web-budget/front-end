<template>
  <div id="container" class="auth-container">
    <div class="logo-container">
      <div class="logo-box">
        <div class="logo-panel">
          <!-- <b-image
            rounded
            alt="webBudget"
            :src="require('@/assets/images/logo.png')"/> -->
        </div>
      </div>
    </div>
    <div class="form-container sign-in-container">
      <div class="sign-in-form">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <router-view />
        </fade-transition>
      </div>
    </div>
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'

export default {
  name: 'authentication-layout',
  components: {
    FadeTransition
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

button {
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.sign-in-form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

.auth-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
}

.sign-in-container {
  right: 0;
  width: 50%;
  z-index: 2;
}

.logo-container {
  position: absolute;
  top: 0;
  right: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  z-index: 100;
}

.logo-box {
  background: #33cc33;
  background: -webkit-linear-gradient(to right, #ffff66 0, #33cc33 100%);
  background: linear-gradient(to right, #ffff66, #33cc33);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  right: 100%;
  height: 100%;
  width: 200%;
}

.logo-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  right: 0;
}
</style>
