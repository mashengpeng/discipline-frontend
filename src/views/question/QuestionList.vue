<template>
  <el-button circle
             class='flex-1 border-0 shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-16 lg:top-16'
             size='large' @click='showAdd'>
    <el-icon size='30'>
      <circle-plus/>
    </el-icon>
  </el-button>

  <el-button
      circle
      class='no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-32 lg:top-32'
      size='large' @click='$router.push("/question/random")'>
    <el-icon size='30'>
      <refresh-left/>
    </el-icon>
  </el-button>

  <el-dialog
      v-model="addVisible"
      :title="text.title[progress]"
      width="900px"
  >
    <el-input v-if="progress === 0" v-model="importContent" :autosize="{ minRows: 20, maxRows: 20}" autosize
              placeholder="请输入内容" type="textarea">
    </el-input>
    <div v-else>
      <el-checkbox v-for="e in confirmContent" v-model="e.checked" :label="e.title" class="block"
                   size="large"></el-checkbox>
    </div>


    <template #footer>
      <div class="w-full">
        <el-steps :active="progress" :space="200" finish-status="success" simple>
          <el-step icon="el-icon-edit" title="添加"></el-step>
          <el-step icon="el-icon-upload" title="确认"></el-step>
        </el-steps>
      </div>
      <el-button v-show="progress !== 0" size="large" style="margin-top: 12px;" @click="prev">上一步</el-button>
      <el-button class="mt-4" size="large" @click="next">{{ text.button[progress] }}</el-button>
    </template>

  </el-dialog>


  <el-card v-for='question in data' :key='question.id' :body-style="{ padding: '0px' }"
           class='box-card border-0 m-1 p-4'
           shadow='hover'>
    <div class='hover:cursor-pointer' @click='$router.push(`/question/${question.id}`)'>
      {{ question.title }}
    </div>

  </el-card>
</template>

<script setup>
import {ref} from 'vue'
import http from '@/utils/http'
import {CirclePlus, RefreshLeft} from "@element-plus/icons-vue";
import {ElNotification} from "element-plus";

const data = ref(null);
const addVisible = ref(false);
const importContent = ref("")
const progress = ref(0)
const confirmContent = ref([])
const text = ref({title: ['导入问题', '选择导入'], button: ['下一步', '确认']})

const showAdd = () => {
  addVisible.value = true;
  progress.value = 0;
}
const loadData = () => {
  http.post("/question/list").then(
      (res) => {
        data.value = res.data;
      },
      () => {
      }
  );
}
loadData();

const prev = () => {
  if (progress.value !== 0) {
    progress.value = progress.value - 1;
  }
}

const next = () => {
  if (progress.value === 0) {
    confirmContent.value = [];
    importContent.value.split("\n").filter((item) => item.trim() !== "").forEach(item => {
      confirmContent.value.push({
        title: item,
        checked: true,
      })
    })
    if (confirmContent.value.length === 0) {
      ElNotification({
        title: '请输入内容',
        type: 'info',
      });
      return;
    }
    progress.value = progress.value + 1;
    return;
  }
  http.post("/question/import/list", confirmContent.value).then(
      (res) => {
        addVisible.value = false;
        loadData()
        importContent.value = ""
        ElNotification({
          title: '导入成功',
          type: 'success',
        });
      },
      () => {
      }
  );
}

</script>

<style scoped>

</style>