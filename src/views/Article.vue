<template>
  <div class="p-4">
    <!--    <el-page-header @back="router.back()" :content="data.title" > </el-page-header>-->


    <div>
      <h1 class="text-3xl font-bold mb-4">{{ data.title }}</h1>
      <div class="">{{ data.content }}</div>
    </div>


    <div class="flex justify-evenly mt-8">
      <el-button @click="" class="flex-1 border-0">上一篇</el-button>
      <el-button @click="" class="flex-1 border-0">赞</el-button>
      <el-button @click="" class="flex-1 border-0">评论</el-button>
      <el-button @click="" class="flex-1 border-0">下一篇</el-button>
    </div>


  </div>

</template>
<script setup>

import {ref} from 'vue'
import myAxios from '@/utils/http'
import {useRoute, useRouter} from "vue-router";
import {CaretLeft} from "@element-plus/icons-vue";

const data = ref([]);
const route = useRoute();
const router = useRouter();
const loadData = () => {
  myAxios.post(`/article/${route.params.id}`).then(
      (res) => {
        console.log(res)
        data.value = res.data;
      },
      () => {
      }
  );
}
loadData();
</script>


<style scoped>

</style>