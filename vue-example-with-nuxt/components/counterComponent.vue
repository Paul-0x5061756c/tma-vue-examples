<template>
  <div>
    <h1>Counter</h1>
    <p>
      This counter component demonstrates state management by displaying changes in state.
      Refreshing the page will reset the counter due to its state not being persisted. However, if a
      user is logged in, you'll observe that the user's state is maintained across refreshes due to
      state persistence.
    </p>
    <p>Current count: {{ counterStore.count }}</p>
    <ui-buttonComponent button-type="green" @click="counterStore.increment">Increment</ui-buttonComponent>
    <hr />
    <ui-buttonComponent button-type="red" @click="counterStore.decrement">Decrement</ui-buttonComponent>
  </div>
</template>
<script setup lang="ts">
import { useCounterStore } from '../stores/counterStore'

const counterStore = useCounterStore()
</script>
<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
