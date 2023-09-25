<script setup lang='ts'>
import {onMounted, ref} from 'vue'

onMounted(() => {
  input()
  setTimeout(() => {
    resize()
  }, 1)
})
const name = ref('xxx_mysql')
const mysql = ref('/home/app/xxx_mysql/mysql')
const port = ref('3306')
const pwd = ref('system')
const command = ref('')

function input() {
  const sbHtml = new StringBuffer()
  sbHtml.Append('docker run \\\n')
  sbHtml.Append(`  --name ${name.value} \\\n`)
  sbHtml.Append('  --privileged=true \\\n')
  sbHtml.Append('  --restart=always \\\n')
  sbHtml.Append(`  -v ${mysql.value}:/var/lib/mysql \\\n`)
  sbHtml.Append(`  -p ${port.value}:3306 \\\n`)
  sbHtml.Append(`  -e MYSQL_ROOT_PASSWORD=${pwd.value} \\\n`)
  sbHtml.Append('  -e TZ=Asia/Shanghai \\\n')
  sbHtml.Append('  -d mysql:5.7.28 \\\n')
  sbHtml.Append('  --lower_case_table_names=1')
  command.value = sbHtml.ToString()
  resize()
}

function resize() {
  const textarea = document.getElementById('textarea')
  textarea.style.height = `${textarea.scrollHeight}px`
}

class StringBuffer {
  private __strings__: any[]

  constructor() {
    this.__strings__ = []
  }

  Append(str: string) {
    this.__strings__.push(str)
    return this
  }

  ToString() {
    return this.__strings__.join('')
  }
}
</script>

<template>

  <h1>This is a Mysql config.</h1>
  <div>
    <input
      v-model="name"
      placeholder="容器名称 例:[xxx_mysql]"
      p="x-4 y-2"
      border="~ rounded gray-200 dark:gray-700"
      class="text"
      @input="input()"
    >
  </div>
  <div>
    <input
      v-model="mysql"
      placeholder="容器目录 例:[/home/app/xxx_mysql]"
      p="x-4 y-2"
      border="~ rounded gray-200 dark:gray-700"
      class="text"
      @input="input()"
    >
  </div>
  <div>
    <input
      v-model="port"
      placeholder="容器端口 例:[3306]"
      p="x-4 y-2"
      border="~ rounded gray-200 dark:gray-700"
      class="text"
      @input="input()"
    >
  </div>
  <div>
    <input
      v-model="pwd"
      placeholder="容器密码 例:[system]"
      p="x-4 y-2"
      border="~ rounded gray-200 dark:gray-700"
      class="text"
      @input="input()"
    >
  </div>
  <div>
      <textarea
        id="textarea"
        v-model="command"
        bg="transparent"
        placeholder="命令"
        p="x-4 y-2"
        border="~ rounded gray-200 dark:gray-700"
        class="text"
        @input="resize()"
      />
  </div>
</template>

<style>
.text {
  width: 50%;
  overflow: hidden;
  resize: none;
  border: 1px solid #000000;
  background-color: transparent;
  margin: 5px;
}
</style>
