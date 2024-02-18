<template>
  <AvatarList :images="images" />
  <el-row>
    支持所有Iconify sets：
    <el-link href="https://icon-sets.iconify.design/">Iconify</el-link>
  </el-row>
  <div>直接使用icon="{collection}:{name}"的方式进行使用</div>
  <span> icon: <Iconify :icon="iconRef" :style="style"></Iconify> </span>
  <p></p>
  <IconPicker @submit="handleSubmit"></IconPicker>
</template>

<script setup lang="ts">
import { AvatarList, IconPicker } from 'vue-components'
import { ref } from 'vue'
import type { CSSProperties } from 'vue'

const iconRef = ref('ep:qian')
const style = ref<CSSProperties>({})
const images = ref([] as string[])

const handleSubmit = (data: any) => {
  const { icon, fontSize, color } = data
  iconRef.value = icon
  style.value = {
    fontSize: `${fontSize}px`,
    color
  }
}
const modules = import.meta.glob('./assets/images/headers/**/*.jpeg', {
  eager: true,
  import: 'default'
})

Object.keys(modules).forEach((key) => {
  const mod = modules[key] || ''
  images.value.push(mod as string)
})
</script>

<style scoped></style>
