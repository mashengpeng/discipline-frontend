<template>
  <el-button size="large"
             class="no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] sm:right-[6rem] md:right-[10rem] lg:right-[14rem] xl:right-[18rem] 2xl:right-[26rem] bottom-16 sm:top-16"
             @click="visible = true" circle>
    <el-icon size="30">
      <document-add/>
    </el-icon>
  </el-button>


  <el-dialog title="新文章" v-model="visible" draggable>
    <el-form :model="article" ref="formRef">
      <el-form-item label="标题" class="ml-16 mr-16" prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" class="ml-16 mr-16" prop="content">
        <el-input type="textarea" v-model="article.content" :rows="20"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="upsertArticle">确 定</el-button>
    </span>
    </template>
  </el-dialog>


  <div class="overflow-hidden">
    <el-card class="box-card border-0 m-1 p-4" :body-style="{ padding: '0px' }" shadow="hover" v-for="article in data"
             :key="article.id" @click="router.push(`/article/${article.id}`)">
      <div class="flex justify-between w-full">
        <div class="flex-auto w-0">
          <h1 class="text-xl font-bold mb-4">{{ article.title }}</h1>

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
import {DocumentAdd} from "@element-plus/icons-vue";
import http from "@/utils/http";

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const visible = ref(false);

const data = ref([]);
const article = ref({});

const upsertArticle = () => {
  http.post("/article/upsert", article.value).then(
      (res) => {
        data.value = res.data;
        visible.value = false
        article.value = {}
        loadData();
      },
      () => {
      }
  );
}

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

const cancel = () => {
  article.value = {}
}

const router = useRouter();
const jump_to_article_detail = (id) => {
  router.push({
    path: `/article/${id}`
  })
}
</script>

<style scoped>
.no-transparent {
  background-color: var(--el-button-bg-color, var(--el-color-white))
}
</style>