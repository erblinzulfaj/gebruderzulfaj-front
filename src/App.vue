<template>
  <div id="app">
    <Navbar v-if="isLoggedIn" />
    <div class="main-content container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import Navbar from './components/layout/Header.vue';
import { useAuthStore } from "@/stores/auth.js";

export default {
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    const authStore = useAuthStore();
    const isLoggedIn = computed(() => authStore.isLoggedIn);

    onMounted(() => {
      if (!isLoggedIn.value) {
        authStore.logOut();
      }
    });

    return {
      isLoggedIn
    };
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
