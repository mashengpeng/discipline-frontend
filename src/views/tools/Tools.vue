<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>

  <el-space class='mt-16' size='large' wrap>
    <el-card class='w-[150px] h-[200px] flex justify-center items-center text-xl' shadow='hover'
             @click="router.push('/tools/calendar')">日历
    </el-card>
    <el-card class='w-[150px] h-[200px] flex justify-center items-center text-xl' shadow='hover'
             @click="router.push('/tools/formatter')">JSON格式化
    </el-card>
    <el-card class='w-[150px] h-[200px] flex justify-center items-center text-xl' shadow='hover'
             @click="router.push('/tools/diff')">文本对比
    </el-card>
    <el-card class='w-[150px] h-[200px] flex justify-center items-center text-xl' shadow='hover'
             @click="router.push('/tools/todo')">代办事项
    </el-card>
  </el-space>


</template>

<style scoped>

</style>