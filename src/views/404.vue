<script setup>

import { ref } from 'vue';
import { Finished } from '@element-plus/icons-vue';

const x = ref(false);
</script>

<template>
  <div v-if='x' class='test h-96 w-96'></div>
  <el-button @click='x = !x'>111</el-button>
  <el-icon size='30'>
    <finished />
  </el-icon>
</template>

<style scoped>
.test {
  background-color: red;
}
</style>