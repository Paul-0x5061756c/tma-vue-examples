<template>
  <div>
    You are now logged in as {{ loggedInUser?.username }} with password {{ loggedInUser?.password }}
    <nuxt-link to="/">back to login page</nuxt-link>
    <ui-buttonComponent @click="clearLoggedInUser">Log out & clear local storage</ui-buttonComponent>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/userStore';
definePageMeta({
  middleware: 'require-login'
})


const { loggedInUser, clearLoggedInUser } = useUserStore()
</script>

<style scoped></style>
