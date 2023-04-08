<template>
  <h1>Docker Quick Tools v1.0.1</h1>
  <ul>
    <li>
      Click
      <a href="https://github.com/lyx926/Docker-Quick-Tools" target="_blank">GitHub</a>
      to see a GitHub Project.
    </li>
    <li>
      Click
      <router-link to="/Nginx">Docker Nginx</router-link>
      to see a Nginx config.
    </li>
    <li>
      Click
      <router-link to="/Jar">Docker Jar</router-link>
      to see a Jar config.
    </li>
    <li>
      Click
      <router-link to="/Mysql">Docker Mysql</router-link>
      to see a Mysql config.
    </li>
    <li>
      Click
      <router-link to="/Redis">Docker Redis</router-link>
      to see a Redis config.
    </li>
  </ul>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// import { storeToRefs } from 'pinia'
// import { useMessageStore } from '@/stores'

// defineProps<{ msg: string }>()

// const count = ref<number>(0)
// const store = useMessageStore()
// const { message } = storeToRefs(store)
</script>

<style lang="less" scoped>
ul {
  li {
    line-height: 2;
  }
}

blockquote {
  color: var(--c-black);
  background-color: var(--c-gray);
  padding: calc(var(--w-space) / 2);
  border-radius: var(--w-radius-xs);

  p {
    margin: 0;
  }
}

hr {
  width: 60%;
  border-color: var(--c-border);
  margin: var(--w-space) auto;
  opacity: 0.2;
}

a {
  color: #42b983;
}

p {
  margin: 0;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
