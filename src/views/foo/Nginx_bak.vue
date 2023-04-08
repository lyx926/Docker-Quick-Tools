<template>
  <div class="content">
    <n-layout>
      <n-layout-content content-style="padding: 11px;">
        <h1>This is a Nginx config.</h1>
        <router-link to="/">Go Back</router-link>
      </n-layout-content>
<!--      <n-layout-content content-style="padding: 11px;">
        <n-input v-model:value="name" type="text" placeholder="基本的 Input"
                 clearable />
      </n-layout-content>-->
<!--      <n-layout-content content-style="padding: 11px;">
        <n-input v-model:value="name" type="text" placeholder="基本的 Input"
                 clearable />
      </n-layout-content>-->
      <n-layout has-sider>
        <n-layout-sider content-style="padding: 11px;">
          <n-input v-model:value="name" type="text" placeholder="基本的 Input"
                 clearable />
        </n-layout-sider>
        <n-layout-sider content-style="padding: 11px;">
          <n-input v-model:value="name" type="text" placeholder="基本的 Input"
                 clearable />
        </n-layout-sider>
      </n-layout>
      <n-layout has-sider>
        <n-layout-sider content-style="padding: 11px;">
          <n-input-number clearable />
        </n-layout-sider>
        <n-layout-sider content-style="padding: 11px;">
          <n-input-number clearable />
        </n-layout-sider>
        <n-layout-sider content-style="padding: 11px;">
          <n-input v-model:value="name" type="text" placeholder="基本的 Input"
                   clearable />
        </n-layout-sider>
        <n-layout-sider content-style="padding: 11px;">
          <n-input-number clearable />
        </n-layout-sider>
      </n-layout>
    </n-layout>
    <!--    <img alt='Vue logo' :src='logo' />-->
    <p>This is a Nginx config.</p>
    <router-link to="/">Go Back</router-link>
    <h1> parameters</h1>
    <div><input placeholder="请输入容器名称" v-model="name" @input="input" />
    </div>
    <div><input placeholder="请输入容器目录" v-model="html_conf_logs_cert"
                @input="input" />
    </div>
    <div><input placeholder="请输入容器端口" v-model="port" @input="input"
                type="number" />
    </div>
    <div><input
      placeholder="请输入容器端口，端口默认不填写，容器命令没有证书和端口配置；conf文件没有443配置"
      v-model="ssl" @input="input"
      type="number" />
    </div>
    <div><input style="width: 25%;"
                placeholder="请输入后台接口地址 可以是docker内网地址 or> 公网IP or> 域名"
                v-model="address" @input="input" />
      <input style="width: 25%;"
             placeholder="请输入后台接口端口"
             v-model="addressPort" @input="input" type="number" />
    </div>
    <div>
      <button @click="addServe">追加服务</button>
    </div>
    <div v-for="(row, i) in rows" :key="i">
      <input style="width: 23%" v-model="row.path" @input="input" />
      <input style="width: 23%" v-model="row.port" @input="input"
             type="number" />
      <button @click="delServe(i)">删除</button>
    </div>
    <h1>command</h1>
    <div>
      <textarea style="width: 50%;" rows="15" v-model="text"></textarea>
    </div>
    <h1>defautl.conf</h1>
    <div><textarea style="width: 50%;" rows="35" v-model="config"></textarea>
    </div>
    <div>
      <div>https ssl域名自行修改</div>
      <div>文件crt或pem自行修改</div>
      <div>新location域 自行添加</div>
    </div>
    <!--    <div>
          <button @click="copy">复制</button>
        </div>-->
  </div>
</template>

<script setup lang="ts">
// import logo from '@/assets/img/logo.png'
import { ref, onMounted } from "vue";

onMounted(() => {
  input();
});

let name = ref("nginx_server");
let html_conf_logs_cert = ref("/home/app/nginx_server");
let port = ref("80");
let ssl = ref("");
let address = ref("http://172.17.0.1");
let addressPort = ref("8080");
let rows = ref([]);
let text = ref("");
let config = ref("123");

/*function copy() {
  // const txt = document.getElementById('code').innerText
  // 添加一个input元素放置需要的文本内容
  const dataContainer = document.createElement("input");
  dataContainer.value = text.value;
  document.body.appendChild(dataContainer);
  // 选中并复制文本到剪切板
  dataContainer.select();
  document.execCommand("copy");
  // 移除input元素
  document.body.removeChild(dataContainer);
}*/

function addServe() {
  rows.value.push({
    "path": "/home/app/nginx_server/children_server",
    "port": "801"
  });
  input();
}

function delServe(i) {
  rows.value.splice(i, 1);
  input();
}

