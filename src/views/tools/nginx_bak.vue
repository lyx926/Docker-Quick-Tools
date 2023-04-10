<template>
    <n-space vertical size="large">
        <!--  layout  -->
        <n-layout>
            <!--   头部   -->
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
                    <n-input type="text" placeholder="容器目录 例:[/home/app/xxx_server]"
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
                        添加子服务 例:[http://127.0.0.1/xxx 等同于 http://127.0.0.1:801]
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

<style lang="less" scoped>
a {
  color: #42b983;
}

.n-layout-header {
  text-align: center;
}

.n-layout-header,
.n-layout-footer {
  /*background: rgba(128, 128, 128, 0.2);*/
  padding: 5px;
}

.n-layout-sider {
  /*background: rgba(128, 128, 128, 0.3);*/
}

.n-layout-content {
  /*background: rgba(128, 128, 128, 0.4);*/
}
</style>
<script setup lang="ts">

import {ref, onMounted} from "vue";

onMounted(() => {
    input();
});

let containerName = ref("web_nginx");
let containerCert = ref("/home/app/web_server");
let containerPort = ref("80");
let containerSslPort = ref("");
let apiUrl = ref("http://172.17.0.1");
let apiPort = ref("");
let servers: any = ref([]);
let command = ref("");
let config = ref("");

function addServe() {
    servers.value.push({
        path: "/children_server",
        port: "801"
    });
    input();
}

function delServe(i: any) {
    servers.value.splice(i, 1);
    input();
}

function input() {
    let sbHtml = new StringBuffer();
    sbHtml.Append("docker run \\\n");
    sbHtml.Append("  --name " + containerName.value + " \\\n");
    sbHtml.Append("  --privileged=true \\\n");
    sbHtml.Append("  --restart=always \\\n");
    sbHtml.Append("  -v " + containerCert.value + "/html:/usr/share/nginx/html \\\n");
    if (servers.value.length > 0) {
        servers.value.forEach((o: any) => {
            if (o.path.length > 0) {
                sbHtml.Append("  -v " + containerCert.value + "/html" + o.path + ":/usr/share/nginx/html" + o.path + " \\\n");
            }
        });
    }
    sbHtml.Append("  -v " + containerCert.value + "/conf.d/default.conf:/etc/nginx/conf.d/default.conf \\\n");
    sbHtml.Append("  -v " + containerCert.value + "/logs:/var/log/nginx \\\n");
    if (String(containerSslPort.value).length > 0) {
        sbHtml.Append("  -v " + containerCert.value + "/cert:/etc/nginx/cert \\\n");
    }
    sbHtml.Append("  -p " + containerPort.value + ":" + containerPort.value + " \\\n");
    if (servers.value.length > 0) {
        servers.value.forEach((o: any) => {
            if (o.port.length > 0) {
                sbHtml.Append("  -p " + o.port + ":" + o.port + " \\\n");
            }
        });
    }
    if (String(containerSslPort.value).length > 0) {
        sbHtml.Append("  -p " + containerSslPort.value + ":443 \\\n");
    }
    sbHtml.Append("  -e TZ=Asia/Shanghai \\\n");
    sbHtml.Append("  -d nginx:1-alpine-slim");

    command.value = sbHtml.ToString();

    /*
    docker run \
    --name ${nginx_app_name} \
    --privileged=true \
    --restart=always \
    -v ${server_home}/nginxhome/html:/usr/share/nginx/html \
    -v ${server_home}/nginxhome/conf.d/default.conf:/etc/nginx/conf.d/default.conf \
    -v ${server_home}/nginxhome/logs:/var/log/nginx \
    -p ${nginx_port}:80 \
    -e TZ=Asia/Shanghai \
    -d ${group_name}/${nginx_app_name}:${app_version}
    * */

    let sbConfig = new StringBuffer();
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
        sbConfig.Append("      try_files $uri $uri/ /index.html;\n");
        sbConfig.Append("      index  index.html index.htm;\n");
        sbConfig.Append("  }\n\n");

        if (String(apiPort.value).length > 0) {
            sbConfig.Append("  location /prod-api/{\n");
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
                    sbConfig.Append("      root   " + o.path + ";\n");
                    sbConfig.Append("      proxy_pass " + apiUrl.value + ":" + o.port + "/;\n");
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
                    sbConfig.Append("      root " + o.path + ";\n");
                    sbConfig.Append("      index index.html index.htm;\n");
                    sbConfig.Append("  }\n");
                    sbConfig.Append("}");
                }
            });
        }
    } else {
        sbConfig.Append("server {\n");
        sbConfig.Append("  listen " + containerPort.value + ";\n");
        sbConfig.Append("  server_name localhost;\n\n");
        sbConfig.Append("  location / {\n");
        sbConfig.Append("      root   /usr/share/nginx/html;\n");
        sbConfig.Append("      try_files $uri $uri/ /index.html;\n");
        sbConfig.Append("      index  index.html index.htm;\n");
        sbConfig.Append("  }\n\n");

        if (String(apiPort.value).length > 0) {
            sbConfig.Append("  location /prod-api/{\n");
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
                    sbConfig.Append("      root   " + o.path + ";\n");
                    sbConfig.Append("      proxy_pass " + apiUrl.value + ":" + o.port + "/;\n");
                    sbConfig.Append("  }\n\n");
                }
            });
        }

        sbConfig.Append("  error_page   500 502 503 504  /50x.html;\n");
        sbConfig.Append("  location = /50x.html {\n");
        sbConfig.Append("      root   /usr/share/nginx/html;\n");
        sbConfig.Append("  }\n");
        sbConfig.Append("}");

        /*
        server {
            listen       801;
            server_name  localhost;

            location / {
                root   html/test/;
                index  index.html index.htm;
            }
        }
        * */
        if (servers.value.length > 0) {
            servers.value.forEach((o: any) => {
                if (o.path.length > 0) {
                    sbConfig.Append("\n");
                    sbConfig.Append("\n");
                    sbConfig.Append("server {\n");
                    sbConfig.Append("  listen " + o.port + ";\n");
                    sbConfig.Append("  server_name localhost;\n\n");
                    sbConfig.Append("  location / {\n");
                    sbConfig.Append("      root " + o.path + ";\n");
                    sbConfig.Append("      index index.html index.htm;\n");
                    sbConfig.Append("  }\n");
                    sbConfig.Append("}");
                }
            });
        }
    }

    config.value = sbConfig.ToString();
    /*
    server {
      listen       80;
      server_name  localhost;

      #access_log  /var/log/nginx/host.access.log  main;

      location / {
          root   /usr/share/nginx/html;
          try_files $uri $uri/ /index.html;
          index  index.html index.htm;
      }

      location /prod-api/{
          proxy_set_header Host $http_host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header REMOTE-HOST $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_pass http://127.0.0.1:8080/;
      }

      #error_page  404              /404.html;

      # redirect server error pages to the static page /50x.html
      #
      error_page   500 502 503 504  /50x.html;
      location = /50x.html {
          root   /usr/share/nginx/html;
      }
    }

        server{
          listen 443 ssl;
          #对应你的域名
          server_name test.com;
          ssl_certificate /usr/local/nginx/cert/containerSslPort.crt;
          ssl_certificate_key /usr/local/nginx/cert/containerSslPort.key;
          ssl_session_timeout 5m;
          ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
          ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
          ssl_prefer_server_ciphers on;
          #如果是静态文件,直接指向目录,如果是动态应用,用proxy_pass转发一下
          location / {
                  root /usr/local/service/ROOT;
                  index index.html;
          }
      }
      #监听80端口,并重定向到443
      server{
          listen 80;
          server_name test.com;
          rewrite ^/(.*)$ https://test.com:443/$1 permanent;
      }
    * */
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

/*let __strings__ = ref([]);
function StringBuffer() {
  __strings__.value = [];
};
StringBuffer.prototype.Append = function(str) {
  __strings__.value.push(str);
  return this;
};
//格式化字符串
StringBuffer.prototype.AppendFormat = function(str) {
  for (var i = 1; i < arguments.length; i++) {
    var parent = "{" + (i - 1) + "}";
    var reg = new RegExp(parent, "g");
    str = str.replace(reg, arguments[i]);
  }

  __strings__.value.push(str);
  return this;
};
StringBuffer.prototype.ToString = function() {
  return __strings__.value.join("");
};
StringBuffer.prototype.clear = function() {
  __strings__.value = [];
};
StringBuffer.prototype.size = function() {
  return __strings__.value.length;
};*/

</script>
