<template>
  <!-- 1最外层 -->
  <n-space vertical size="large">
    <!-- 2行  -->
    <n-layout>
      <!-- 3列 -->
      <n-layout-header>
        <h1>This is a Mysql config.</h1>
        <router-link to="/">Go Back</router-link>
      </n-layout-header>
      <!--   参数   -->
      <n-divider dashed>
        参数
      </n-divider>
      <n-layout has-sider>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="容器名称 例:[xxx_mysql]"
                   v-model:value="name"
                   @input="input()"/>
        </n-layout-content>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="容器目录 例:[/home/app/xxx_mysql]"
                   v-model:value="mysql" @input="input"/>
        </n-layout-content>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="容器端口 例:[3306]"
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
let name = ref("serve_mysql");
let mysql = ref("/home/app/serve_mysql/mysql/");
let port = ref("3306");
let pwd = ref("password");
let command = ref("");

function input() {
  let sbHtml = new StringBuffer();
  sbHtml.Append("docker run \\\n");
  sbHtml.Append("  --name " + name.value + " \\\n");
  sbHtml.Append("  --privileged=true \\\n");
  sbHtml.Append("  --restart=always \\\n");
  sbHtml.Append("  -v " + mysql.value + ":/var/lib/mysql \\\n");
  sbHtml.Append("  -p " + port.value + ":3306 \\\n");
  sbHtml.Append("  -e MYSQL_ROOT_PASSWORD=" + pwd.value + " \\\n");
  sbHtml.Append("  -e TZ=Asia/Shanghai \\\n");
  sbHtml.Append("  -d mysql:5.7.28 \\\n");
  sbHtml.Append("  --lower_case_table_names=1");
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
