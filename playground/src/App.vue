<template>
  <AvatarList :images="images" />
</template>

<script setup lang="ts">
import { AvatarList } from 'vue-components'
import { ref } from 'vue'
const modules = import.meta.glob('./assets/images/headers/**/*.jpeg', {
  eager: true,
  import: 'default'
})

const images = ref([] as string[])
Object.keys(modules).forEach((key) => {
  const mod = modules[key] || ''
  images.value.push(mod as string)
})
</script>

<style scoped></style>
