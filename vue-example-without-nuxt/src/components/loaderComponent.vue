<template>
  <div class="loader"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  widthInPx: {
    type: Number,
    default: () => 120
  },
  heightInPx: {
    type: Number,
    default: () => 120
  }
})

const width = computed(() => {
  return `${props.widthInPx}px`
})
const height = computed(() => {
  return `${props.heightInPx}px`
})

const calculatedborderSize = computed(() => {
  const borderSize = Math.min(props.widthInPx, props.heightInPx) / 6
  return `${borderSize}px`
})
</script>

<style scoped>
.loader {
  border: v-bind(calculatedborderSize) solid #f3f3f3;
  border-top: v-bind(calculatedborderSize) solid #3498db;
  border-radius: 50%;
  width: v-bind(width);
  height: v-bind(height);
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
