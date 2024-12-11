<template>
  <nav class="navbar navbar-expand-lg navbar-light custom-navbar">
    <div class="container-fluid">
      <router-link to="/home" class="navbar-brand"><img src="./../../assets/logo-gz.png" style="width: 180px" alt="Logo"></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/home" class="nav-link">{{ $t('products') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/add" class="nav-link">{{ $t('addProduct') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/less-quantity" class="nav-link">{{ $t('lessQuantity') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/discount-history" class="nav-link">{{ $t('discountHistory') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/increment-history" class="nav-link">{{ $t('incrementHistory') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/update-quantity" class="nav-link">{{ $t('updateQuantity') }}</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button @click="onLogOut" class="btn btn-danger nav-link">{{ $t('logout') }}</button>
          </li>
        </ul>
      </div>
    </div>
    <LanguageSelector />
  </nav>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import LanguageSelector from "@/components/layout/LanguageSelector.vue";

export default {
  name: 'Navbar',
  components: { LanguageSelector },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    function onLogOut() {
      authStore.logOut();
      router.push({ name: 'login' });
    }

    return {
      onLogOut,
      isLoggedIn: authStore.isLoggedIn
    };
  }
};
</script>

<style scoped>
.custom-navbar {
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  display: flex;
  justify-content: space-between; /* Ensure spacing between items */
  align-items: center; /* Center align items vertically */
}

.navbar-brand {
  font-size: 24px;
  font-weight: bold;
  color: #91C11E;
}

.navbar-nav .nav-link {
  font-size: 16px;
  color: #666;
  margin-right: 20px;
}

.navbar-nav .nav-link:hover {
  color: #91C11E;
}

.navbar-nav .nav-item.active .nav-link {
  color: #91C11E;
}

.language-selector {
  margin-left: auto; /* Push LanguageSelector to the right */
}
</style>
