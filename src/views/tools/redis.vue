<template>
  <!-- 1最外层 -->
  <n-space vertical size="large">
    <!-- 2行  -->
    <n-layout>
      <!-- 3列 -->
      <n-layout-header>
        <h1>This is a Jar config.</h1>
        <router-link to="/">Go Back</router-link>
      </n-layout-header>
      <!--   参数   -->
      <n-divider dashed>
        参数
      </n-divider>
      <n-layout has-sider>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="容器名称 例:[xxx_redis]"
                   v-model:value="name"
                   @input="input()"/>
        </n-layout-content>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="容器目录 例:[/home/app/xxx_mysql]"
                   v-model:value="redis" @input="input"/>
        </n-layout-content>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="容器端口 例:[6379]"
                   v-model:value="port" @input="input"/>
        </n-layout-content>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="容器密码 例:[system]"
                   v-model:value="pwd" @input="input"/>
        </n-layout-content>
      </n-layout>
      <!--   命令   -->
      <n-divider dashed>
        命令
      </n-divider>
      <n-layout-footer>
        <n-input
            type="textarea"
            placeholder="命令"
            :autosize="{ minRows: 3 }"
            v-model:value="command"
        />
      </n-layout-footer>
    </n-layout>
  </n-space>
</template>
<script setup lang="ts">
import {ref, onMounted} from "vue";

onMounted(() => {
  input();
});
let name = ref("serve_redis");
let redis = ref("/home/app/serve_redis/data/");
let port = ref("6379");
let pwd = ref("system");
let command = ref("");

// docker run -p 6379:6379 --name redis -v /root/redis/data:/data -d --restart=always redis:7-alpine --appendonly yes --requirepass "system"
function input() {
  let sbHtml = new StringBuffer();
  sbHtml.Append("docker run \\\n");
  sbHtml.Append("  -p " + port.value + ":6379 \\\n");
  sbHtml.Append("  --name " + name.value + " \\\n");
  sbHtml.Append("  -v " + redis.value + ":/data \\\n");
  sbHtml.Append("  --privileged=true \\\n");
  sbHtml.Append("  --restart=always \\\n");
  sbHtml.Append("  -e TZ=Asia/Shanghai \\\n");
  sbHtml.Append("  -d redis:7-alpine \\\n");
  if (pwd.value.length > 0) {
    sbHtml.Append("  --appendonly yes \\\n");
    sbHtml.Append("  --requirepass " + pwd.value);
  } else {
    sbHtml.Append("  --appendonly yes");
  }

  command.value = sbHtml.ToString();
}

class StringBuffer {
  private __strings__: any[];

  constructor() {
    this.__strings__ = [];
  }

  Append(str: string) {
    this.__strings__.push(str);
    return this;
  }

  ToString() {
    return this.__strings__.join("");
  }
}
</script>
<style lang="less" scoped>
.n-layout-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

a {
  color: #42b983;
}

button {
  border: none;
}

input {
  width: 50%;
}
</style>
