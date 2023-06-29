<template>
  <div class="overflow-hidden">
    <el-card class="box-card border-0 m-1 p-4" :body-style="{ padding: '0px' }" shadow="hover" v-for="article in data"
             :key="article.id">
      <div class="flex justify-between w-full">
        <div class="flex-auto w-0">
          <header class="text-xl font-bold mb-4">{{ article.title }}</header>

          <span>{{ dayjs(article.updateTime).fromNow() }}</span>
          <el-divider direction="vertical"/>
          <el-space>
            <el-tag v-for="(e, index) in article.tag.split(',')">{{ e }}</el-tag>
          </el-space>
          <div class="mt-4 w-full">
            <el-text truncated>{{ article.content }}</el-text>
          </div>
        </div>
        <div class="flex-none w-[150px] h-[150px] ml-4">
          <el-image fit="contain" class="w-full h-full"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
        </div>
      </div>


    </el-card>


  </div>

</template>

<script setup>
import {ref} from 'vue'
import myAxios from '@/utils/http'
import {useRouter} from "vue-router";
import {dayjs} from "element-plus";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

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