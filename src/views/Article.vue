<template>
  <el-button circle
             class='no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] sm:right-[6rem] md:right-[10rem] lg:right-[14rem] xl:right-[18rem] 2xl:right-[26rem] bottom-16 sm:top-16'
             size='large' @click='visible = true'>
    <el-icon size='30'>
      <edit />
    </el-icon>
  </el-button>

  <el-button circle
             class='no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] sm:right-[6rem] md:right-[10rem] lg:right-[14rem] xl:right-[18rem] 2xl:right-[26rem] bottom-32 sm:top-32'
             size='large' @click='deleteArticle'>
    <el-icon size='30'>
      <delete />
    </el-icon>
  </el-button>

  <el-drawer v-model='visible' :destroy-on-close='true' :withHeader='false' class='' size='100%' title='编辑文章'
             @close='upsertArticle' @opened='renderEditor'>
    <div id='editContainer'></div>
  </el-drawer>

  <div class='p-4'>
    <div id='previewContainer'></div>
    <div class='flex justify-evenly mt-8'>
      <el-button class='flex-1 border-0' @click="previewCherry.setValue('asdfsdf') ">上一篇</el-button>
      <el-button class='flex-1 border-0' @click=''>赞</el-button>
      <el-button class='flex-1 border-0' @click=''>评论</el-button>
      <el-button class='flex-1 border-0' @click=''>下一篇</el-button>
    </div>

  </div>

</template>
<script setup>

import { onMounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Delete, Edit } from '@element-plus/icons-vue';
import http from '@/utils/http';
import Cherry from 'cherry-markdown';
import 'cherry-markdown/dist/cherry-markdown.min.css';


const data = ref({ content: '' });
const route = useRoute();
const router = useRouter();
const visible = ref(false);
const previewCherry = ref(null);
const editCherry = ref(null);

const upsertArticle = () => {
  data.value.content = editCherry.value.getValue();
  http.post('/article/upsert', data.value).then(
    (res) => {
      loadData();
    },
    () => {
    },
  );
};

const deleteArticle = () => {
  http.post('/article/delete', data.value).then(
    (res) => {
      router.push('/article/list');
    },
    () => {
    },
  );
};

const loadData = async () => {
  await http.post(`/article/${route.params.id}`).then(
    (res) => {
      data.value = res.data;
      previewCherry.value.setValue('');
      previewCherry.value.setValue(data.value.content);
    },
    () => {
    },
  );
};

onMounted(() => {
  previewCherry.value = new Cherry({
    id: 'previewContainer',
    value: '',
    toolbars: {
      toolbar: false,
    },
    editor: {
      defaultModel: 'previewOnly',
    },
    isPreviewOnly: true,
    forceAppend: false,
  });
  loadData();
});

const renderEditor = () => {
  editCherry.value = new Cherry({
    id: 'editContainer',
    value: data.value.content,
  });
};


watchEffect(() => {
});

</script>


<style>
.cherry-previewer {
  border-left: none;
  background-color: white;
}

.cherry {
  box-shadow: none;
  background-color: white;
}
</style>