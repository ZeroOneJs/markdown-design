<template>
  <div>
    <vmd-render :src="md" :plugins="headers" @envChange="onEnvChange" />

    <div>
      <p>获取的 env：</p>
      <pre>{{ envInfo }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { headers, type MditHeadersEnv } from '@markdown-design/markdown-it-headers'

const envInfo = ref<MditHeadersEnv>({})

const md = `
# 蜀相

丞相祠堂何处寻？锦官城外柏森森。

映阶碧草自春色，隔叶黄鹂空好音。

三顾频烦天下计，两朝开济老臣心。

出师未捷身先死，长使英雄泪满襟。
`

// 可参考 markdown-it 原生写法
// https://github.com/ZeroOneJs/markdown-design/blob/main/packages/markdown-it-headers/README.zh-CN.md#使用
const onEnvChange = (env: MditHeadersEnv) => {
  envInfo.value = env
}
</script>
