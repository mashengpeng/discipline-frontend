<template>
  <el-button size="large"
             class="no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] sm:right-[6rem] md:right-[10rem] lg:right-[14rem] xl:right-[18rem] 2xl:right-[26rem] bottom-16 sm:top-16"
             @click="visible = true" circle>
    <el-icon size="30">
      <document-add/>
    </el-icon>
  </el-button>

  <el-drawer title="编辑文章" v-model="visible" size="100%" @opened="renderEditor" :withHeader="false"
             :destroy-on-close="true" @close="upsertArticle">
    <div id="editContainer"></div>
  </el-drawer>


  <div class="overflow-hidden">
    <el-card class="box-card border-0 m-1 p-4" :body-style="{ padding: '0px' }" shadow="hover" v-for="article in data"
             :key="article.id" @click="router.push(`/article/${article.id}`)">
      <div class="flex justify-between w-full">
        <div class="flex-auto w-0">
          <div class="text-xl font-bold mb-4">{{ article.title }}</div>
          <span>{{ dayjs(article.createTime).format('YYYY-MM-DD HH:mm') }}</span>
          <el-divider direction="vertical"/>
          <span>更新于:{{ dayjs(article.updateTime).fromNow() }}</span>
          <span v-if="article.tag">
            <el-divider direction="vertical"/>
            <el-space>
              <el-tag v-for="(e, index) in article.tag.split(',')">{{ e }}</el-tag>
            </el-space>
          </span>
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
import Cherry from 'cherry-markdown';
import 'cherry-markdown/dist/cherry-markdown.min.css'


dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const visible = ref(false);
const router = useRouter();
const data = ref([]);
const newArticle = ref({content: ""});
const cherryInstance = ref(null);

const renderEditor = () => {
  cherryInstance.value = new Cherry({
    id: 'editContainer',
  });
}

const upsertArticle = () => {
  newArticle.value.content = cherryInstance.value.getValue();
  http.post("/article/upsert", newArticle.value).then(
      (res) => {
        loadData();
      },
      () => {
      }
  );
}

const loadData = () => {
  myAxios.post("/article/list").then(
      (res) => {
        data.value = res.data;
      },
      () => {
      }
  );
}
loadData();
</script>

<style>
.no-transparent {
  background-color: var(--el-button-bg-color, var(--el-color-white))
}

.el-drawer__body {
  padding: 0;
}
</style>