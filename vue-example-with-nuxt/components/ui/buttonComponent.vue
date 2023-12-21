<template>
  <button @click="onClick" :disabled="disabled" :class="disabled">
    <loaderComponent :width-in-px="14" :height-in-px="14" v-if="loading" />
    <slot v-else></slot>
  </button>
</template>
<script setup lang="ts">
import { computed, type PropType } from 'vue'
import loaderComponent from '../loaderComponent.vue'

const props = defineProps({
  buttonType: {
    type: String as PropType<'green' | 'red'>
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const buttonBackgroundColor = computed(() => {
  switch (props.buttonType) {
    case 'green':
      return '#4CAF50'
    case 'red':
      return '#f44336'
    default:
      return '#4CAF50'
  }
})

const buttonHoverColor = computed(() => {
  switch (props.buttonType) {
    case 'green':
      return '#46a049'
    case 'red':
      return '#e53935'
    default:
      return '#46a049'
  }
})

const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
}
</script>
<style scoped>
button {
  background-color: v-bind(buttonBackgroundColor);
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
button:hover {
  background-color: v-bind(buttonHoverColor);
  transition: background-color 0.2s ease-in-out;
}
</style>
