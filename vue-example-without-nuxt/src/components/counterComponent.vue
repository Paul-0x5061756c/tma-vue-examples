<template>
  <div>
    <h1>Counter</h1>
    <p> This counter component demonstrates state management by displaying changes in state. Refreshing the page will reset the counter due to its state not being persisted. However, if a user is logged in, you'll observe that the user's state is maintained across refreshes due to state persistence. </p>
    <p>Current count: {{ counterStore.count }}</p>
    <ButtonComponent button-type="green" @click="counterStore.increment">Increment</ButtonComponent>
    <hr>
    <ButtonComponent button-type="red" @click="counterStore.decrement">Decrement</ButtonComponent>
  </div>

</template>
<script setup lang="ts">
import ButtonComponent from '@/components/ui/buttonComponent.vue'
import { useCounterStore } from '@/stores/counterStore'

const counterStore = useCounterStore()

</script>
<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>