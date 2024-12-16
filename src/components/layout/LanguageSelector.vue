<template>
  <div class="language-selector">
    <select v-model="selectedLanguage" @change="changeLanguage">
      <option v-for="(label, lang) in languages" :key="lang" :value="lang">
        <img :src="`/flags/${lang}.png`" :alt="label" class="flag" />
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const languages = {
  en: "English",
  de: "German",
  sq: "Albanian",
};

const selectedLanguage = ref(locale.value);

const changeLanguage = () => {
  locale.value = selectedLanguage.value;
  localStorage.setItem("selectedLanguage", selectedLanguage.value); // Save to localStorage
};

onMounted(() => {
  const savedLanguage = localStorage.getItem("selectedLanguage");
  if (savedLanguage) {
    selectedLanguage.value = savedLanguage;
    locale.value = savedLanguage; // Set locale to saved language
  }
});
</script>

<style scoped>
.language-selector {
  position: relative;
  display: flex;
  justify-content: end;
  align-items: end;
  width: 100%;
  top: 0px;
  right: 10px;
  z-index: 1000;
}

.language-selector select {
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 5px;
}

.language-selector .flag {
  width: 20px;
  height: 15px;
  margin-right: 5px;
  vertical-align: middle;
}
</style>
