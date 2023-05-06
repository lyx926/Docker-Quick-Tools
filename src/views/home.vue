<template>
  <!-- 1最外层 -->
    <n-space vertical size="large">
        <!-- 2行 -->
        <n-layout>
            <!-- 3列 -->
            <n-layout-header>
                <h1>Docker Quick Tools v1.0.2</h1>
                <ul>
                    <li>
                        Click
                        <a href="https://github.com/lyx926/Docker-Quick-Tools" target="_blank">GitHub</a>
                        to see a GitHub Project.
                    </li>
                    <li>
                        Click
                        <router-link to="/nginx">Docker Nginx</router-link>
                        to see a Nginx config.
                    </li>
                    <li>
                        Click
                        <router-link to="/jar">Docker Jar</router-link>
                        to see a Jar config.
                    </li>
                    <li>
                        Click
                        <router-link to="/mysql">Docker Mysql</router-link>
                        to see a Mysql config.
                    </li>
                    <li>
                        Click
                        <router-link to="/redis">Docker Redis</router-link>
                        to see a Redis config.
                    </li>
                </ul>
            </n-layout-header>
        </n-layout>
    </n-space>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.n-layout-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

ul {
  li {
    line-height: 2;
  }
}

/*blockquote {
  color: var(--c-black);
  background-color: var(--c-gray);
  padding: calc(var(--w-space) / 2);
  border-radius: var(--w-radius-xs);

  p {
    margin: 0;
  }
}*/

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

/*code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}*/
</style>
