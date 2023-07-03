<script setup>
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="flex mt-16 wrap">
    <el-space>
      <el-card class="w-[250px] h-[300px] flex justify-center items-center text-4xl" shadow="hover"
               @click="router.push('/tools/calendar')">日历
      </el-card>
    </el-space>

  </div>


</template>

<style scoped>

</style>