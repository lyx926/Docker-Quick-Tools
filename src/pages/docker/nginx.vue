<script setup lang='ts'>
import {onMounted, ref} from 'vue'

onMounted(() => {
  input()
  setTimeout(() => {
    resize()
  }, 1)
})
const name = ref('xxx_jar')
const jar = ref('/home/app/xxx_jar/jar')
const port = ref('8080')
const command = ref('')

function input() {
  const sbHtml = new StringBuffer()
  sbHtml.Append('docker run \\\n')
  sbHtml.Append(`  --name ${name.value} \\\n`)
  sbHtml.Append('  --privileged=true \\\n')
  sbHtml.Append('  --restart=always \\\n')
  sbHtml.Append(`  -v ${jar.value}:/root \\\n`)
  sbHtml.Append(`  -p ${port.value}:8080 \\\n`)
  sbHtml.Append('  -e TZ=Asia/Shanghai \\\n')
  sbHtml.Append('  -d 15588855251/webjar')
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
  <h1>This is a Jar config.</h1>
  <div>
    <input
      v-model="name"
      placeholder="容器名称 例:[xxx_jar]"
      p="x-4 y-2"
      border="~ rounded gray-200 dark:gray-700"
      class="text"
      @input="input()"
    >
  </div>
  <div>
    <input
      v-model="jar"
      placeholder="容器目录 例:[/home/app/xxx_jar]"
      p="x-4 y-2"
      border="~ rounded gray-200 dark:gray-700"
      class="text"
      @input="input()"
    >
  </div>
  <div>
    <input
      v-model="port"
      placeholder="容器端口 例:[8080]"
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
