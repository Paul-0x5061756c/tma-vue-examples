<template>
  <div class="login-container">
    <form>
      <div class="logos">
        <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
        <img alt="TMA logo" class="logo" src="../assets/tma-logo.png" height="125" />
      </div>
      <ui-inputComponent v-model="userName" labelText="Username" inputType="text" />
      <ui-inputComponent v-model="password" labelText="Password" inputType="password" />
      <div class="buttons">
        <ui-buttonComponent
          :disabled="buttonDisabled"
          :loading="loading"
          buttonType="green"
          @click="login"
          >🚀 Login</ui-buttonComponent
        >
        <nuxt-link to="/logged-in">
        <ui-buttonComponent buttonType="red">🚫 Skip log in (Unauthorized when not logged in)
        </ui-buttonComponent>
        </nuxt-link>
      </div>
      <label v-if="errorMessage" class="errorMessage">{{ errorMessage }}</label>
    </form>
    <div class="counter-container">
      <counterComponent/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const userName = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const buttonDisabled = computed(() => {
  return !userName.value || !password.value || loading.value
})

watch([userName, password], () => {
  errorMessage.value = ''
})

const login = async () => {
  try {
    loading.value = true
    await userStore.signIn(userName.value, password.value)
    navigateTo('/logged-in')
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'An error occurred, please contact your administrator.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
}

.login-container > form > label {
  color: red;
}

.counter-container {
  width: 600px;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>

