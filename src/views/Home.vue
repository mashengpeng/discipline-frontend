<script setup>
import {ref} from 'vue'

const value = ref(new Date())
</script>

<template>

  <div>
    <el-calendar v-model="value"/>
    <el-calendar v-model="value"/>
    <el-calendar v-model="value"/>
    <el-calendar v-model="value"/>
  </div>


</template>

<style scoped>

</style>