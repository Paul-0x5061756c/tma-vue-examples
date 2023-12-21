<template>
  <div class="input-container">
    <label>{{ labelText }}</label>
    <input
      :type="inputType"
      :value="modelValue"
      @input="updateValue"
      :autocomplete="autocompleteMapping[inputType]"
    />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'

defineProps({
  inputType: {
    type: String as PropType<'text' | 'password'>,
    default: 'text'
  },
  labelText: String,
  modelValue: String
})

const autocompleteMapping = {
  text: 'username',
  password: 'current-password'
}

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped>
.input-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.input-container > input {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}
</style>
