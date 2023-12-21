import { createApp, watch } from 'vue'
import { createPinia, type PiniaPluginContext } from 'pinia'
import App from './App.vue'
import './assets/css/index.css'
import router from './router'

const pinia = createPinia()

pinia.use(({ store }: PiniaPluginContext) => {
  if (store.$id === 'user') {
    const initialState = localStorage.getItem(store.$id)
    if (initialState) {
      store.$patch(JSON.parse(initialState))
    }

    watch(
      store.$state,
      (newState) => {
        localStorage.setItem(store.$id, JSON.stringify(newState))
      },
      { deep: true }
    )
  }
})

createApp(App).use(pinia).use(router).mount('#app')
