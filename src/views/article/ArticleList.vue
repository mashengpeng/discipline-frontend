<template>
  <el-button circle
             class='no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] sm:right-[6rem] md:right-[10rem] lg:right-[14rem] xl:right-[18rem] 2xl:right-[26rem] 3xl:right-[500px] bottom-16 sm:top-16'
             size='large' @click='visible = true'>
    <el-icon size='30'>
      <document-add/>
    </el-icon>
  </el-button>

  <el-drawer v-model='visible' :before-close='confirmAdd' :destroy-on-close='true' :withHeader='false' size='100%'
             title='编辑文章' @opened='renderEditor'>
    <div id='editContainer'></div>
  </el-drawer>

  <div class='overflow-hidden'>
    <el-card v-for='article in data' :key='article.id' :body-style="{ padding: '0px' }"
             class='box-card border-0 m-1 p-4'
             shadow='hover' @click='router.push(`/article/${article.id}`)'>
      <div class='flex justify-between w-full'>
        <div class='flex-auto w-0'>
          <div class='text-xl font-bold mb-4'>{{ article.title }}</div>
          <div class='text-gray-400 text-sm'>
            {{ dayjs(article.createTime).format('YYYY-MM-DD HH:mm') }}
            <el-divider direction='vertical'/>
            更新于:{{ dayjs(article.updateTime).fromNow() }}
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
                <el-tag v-for="(e, index) in article.tag.split(',')">{{ e }}</el-tag>
              </el-space>
            </span>
          </div>


          <div class='mt-4 w-full'>
            <el-text truncated>{{ article.content }}</el-text>
          </div>
        </div>
        <div class='flex-none w-[150px] h-[150px] ml-4'>
          <el-image class='w-full h-full' fit='contain'
                    src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'></el-image>
        </div>
      </div>


    </el-card>


  </div>

</template>

<script setup>
import {ref} from 'vue';
import myAxios from '@/utils/http';
import http from '@/utils/http';
import {useRouter} from 'vue-router';
import {dayjs, ElMessageBox, ElNotification} from 'element-plus';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import {DocumentAdd} from '@element-plus/icons-vue';


import Cherry from 'cherry-markdown';
import 'cherry-markdown/dist/cherry-markdown.min.css';


dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const visible = ref(false);
const router = useRouter();
const data = ref([]);
const newArticle = ref({content: ''});
const cherryInstance = ref(null);

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
  ElMessageBox.confirm('需要上传吗?', '提示', {
    confirmButtonText: '上传',
    cancelButtonText: '取消',
    type: 'warning',
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
  myAxios.post('/article/list').then(
      (res) => {
        data.value = res.data;
      },
      () => {
      },
  );
};
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