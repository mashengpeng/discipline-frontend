<template>
  <el-button circle
             class='no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-16 lg:top-16'
             size='large' @click='$router.push("/question/list")'>
    <el-icon size='30'>
      <list/>
    </el-icon>
  </el-button>

  <el-button circle
             class='no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-32 lg:top-32'
             size='large' @click='editVisible = true'>
    <el-icon size='30'>
      <edit/>
    </el-icon>
  </el-button>

  <el-button circle
             class='no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-48 lg:top-48'
             size='large' @click='searchQuestion'>
    <el-icon size='30'>
      <search/>
    </el-icon>
  </el-button>

  <el-button circle
             class='no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-64 lg:top-64'
             size='large' @click='foldAnswer = !foldAnswer'>
    <el-icon size='30'>
      <magic-stick/>
    </el-icon>
  </el-button>

  <el-button v-if="$route.params.x === 'random'"
             circle
             class='no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-80 lg:top-80'
             size='large' @click='loadData'>
    <el-icon size='30'>
      <refresh-left/>
    </el-icon>
  </el-button>


  <el-dialog
      v-model="editVisible"
      :before-close="showDiff"
      title="编辑答案"
      width="35%"
  >
    <el-input v-model="editedQuestion.answer" autosize placeholder="请输入内容" type="textarea">
    </el-input>
  </el-dialog>

  <el-dialog
      v-model="diffVisible"
      :before-close="confirmEdit"
      title="确认"
      width="35%"
  >
    <Diff
        :current='editedQuestion.answer'
        :folding='true'
        :prev='question.answer'
        mode='split'
        theme='light'
    />
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="diffVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateQuestion">确 定</el-button>
    </span>
    </template>
  </el-dialog>


  <div class='text-xl font-bold mt-8 mb-4'>
    {{ question.title }}
  </div>

  <div class='text-gray-400 text-sm mb-4'>
    {{ dayjs(question.createTime).format('YYYY-MM-DD HH:mm') }}
    <el-divider direction='vertical'/>
    更新于:{{ dayjs(question.updateTime).fromNow() }}
    <el-divider direction='vertical'/>
    <svg height='16px' style='display: inline' viewBox='0 0 1024 1024' width='16px'
         xmlns='http://www.w3.org/2000/svg'>
      <path
          d='M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z'
          fill='currentColor'></path>
    </svg>
    {{ question.viewCount }}
    <span v-if='question.tag'>
      <el-divider direction='vertical'/>
      <el-space>
        <el-tag v-for="(e, index) in question.tag.split(',')">{{ e }}</el-tag>
      </el-space>
    </span>

  </div>


  <el-text v-if="!foldAnswer" class="whitespace-pre-wrap" size="large">
    {{ question.answer }}
  </el-text>


</template>

<script setup>
import {ref} from 'vue'
import http from '@/utils/http'
import {useRoute, useRouter} from "vue-router";
import {dayjs, ElNotification} from "element-plus";
import relativeTime from 'dayjs/plugin/relativeTime';
import {Edit, List, MagicStick, RefreshLeft, Search} from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();
const question = ref({});
const foldAnswer = ref(true);
const editVisible = ref(false);
const diffVisible = ref(false);
const editedQuestion = ref({})

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const searchQuestion = () => {
  window.open(`https://www.google.com/search?q=${question.value.title}`)
}


const showDiff = (exit) => {
  exit();
  if (question.value.answer === editedQuestion.value.answer) {
    return;
  }
  diffVisible.value = true;
}
const confirmEdit = (exit) => {
  exit()
}

const updateQuestion = () => {
  http.post('/question/update', editedQuestion.value).then(
      (res) => {
        diffVisible.value = false;
        loadData(question.value.id);
        foldAnswer.value = false;
        ElNotification({
          title: '已修改',
          message: '答案修改成功',
          type: 'success',
        });
      },
      () => {
      },
  );
}

const loadData = (id) => {
  let param = route.params.x;
  if (typeof (id) === 'number') {
    param = id;
  }
  http.post(`/question/${param}`).then(
      (res) => {

        question.value = {...res.data};
        editedQuestion.value = {...res.data};
      },
      () => {
      },
  );
  foldAnswer.value = true;
};
loadData();


</script>


<style scoped>
.el-button {
  background-color: var(--el-button-bg-color, var(--el-color-white))
}
</style>