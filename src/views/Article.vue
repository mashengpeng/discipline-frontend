<template>
  <el-button size="large"
             class="no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] sm:right-[6rem] md:right-[10rem] lg:right-[14rem] xl:right-[18rem] 2xl:right-[26rem] bottom-16 sm:top-16"
             @click="visible = true" circle>
    <el-icon size="30">
      <edit/>
    </el-icon>
  </el-button>

  <el-drawer title="编辑文章" v-model="visible" class="" size="100%" @opened="renderEditor" :withHeader="false"
             :destroy-on-close="true" @close="upsertArticle">
    <div id="editContainer"></div>
  </el-drawer>

  <div class="p-4">
    <div id="previewContainer"></div>
    <div class="flex justify-evenly mt-8">
      <el-button @click="previewCherry.setValue('asdfsdf') " class="flex-1 border-0">上一篇</el-button>
      <el-button @click="" class="flex-1 border-0">赞</el-button>
      <el-button @click="" class="flex-1 border-0">评论</el-button>
      <el-button @click="" class="flex-1 border-0">下一篇</el-button>
    </div>

  </div>

</template>
<script setup>

import {onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, ref, watchEffect} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {Edit} from "@element-plus/icons-vue";
import http from '@/utils/http'
import Cherry from 'cherry-markdown'
import 'cherry-markdown/dist/cherry-markdown.min.css'


const data = ref({content: ""});
const route = useRoute();
const router = useRouter();
const visible = ref(false);
const previewCherry = ref(null)
const editCherry = ref(null)

const upsertArticle = () => {
  data.value.content = editCherry.value.getValue()
  http.post("/article/upsert", data.value).then(
      (res) => {
        loadData();
      },
      () => {
      }
  );
}
const loadData = async () => {

  await http.post(`/article/${route.params.id}`).then(
      (res) => {
        data.value = res.data;
        previewCherry.value.setValue(data.value.content);
      },
      () => {
      }
  );
}
console.log("initial cherry")


onMounted(() => {
  previewCherry.value = new Cherry({
    id: 'previewContainer',
    value: "",
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
})

const renderEditor = () => {
  editCherry.value = new Cherry({
    id: 'editContainer',
    value: data.value.content
  });
}


watchEffect(() => {
})

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