<script setup>

import {ref} from 'vue'

const x = ref(false)
</script>

<template>
  <div class="test h-96 w-96" v-if="x"></div>
  <el-button @click="x = !x">111</el-button>
</template>

<style scoped>
.test {
  background-color: red;
}
</style>