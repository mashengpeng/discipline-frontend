<template>
  <el-space :size="50">
    <el-switch v-model="mode" active-color="#13ce66" active-text="并排" active-value="split"
               inactive-color="#ff4949" inactive-text="统一"
               inactive-value="unified"/>

    <el-switch v-model="folding" active-color="#13ce66" active-text="折叠" inactive-color="#ff4949"
               inactive-text="展开"/>
  </el-space>


  <el-divider/>
  <div class="flex justify-evenly">
    <el-input v-model="prev" :rows="10" class="w-[400px]" clearable placeholder="请输入内容" type="textarea"/>
    <el-input v-model="current" :rows="10" class="w-[400px]" clearable placeholder="请输入内容" type="textarea"/>
  </div>
  <el-divider/>
  <DiffViewer
      :current="current"
      :folding="folding"
      :mode="mode"
      :prev="prev"
      theme="light"
  />
</template>

<script setup>

import {ref} from "vue";


const prev = ref("")
const current = ref("")
const folding = ref(false)
const mode = ref("split")

</script>

<style scoped>

</style>