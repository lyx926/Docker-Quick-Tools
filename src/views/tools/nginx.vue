<template>
  <!-- 1最外层 -->
  <n-space vertical size="large">
    <!-- 2行  -->
    <n-layout>
      <!-- 3列 -->
      <n-layout-header>
        <h1>This is a Nginx config.</h1>
        <router-link to="/">Go Back</router-link>
      </n-layout-header>
      <!--   参数   -->
      <n-divider dashed>
        参数
      </n-divider>
      <n-layout has-sider>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="容器名称 例:[xxx_nginx]"
                   v-model:value="containerName"
                   @input="input()"/>
        </n-layout-content>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="容器目录 例:[/home/app/xxx_nginx]"
                   v-model:value="containerCert" @input="input"/>
        </n-layout-content>
      </n-layout>
      <n-layout has-sider>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="容器端口 例:[80]"
                   v-model:value="containerPort" @input="input"/>
        </n-layout-content>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="容器ssl端口 例:[443]自行配置证书"
                   v-model:value="containerSslPort" @input="input"/>
        </n-layout-content>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text"
                   placeholder="代理地址 例:[http://172.17.0.1]docker网卡ip或公网ip或域名"
                   v-model:value="apiUrl"
                   @input="input"/>
        </n-layout-content>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text"
                   placeholder="api后台端口 例:[8080]自行配置/prod-api"
                   v-model:value="apiPort"
                   @input="input"/>
        </n-layout-content>
      </n-layout>
      <n-layout has-sider>
        <n-layout-content content-style="padding: 5px;">
          <n-button style="width: 100%" type="info" @click="addServe">
            添加子服务 例:[http://127.0.0.1/xxx 和 http://127.0.0.1:801]
          </n-button>
        </n-layout-content>
      </n-layout>
      <n-layout has-sider v-for="(server, i) in servers" :key="i">
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="子服务目录名称 例:[/xxx]"
                   v-model:value="server.path" @input="input"/>
        </n-layout-content>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="子服务端口 例:[801]"
                   v-model:value="server.port" @input="input"/>
        </n-layout-content>
        <n-layout-content content-style="padding: 5px;">
          <n-button style="width: 100%" type="error" @click="delServe(i)">
            删除子服务
          </n-button>
        </n-layout-content>
      </n-layout>
      <n-layout has-sider>
        <n-layout-content content-style="padding: 5px;">
          <n-button style="width: 100%" type="info" @click="addPath">
            添加卷 例:[-v /home/app/serve_nginx/xxx:/home/xxx] 比如日志、附件、uReport.xml等
          </n-button>
        </n-layout-content>
      </n-layout>
      <n-layout has-sider v-for="(path, i) in paths" :key="i">
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="真机卷目录名称 例:[/home/app/serve_nginx/xxx]"
                   v-model:value="path.outPath" @input="input"/>
        </n-layout-content>
        <n-layout-content content-style="padding: 5px;">
          <n-input type="text" placeholder="虚拟卷目录名称 例:[/home/xxx]"
                   v-model:value="path.inPath" @input="input"/>
        </n-layout-content>
        <n-layout-content content-style="padding: 5px;">
          <n-button style="width: 100%" type="error" @click="delPath(i)">
            删除卷
          </n-button>
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
      <!--   配置   -->
      <n-divider dashed>
        配置
      </n-divider>
      <n-layout-footer>
        <n-input
            type="textarea"
            placeholder="配置"
            :autosize="{ minRows: 3 }"
            v-model:value="config"
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
let containerName = ref("serve_nginx");
let containerCert = ref("/home/app/serve_nginx");
let containerPort = ref("80");
let containerSslPort = ref("");
let apiUrl = ref("http://172.17.0.1");
let apiPort = ref("");
let servers: any = ref([]);
let paths: any = ref([]);
let command = ref("");
let config = ref("");

/**
 * 添加子服务
 */
function addServe() {
  servers.value.push({
    path: "/children_server",
    port: "801"
  });
  input();
}

/**
 * 添加卷
 */
function addPath() {
  paths.value.push({
    outPath: "/home/app/serve_nginx/xxx",
    inPath: "/home/xxx"
  });
  input();
}

/**
 * 删除服务
 * @param i
 */
function delServe(i: any) {
  servers.value.splice(i, 1);
  input();
}

/**
 * 删除卷
 * @param i
 */
function delPath(i: any) {
  paths.value.splice(i, 1);
  input();
}

function input() {
  let sbHtml = new StringBuffer();
  sbHtml.Append("docker run \\\n");
  sbHtml.Append("  --name " + containerName.value + " \\\n");
  sbHtml.Append("  --privileged=true \\\n");
  sbHtml.Append("  --restart=always \\\n");
  sbHtml.Append("  -v " + containerCert.value + "/html:/usr/share/nginx/html \\\n");
  // 服务目录
  if (servers.value.length > 0) {
    servers.value.forEach((o: any) => {
      if (o.path.length > 0) {
        sbHtml.Append("  -v " + containerCert.value + "/html" + o.path + ":/usr/share/nginx/html" + o.path + " \\\n");
      }
    });
  }
  // 卷目录
  if (paths.value.length > 0) {
    paths.value.forEach((o: any) => {
      if (o.outPath.length > 0 && o.inPath.length) {
        sbHtml.Append("  -v " + o.outPath + ":" + o.inPath + " \\\n");
      }
    });
  }
  sbHtml.Append("  -v " + containerCert.value + "/conf.d/default.conf:/etc/nginx/conf.d/default.conf \\\n");
  sbHtml.Append("  -v " + containerCert.value + "/logs:/var/log/nginx \\\n");
  // sll目录
  if (String(containerSslPort.value).length > 0) {
    sbHtml.Append("  -v " + containerCert.value + "/cert:/etc/nginx/cert \\\n");
  }
  sbHtml.Append("  -p " + containerPort.value + ":" + containerPort.value + " \\\n");
  // 子服务端口
  if (servers.value.length > 0) {
    servers.value.forEach((o: any) => {
      if (o.port.length > 0) {
        sbHtml.Append("  -p " + o.port + ":" + o.port + " \\\n");
      }
    });
  }
  // ssl端口
  if (String(containerSslPort.value).length > 0) {
    sbHtml.Append("  -p " + containerSslPort.value + ":443 \\\n");
  }
  sbHtml.Append("  -e TZ=Asia/Shanghai \\\n");
  sbHtml.Append("  -d nginx:1-alpine-slim");
  command.value = sbHtml.ToString();
  let sbConfig = new StringBuffer();
  // ssl配置
  if (String(containerSslPort.value).length > 0) {
    sbConfig.Append("server {\n");
    sbConfig.Append("  listen " + containerPort.value + ";\n");
    sbConfig.Append("  server_name liuyixiang.xyz;\n");
    sbConfig.Append("  rewrite ^(.*)$ https://$host$1 permanent;\n");
    sbConfig.Append("}\n\n");
    sbConfig.Append("server {\n");
    sbConfig.Append("  listen " + containerSslPort.value + " ssl;\n");
    sbConfig.Append("  server_name liuyixiang.xyz;\n");
    sbConfig.Append("  ssl_certificate /etc/nginx/cert/ssl.crt;\n");
    sbConfig.Append("  ssl_certificate_key /etc/nginx/cert/ssl.key;\n");
    sbConfig.Append("  ssl_session_timeout 5m;\n");
    sbConfig.Append("  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;\n");
    sbConfig.Append("  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;\n");
    sbConfig.Append("  ssl_prefer_server_ciphers on;\n\n");
    sbConfig.Append("  location / {\n");
    sbConfig.Append("      root   /usr/share/nginx/html;\n");
    sbConfig.Append("      index  index.html index.htm;\n");
    sbConfig.Append("      try_files $uri $uri/ /index.html;\n");
    sbConfig.Append("  }\n\n");
    if (String(apiPort.value).length > 0) {
      sbConfig.Append("  location /prod-api/ {\n");
      sbConfig.Append("      proxy_set_header Host $http_host;\n");
      sbConfig.Append("      proxy_set_header X-Real-IP $remote_addr;\n");
      sbConfig.Append("      proxy_set_header REMOTE-HOST $remote_addr;\n");
      sbConfig.Append("      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n");
      sbConfig.Append("      proxy_pass " + apiUrl.value + ":" + apiPort.value + "/;\n");
      sbConfig.Append("  }\n\n");
    }
    if (servers.value.length > 0) {
      servers.value.forEach((o: any) => {
        if (o.path.length > 0) {
          sbConfig.Append("  location /" + o.path.split("/")[o.path.split("/").length - 1] + " {\n");
          sbConfig.Append("      alias /usr/share/nginx/html" + o.path + ";\n");
          sbConfig.Append("      try_files $uri $uri/ /" + o.path.split("/")[o.path.split("/").length - 1] + "/index.html;\n");
          sbConfig.Append("  }\n\n");
        }
      });
    }
    sbConfig.Append("  error_page   500 502 503 504  /50x.html;\n");
    sbConfig.Append("  location = /50x.html {\n");
    sbConfig.Append("      root   /usr/share/nginx/html;\n");
    sbConfig.Append("  }\n");
    sbConfig.Append("}");
    if (servers.value.length > 0) {
      servers.value.forEach((o: any) => {
        if (o.path.length > 0) {
          sbConfig.Append("\n");
          sbConfig.Append("\n");
          sbConfig.Append("server {\n");
          sbConfig.Append("  listen " + o.port + ";\n");
          sbConfig.Append("  server_name localhost;\n\n");
          sbConfig.Append("  location / {\n");
          sbConfig.Append("      root " + containerCert.value + "/html" + o.path + ";\n");
          sbConfig.Append("      index index.html index.htm;\n");
          sbConfig.Append("  }\n");
          sbConfig.Append("}");
        }
      });
    }
  } else { // 80配置
    sbConfig.Append("server {\n");
    sbConfig.Append("  listen " + containerPort.value + ";\n");
    sbConfig.Append("  server_name localhost;\n\n");
    sbConfig.Append("  location / {\n");
    sbConfig.Append("      root   /usr/share/nginx/html;\n");
    sbConfig.Append("      index  index.html index.htm;\n");
    sbConfig.Append("      try_files $uri $uri/ /index.html;\n");
    sbConfig.Append("  }\n\n");
    if (String(apiPort.value).length > 0) {
      sbConfig.Append("  location /prod-api/ {\n");
      sbConfig.Append("      proxy_set_header Host $http_host;\n");
      sbConfig.Append("      proxy_set_header X-Real-IP $remote_addr;\n");
      sbConfig.Append("      proxy_set_header REMOTE-HOST $remote_addr;\n");
      sbConfig.Append("      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n");
      sbConfig.Append("      proxy_pass " + apiUrl.value + ":" + apiPort.value + "/;\n");
      sbConfig.Append("  }\n\n");
    }
    if (servers.value.length > 0) {
      servers.value.forEach((o: any) => {
        if (o.path.length > 0) {
          sbConfig.Append("  location /" + o.path.split("/")[o.path.split("/").length - 1] + " {\n");
          sbConfig.Append("      alias /usr/share/nginx/html" + o.path + ";\n");
          sbConfig.Append("      try_files $uri $uri/ /" + o.path.split("/")[o.path.split("/").length - 1] + "/index.html;\n");
          sbConfig.Append("  }\n\n");
        }
      });
    }
    sbConfig.Append("  error_page   500 502 503 504  /50x.html;\n");
    sbConfig.Append("  location = /50x.html {\n");
    sbConfig.Append("      root   /usr/share/nginx/html;\n");
    sbConfig.Append("  }\n");
    sbConfig.Append("}");
    if (servers.value.length > 0) {
      servers.value.forEach((o: any) => {
        if (o.path.length > 0) {
          sbConfig.Append("\n");
          sbConfig.Append("\n");
          sbConfig.Append("server {\n");
          sbConfig.Append("  listen " + o.port + ";\n");
          sbConfig.Append("  server_name localhost;\n\n");
          sbConfig.Append("  location / {\n");
          sbConfig.Append("      root " + containerCert.value + "/html" + o.path + ";\n");
          sbConfig.Append("      index index.html index.htm;\n");
          sbConfig.Append("  }\n");
          sbConfig.Append("}");
        }
      });
    }
  }
  config.value = sbConfig.ToString();
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
