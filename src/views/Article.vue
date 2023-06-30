<template>
  <el-button size="large"
             class="no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] sm:right-[6rem] md:right-[10rem] lg:right-[14rem] xl:right-[18rem] 2xl:right-[26rem] bottom-16 sm:top-16"
             @click="visible = true" circle>
    <el-icon size="30">
      <edit/>
    </el-icon>
  </el-button>

  <el-drawer title="编辑文章" v-model="visible" class="" size="100%" @opened="renderEditor" :withHeader="false">
    <div id="editContainer" class="vditor vditor--fullscreen"></div>
  </el-drawer>

  <div class="p-4">
    <div id="preview"></div>
    <div class="flex justify-evenly mt-8">
      <el-button @click="" class="flex-1 border-0">上一篇</el-button>
      <el-button @click="" class="flex-1 border-0">赞</el-button>
      <el-button @click="" class="flex-1 border-0">评论</el-button>
      <el-button @click="" class="flex-1 border-0">下一篇</el-button>
    </div>

  </div>

</template>
<script setup>

import {ref, watchEffect} from 'vue'
import myAxios from '@/utils/http'
import {useRoute, useRouter} from "vue-router";
import {Edit} from "@element-plus/icons-vue";
import http from '@/utils/http'
import Vditor from "vditor";
import "vditor/dist/index.css";

const data = ref([]);
const route = useRoute();
const router = useRouter();
const visible = ref(false);
const vditor = ref(null);
const upsertArticle = () => {
  http.post("/article/upsert", data.value).then(
      (res) => {
        // visible.value = false
        loadData();
      },
      () => {
      }
  );
}

const renderEditor = () => {
  vditor.value = new Vditor("editContainer", {
    cache: {
      enable: false
    },
    counter: {
      enable: true,
      type: 'text'
    },
    typewriterMode: true,
    value: data.value.content,
    mode: "ir",
    toolbarConfig: {
      pin: true
    },
    fullscreen: {
      index: 999
    },
    after: () => {
      // vditor.value.vditor.toolbar.elements.fullscreen.firstElementChild.dispatchEvent(new Event("click"));
    },
    blur(value) {
      data.value.content = value
      upsertArticle()
    }
  })
}

const loadData = () => {
  myAxios.post(`/article/${route.params.id}`).then(
      (res) => {
        data.value = res.data;
        Vditor.preview(document.getElementById("preview"), data.value.content, {
          anchor: 0,
          hljs: {
            enable: true,  // 代码高亮
            style: 'github',
            lineNumber: true
          },
          speech: {
            enable: true
          },
          markdown: {toc: true},
          theme: {
            current: 'ant-design'
          }
        })
      },
      () => {
      }
  );
}


watchEffect(() => {

})
loadData();
</script>


<style scoped>
.no-transparent {
  background-color: var(--el-button-bg-color, var(--el-color-white))
}

:deep(.el-drawer__body) {
  padding: 0
}
</style>