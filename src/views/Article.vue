<template>
  <el-button size="large"
             class="no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] sm:right-[6rem] md:right-[10rem] lg:right-[14rem] xl:right-[18rem] 2xl:right-[26rem] bottom-16 sm:top-16"
             @click="visible = true" circle>
    <el-icon size="30">
      <edit/>
    </el-icon>
  </el-button>


  <el-dialog title="编辑文章" v-model="visible" draggable center>
    <el-form :model="data" ref="formRef">
      <el-form-item label="标题" class="ml-16 mr-16" prop="title">
        <el-input v-model="data.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" class="ml-16 mr-16" prop="content">
        <el-input type="textarea" v-model="data.content" :rows="20"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="upsertArticle">确 定</el-button>
    </span>
    </template>
  </el-dialog>


  <div class="p-4">
    <!--    <el-page-header @back="router.back()" :content="data.title" > </el-page-header>-->


    <div>
      <h1 class="text-3xl font-bold mb-4">{{ data.title }}</h1>
      <el-text>{{ data.content }}</el-text>
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
import {CaretLeft, DocumentAdd, Edit} from "@element-plus/icons-vue";
import http from '@/utils/http'

const data = ref([]);
const route = useRoute();
const router = useRouter();
const visible = ref(false);
const upsertArticle = () => {
  http.post("/article/upsert", data.value).then(
      (res) => {
        data.value = res.data;
        visible.value = false
        loadData();
      },
      () => {
      }
  );
}

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
.no-transparent {
  background-color: var(--el-button-bg-color, var(--el-color-white))
}
</style>