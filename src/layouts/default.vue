<template>
  <main
    px-4 py-10
    text="center gray-700 dark:gray-200"
  >

    <TheFooter />
    <RouterView />
    <div mx-auto mt-5 text-center text-sm opacity-50 v-if="false">
      [Default Layout]
    </div>
  </main>
</template>
<script setup lang="ts">
</script>