function input() {
  let sbHtml = new StringBuffer();
  sbHtml.Append("docker run \\\n");
  sbHtml.Append("  --name " + name.value + " \\\n");
  sbHtml.Append("  --privileged=true \\\n");
  sbHtml.Append("  --restart=always \\\n");
  sbHtml.Append("  -v " + html_conf_logs_cert.value + "/html:/usr/share/nginx/html \\\n");
  if (rows.value.length > 0) {
    rows.value.forEach((o) => {
      if (o.path.length > 0) {
        sbHtml.Append("  -v " + html_conf_logs_cert.value + "/html" + o.path + ":/usr/share/nginx/html" + o.path + " \\\n");
      }
    });
  }
  sbHtml.Append("  -v " + html_conf_logs_cert.value + "/conf.d/default.conf:/etc/nginx/conf.d/default.conf \\\n");
  sbHtml.Append("  -v " + html_conf_logs_cert.value + "/logs:/var/log/nginx \\\n");
  if (String(ssl.value).length > 0) {
    sbHtml.Append("  -v " + html_conf_logs_cert.value + "/cert:/etc/nginx/cert \\\n");
  }
  sbHtml.Append("  -p " + port.value + ":" + port.value + " \\\n");
  if (rows.value.length > 0) {
    rows.value.forEach((o) => {
      if (o.port.length > 0) {
        sbHtml.Append("  -p " + o.port + ":" + o.port + " \\\n");
      }
    });
  }
  if (String(ssl.value).length > 0) {
    sbHtml.Append("  -p " + ssl.value + ":443 \\\n");
  }
  sbHtml.Append("  -e TZ=Asia/Shanghai \\\n");
  sbHtml.Append("  -d nginx:1-alpine-slim");

  text.value = sbHtml.ToString();

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
  if (String(ssl.value).length > 0) {
    sbConfig.Append("server {\n");
    sbConfig.Append("  listen " + port.value + ";\n");
    sbConfig.Append("  server_name liuyixiang.xyz;\n");
    sbConfig.Append("  rewrite ^(.*)$ https://$host$1 permanent;\n");
    sbConfig.Append("}\n\n");
    sbConfig.Append("server {\n");
    sbConfig.Append("  listen " + ssl.value + " ssl;\n");
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
    sbConfig.Append("  location /prod-api/{\n");
    sbConfig.Append("      proxy_set_header Host $http_host;\n");
    sbConfig.Append("      proxy_set_header X-Real-IP $remote_addr;\n");
    sbConfig.Append("      proxy_set_header REMOTE-HOST $remote_addr;\n");
    sbConfig.Append("      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n");
    sbConfig.Append("      proxy_pass " + address.value + ":" + addressPort.value + "/;\n");
    sbConfig.Append("  }\n\n");

    if (rows.value.length > 0) {
      rows.value.forEach((o) => {
        if (o.path.length > 0) {
          sbConfig.Append("  location /" + o.path.split("/")[o.path.split("/").length - 1] + " {\n");
          sbConfig.Append("      root   " + o.path + ";\n");
          sbConfig.Append("      proxy_pass " + address.value + ":" + o.port + "/;\n");
          sbConfig.Append("  }\n\n");
        }
      });
    }

    sbConfig.Append("  error_page   500 502 503 504  /50x.html;\n");
    sbConfig.Append("  location = /50x.html {\n");
    sbConfig.Append("      root   /usr/share/nginx/html;\n");
    sbConfig.Append("  }\n");
    sbConfig.Append("}");

    if (rows.value.length > 0) {
      rows.value.forEach((o) => {
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
    sbConfig.Append("  listen " + port.value + ";\n");
    sbConfig.Append("  server_name localhost;\n\n");
    sbConfig.Append("  location / {\n");
    sbConfig.Append("      root   /usr/share/nginx/html;\n");
    sbConfig.Append("      try_files $uri $uri/ /index.html;\n");
    sbConfig.Append("      index  index.html index.htm;\n");
    sbConfig.Append("  }\n\n");
    sbConfig.Append("  location /prod-api/{\n");
    sbConfig.Append("      proxy_set_header Host $http_host;\n");
    sbConfig.Append("      proxy_set_header X-Real-IP $remote_addr;\n");
    sbConfig.Append("      proxy_set_header REMOTE-HOST $remote_addr;\n");
    sbConfig.Append("      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n");
    sbConfig.Append("      proxy_pass " + address.value + ":" + addressPort.value + "/;\n");
    sbConfig.Append("  }\n\n");

    if (rows.value.length > 0) {
      rows.value.forEach((o) => {
        if (o.path.length > 0) {
          sbConfig.Append("  location /" + o.path.split("/")[o.path.split("/").length - 1] + " {\n");
          sbConfig.Append("      root   " + o.path + ";\n");
          sbConfig.Append("      proxy_pass " + address.value + ":" + o.port + "/;\n");
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
    if (rows.value.length > 0) {
      rows.value.forEach((o) => {
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
        ssl_certificate /usr/local/nginx/cert/ssl.crt;
        ssl_certificate_key /usr/local/nginx/cert/ssl.key;
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

<style lang="less" scoped>
.content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--c-text);
  //margin-top: calc(var(--w-space) * 3);

  a {
    color: #42b983;
  }
}

button {
  border: none;
}

input {
  width: 50%;
}
</style>
