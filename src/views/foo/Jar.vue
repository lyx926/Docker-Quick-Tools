<template>
  <div class="content">
    <!--    <img alt='Vue logo' :src='logo' />-->
    <p>This is a Jar config.</p>
    <router-link to="/">Go Back</router-link>
    <h1> parameters</h1>
    <div><input placeholder="请输入容器名称" v-model="name" @input="input" />
    </div>
    <div><input placeholder="请输入容器目录" v-model="jar" @input="input" />
    </div>
    <div><input placeholder="请输入容器端口" v-model="port" @input="input"
                type="number" />
    </div>
    <h1>command</h1>
    <div>
      <textarea style="width: 50%;" rows="15" v-model="text"></textarea>
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

let name = ref("jar_server");
let jar = ref("/home/app/jar_server/jar");
let port = ref("8080");
let text = ref("");

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

function input() {
  let sbHtml = new StringBuffer();
  sbHtml.Append("docker run \\\n");
  sbHtml.Append("  --name " + name.value + " \\\n");
  sbHtml.Append("  --privileged=true \\\n");
  sbHtml.Append("  --restart=always \\\n");
  sbHtml.Append("  -v " + jar.value + ":/var/lib/mysql \\\n");
  sbHtml.Append("  -p " + port.value + ":8080 \\\n");
  sbHtml.Append("  -e TZ=Asia/Shanghai \\\n");
  sbHtml.Append("  -d 15588855251/web-jar");

  text.value = sbHtml.ToString();

  /*
  docker run \
  --name ${java_app_name} \
  --privileged=true \
  --restart=always \
  -v ${server_home}/jarhome:/root \
  -p ${java_port}:8080 \
  -e TZ=Asia/Shanghai \
  -d ${group_name}/${java_app_name}:${app_version}
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

// let __strings__ = ref([]);
/*function StringBuffer() {
  __strings__.value = [];
};*/
/*StringBuffer.prototype.Append = function(str) {
  __strings__.value.push(str);
  return this;
};*/
//格式化字符串
/*StringBuffer.prototype.AppendFormat = function(str) {
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
  margin-top: calc(var(--w-space) * 3);

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
