<template>
  <div>
    <el-card class="box-card border-0 m-1" shadow="hover" v-for="article in data" :key="article.id">
      <div class="flex justify-between w-full">
        <div>
          <header class="text-xl font-bold">{{ article.title }}</header>
          <el-space spacer="|">
            <span>{{ dayjs(article.updateTime).fromNow() }}</span>
            <span>{{ article.tag }}</span>
          </el-space>
          <div class="w-[800px] mt-4">
            <el-text truncated>{{ article.content }}</el-text>
          </div>
        </div>
        <div class="">
          <el-image class="w-[150px] h-[150px]"  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
        </div>
      </div>


    </el-card>


  </div>

</template>

<script setup>
import {ref} from 'vue'
import myAxios from '@/utils/http'
import {useRouter} from "vue-router";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

const data = ref([]);
const loadData = () => {
  myAxios.post("/article/list").then(
      (res) => {
        console.log(res)
        data.value = res.data;
      },
      () => {
      }
  );
}
loadData();

const router = useRouter();
const jump_to_article_detail = (id) => {
  router.push({
    path: `/article/${id}`
  })
}
</script>

<style scoped>

</style>