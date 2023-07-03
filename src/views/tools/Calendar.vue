<template>
  <div>
    <el-calendar v-model='value'/>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const value = ref(new Date());
</script>


<style scoped>

</style>