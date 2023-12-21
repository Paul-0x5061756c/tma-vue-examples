<template>
  <div class="login-container">
    <form>
      <div class="logos">
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      <img alt="TMA logo" class="logo" src="../assets/tma-logo.png" height="125" />
      </div>
      <inputComponent v-model="userName" labelText="Username" inputType="text" />
      <inputComponent v-model="password" labelText="Password" inputType="password" />
      <div class="buttons">
        <buttonComponent
          :disabled="buttonDisabled"
          :loading="loading"
          buttonType="green"
          @click="login"
          >🚀 Login</buttonComponent
        >
        <buttonComponent buttonType="red" @click="() => router.push('/logged-in')"
          >🚫 Skip log in (Unauthorized when not logged in)</buttonComponent
        >
      </div>
      <label v-if="errorMessage" class="errorMessage">{{ errorMessage }}</label>
    </form>
    <div class="counter-container">
    <CounterComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import inputComponent from '@/components/ui/inputComponent.vue'
import buttonComponent from '@/components/ui/buttonComponent.vue'
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import CounterComponent from '@/components/counterComponent.vue'

const userStore = useUserStore()
const router = useRouter()

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
    router.push('/logged-in')
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

.counter-container{
  width: 600px;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>