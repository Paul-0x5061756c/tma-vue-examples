<template>
  <div>
    You are now logged in as {{ loggedInUser?.username }} with password {{ loggedInUser?.password }}
    <router-link to="/">back to login page</router-link>
    <ButtonComponent @click="clearLoggedInUser">Log out & clear local storage</ButtonComponent>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/ui/buttonComponent.vue'
import { useUserStore } from '@/stores/userStore'

const { loggedInUser, clearLoggedInUser } = useUserStore()
</script>

<style scoped></style>
