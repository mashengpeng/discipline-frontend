<template>
  <el-button circle
             class='shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-16 lg:top-16'
             size='large' @click='visible = true'>
    <el-icon size='30'>
      <document-add/>
    </el-icon>
  </el-button>

  <div v-if="data?.length > 0">
    <el-drawer v-model='visible' :before-close='confirmAdd' :destroy-on-close='true' :withHeader='false'
               size='100%' title='编辑文章' @opened='renderEditor'>
      <div id='editContainer' class='shadow-2xl'>
      </div>

    </el-drawer>

    <div class='overflow-hidden'>
      <el-card v-for='article in data' :key='article.id' :body-style="{ padding: '0px' }"
               class='box-card border-0 m-1 p-4'
               shadow='hover'>
        <div class='flex justify-between w-full'>
          <div class='flex-auto w-0'>
            <div class='text-xl font-bold mb-4 hover:cursor-pointer' @click='$router.push(`/article/${article.id}`)'>
              {{ article.title }}
            </div>
            <div class='text-gray-400 text-sm'>
              发布于 : {{ dayjs(article.createTime).format('YYYY-MM-DD HH:mm') }}
              <el-divider direction='vertical'/>
              最近浏览 : {{ dayjs(article.updateTime).fromNow() }}
              <el-divider direction='vertical'/>
              <svg height='16px' style='display: inline' viewBox='0 0 1024 1024' width='16px'
                   xmlns='http://www.w3.org/2000/svg'>
                <path
                    d='M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z'
                    fill='currentColor'></path>
              </svg>
              {{ article.viewCount }}
              <span v-if='article.tag'>
              <el-divider direction='vertical'/>
              <el-space>
                <el-tag v-for="(e, index) in article.tag.split(',')"
                        class="hover:cursor-pointer"
                        @click="tagClick(e)">
                  {{ e }}
                </el-tag>
              </el-space>
            </span>
            </div>


            <div class='mt-4 w-full'>
              <el-text truncated>{{ article.content }}</el-text>
            </div>
          </div>
          <div v-if='article.id % 2 === 0' class='flex-none w-[150px] h-[150px] ml-4'>
            <el-image class='w-full h-full' fit='contain'
                      src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'></el-image>
          </div>
        </div>
      </el-card>
    </div>
  </div>
  <el-empty v-else class="mt-8" description="暂无文章"></el-empty>

</template>

<script setup>
import {ref, watchEffect} from 'vue';
import myAxios from '@/utils/http';
import http from '@/utils/http';
import {dayjs, ElMessageBox, ElNotification} from 'element-plus';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import {DocumentAdd} from '@element-plus/icons-vue';


import Cherry from 'cherry-markdown';
import 'cherry-markdown/dist/cherry-markdown.min.css';
import {useRoute, useRouter} from "vue-router";


dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const visible = ref(false);
const data = ref([]);
const newArticle = ref({content: ''});
const cherryInstance = ref(null);
const route = useRoute()
const router = useRouter()
const keyword = ref(route.query.keyword);

const tagClick = (e) => {
  router.push({path: '/article/list', query: {keyword: e}})
};


const renderEditor = () => {
  cherryInstance.value = new Cherry({
    id: 'editContainer',
    value: newArticle.value.content,
  });
};

const confirmAdd = (exit) => {
  newArticle.value.content = cherryInstance.value.getValue();
  if (newArticle.value.content === '') {
    exit();
    return;
  }
  ElMessageBox.confirm('需要上传吗, 不上传内容会保留在本地', '提示', {
    confirmButtonText: '上 传',
    cancelButtonText: '取 消',
    type: 'info',
  })
      .then(() => {
        upsertArticle();
        exit();
      })
      .catch(() => {
        exit();
      });
};

const upsertArticle = () => {
  http.post('/article/upsert', newArticle.value).then(
      (res) => {
        loadData();
        newArticle.value.content = '';
        ElNotification({
          title: '已上传',
          message: '新文章添加成功',
          type: 'success',
        });
      },
      () => {
      },
  );
};

const loadData = () => {
  let suffix = keyword.value ? '?keyword=' + keyword.value : ''
  myAxios.post(`/article/list${suffix}`).then(
      (res) => {
        data.value = res.data;
      },
      () => {
      },
  );
};

watchEffect(() => {
  loadData();
})


</script>

<style scoped>
.el-button {
  background-color: var(--el-button-bg-color, var(--el-color-white))
}
</style>