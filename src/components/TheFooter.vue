<script setup lang="ts">
import {availableLocales, loadLanguageAsync} from '~/modules/i18n'

const {t, locale} = useI18n()

async function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<template>
  <nav flex="~ gap-4" mt-6 justify-center text-xl>
    <RouterLink icon-btn to="/" :title="t('button.home')">
      <div i-carbon-campsite/>
    </RouterLink>

    <button icon-btn :title="t('button.toggle_dark')" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon"/>
    </button>

<!--    <a icon-btn :title="t('button.toggle_langs')" @click="toggleLocales()">
      <div i-carbon-language/>
    </a>-->

<!--    <RouterLink icon-btn to="/about" :title="t('button.about')" data-test-id="about">
      <div i-carbon-dicom-overlay/>
    </RouterLink>-->

    <a icon-btn rel="noreferrer" href="https://github.com/lyx926" target="_blank" title="GitHub">
      <div i-carbon-logo-github/>
    </a>

    <RouterLink icon-btn to="/docker/jar" :title="t('button.about')" data-test-id="java">
      <div class="i-logos-java"/>
    </RouterLink>

    <RouterLink icon-btn to="/docker/mysql" :title="t('button.about')" data-test-id="mysql">
      <div class="i-logos-mysql"/>
    </RouterLink>

    <RouterLink icon-btn to="/docker/nginx" :title="t('button.about')" data-test-id="nginx">
      <div class="i-logos-nginx"/>
    </RouterLink>

    <RouterLink icon-btn to="/docker/redis" :title="t('button.about')" data-test-id="redis">
      <div class="i-logos-redis"/>
    </RouterLink>

  </nav>
</template>
