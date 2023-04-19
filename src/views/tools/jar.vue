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
                    <n-input type="text" placeholder="容器名称 例:[xxx_jar]"
                             v-model:value="name"
                             @input="input()"/>
                </n-layout-content>
                <n-layout-content content-style="padding: 5px;">
                    <n-input type="text" placeholder="容器目录 例:[/home/app/xxx_jar]"
                             v-model:value="jar" @input="input"/>
                </n-layout-content>
                <n-layout-content content-style="padding: 5px;">
                    <n-input type="text" placeholder="容器端口 例:[8080]"
                             v-model:value="port" @input="input"/>
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
// import logo from '@/assets/img/logo.png'
import {ref, onMounted} from "vue";

onMounted(() => {
    input();
});

let name = ref("serve_jar");
let jar = ref("/home/app/serve_jar/jar");
let port = ref("8080");
let command = ref("");

/*function copy() {
  // const txt = document.getElementById('code').innercommand
  // 添加一个input元素放置需要的文本内容
  const dataContainer = document.createElement("input");
  dataContainer.value = command.value;
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
    sbHtml.Append("  -v " + jar.value + ":/root \\\n");
    sbHtml.Append("  -p " + port.value + ":8080 \\\n");
    sbHtml.Append("  -e TZ=Asia/Shanghai \\\n");
    sbHtml.Append("  -d 15588855251/webjar");

    command.value = sbHtml.ToString();

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
.n-layout-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/*.content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--c-text);
  margin-top: calc(var(--w-space) * 3);

  a {
    color: #42b983;
  }
}*/

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
