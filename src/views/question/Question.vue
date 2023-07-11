<template>
  <div v-if='question.id' class='pl-4 pr-4'>
    <el-button circle
               class='shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-16 lg:top-16'
               size='large' @click='$router.push("/question/list")'>
      <el-icon size='30'>
        <list />
      </el-icon>
    </el-button>

    <el-button circle
               class='shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-32 lg:top-32'
               size='large' @click='showAdd'>
      <el-icon size='30'>
        <edit />
      </el-icon>
    </el-button>

    <el-button circle
               class='shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-48 lg:top-48'
               size='large' @click='deleteQuestion'>
      <el-icon size='30'>
        <delete />
      </el-icon>
    </el-button>

    <el-button circle
               class='shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-64 lg:top-64'
               size='large' @click='searchQuestion'>
      <el-icon size='30'>
        <search />
      </el-icon>
    </el-button>

    <el-button circle
               class='shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-80 lg:top-80'
               size='large' @click='foldAnswer = !foldAnswer'>
      <el-icon size='30'>
        <magic-stick />
      </el-icon>
    </el-button>

    <el-button
      circle
      class='shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-96 lg:top-96'
      size='large' @click='randomQuestion'>
      <el-icon size='30'>
        <refresh-left />
      </el-icon>
    </el-button>


    <el-dialog
      v-model='editVisible'
      :show-close='true'
      :title='text.title[progress]'
      class='w-screen md:w-[900px]'

    >
      <div v-if='progress === 0'>
        <el-input v-model='editedQuestion.title' class='mb-4' placeholder='题目'></el-input>

        <el-input v-model='editedQuestion.answer' :autosize='{ minRows: 18, maxRows: 18}' autosize
                  placeholder='答案' type='textarea'>
        </el-input>
      </div>

      <div v-else>
        <Diff
          :current='editedQuestion.title'
          :folding='false'
          :prev='question.title'
          :virtual-scroll='true'
          class='h-[60px]'
          mode='split'
          theme='light'
        />
        <Diff
          :current='editedQuestion.answer'
          :folding='false'
          :prev='question.answer'
          :virtual-scroll='true'
          class='h-[375px]'
          mode='split'
          theme='light'
        />
      </div>


      <template #footer>
        <el-steps :active='progress' finish-status='success' simple>
          <el-step title='编辑'></el-step>
          <el-step title='确认'></el-step>
        </el-steps>

        <el-button v-show='progress !== 0' size='large' style='margin-top: 12px;' @click='prev'>上一步</el-button>
        <el-button class='mt-4' size='large' @click='next'>{{ text.button[progress] }}</el-button>
      </template>
    </el-dialog>
    <div class='text-xl font-bold mb-4'>
      {{ question.title }}
    </div>

    <div class='text-gray-400 text-sm mb-4'>
      {{ dayjs(question.createTime).format('YYYY-MM-DD HH:mm') }}
      <el-divider direction='vertical' />
      更新于:{{ dayjs(question.updateTime).fromNow() }}
      <el-divider direction='vertical' />
      <svg height='16px' style='display: inline' viewBox='0 0 1024 1024' width='16px'
           xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z'
          fill='currentColor'></path>
      </svg>
      {{ question.viewCount }}
      <span v-if='question.tag'>
      <el-divider direction='vertical' />
      <el-space>
        <el-tag v-for="(e, index) in question.tag.split(',')">{{ e }}</el-tag>
      </el-space>
    </span>

    </div>

    <el-text v-if='!foldAnswer' class='whitespace-pre-wrap' size='large'>
      {{ question.answer }}
    </el-text>
  </div>
  <el-empty v-else class='mt-8' description='暂无题目'></el-empty>

</template>

<script setup>
import { onActivated, ref } from 'vue';
import http from '@/utils/http';
import { useRoute, useRouter } from 'vue-router';
import { dayjs, ElMessageBox, ElNotification } from 'element-plus';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Delete, Edit, List, MagicStick, RefreshLeft, Search } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const question = ref({});
const foldAnswer = ref(true);
const editVisible = ref(false);
const editedQuestion = ref({});
const progress = ref(0);
const text = ref({ title: ['编辑答案', '修改预览'], button: ['下一步', '确认'] });

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const searchQuestion = () => {
  window.open(`https://www.google.com/search?q=${question.value.title}`);
};

const deleteQuestion = () => {
  ElMessageBox.confirm('确认删除题目?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'error',
  })
    .then(() => {
      http.post('/question/delete', question.value).then(
        (res) => {
          ElNotification({
            type: 'success',
            title: '删除成功!',
          });
          router.push('/question/list');
        },
        () => {
        },
      );

    })
    .catch(() => {
      ElNotification({
        type: 'info',
        title: '取消删除',
      });
    });
};

const randomQuestion = () => {
  if (route.params.x === 'random') {
    loadData();
  } else {
    router.push('/question/random');
  }
};

const prev = () => {
  if (progress.value !== 0) {
    progress.value = progress.value - 1;
  }
};


const next = () => {
  if (progress.value === 0) {
    if (JSON.stringify(question.value) === JSON.stringify(editedQuestion.value)) {
      ElNotification({
        title: '内容未修改',
        type: 'info',
      });
      return;
    }
    progress.value = progress.value + 1;
    return;
  }
  http.post('/question/update', editedQuestion.value).then(
    (res) => {
      editVisible.value = false;
      loadData(question.value.id);
      foldAnswer.value = false;
      ElNotification({
        title: '修改成功',
        type: 'success',
      });
    },
    () => {
    },
  );
};

const showAdd = () => {
  editVisible.value = true;
  progress.value = 0;
};

const loadData = (id) => {
  let param = route.params.x;
  if (typeof (id) === 'number') {
    param = id;
  }
  http.post(`/question/${param}`).then(
    (res) => {
      if (!res.data.answer) {
        res.data.answer = '';
      }
      question.value = { ...res.data };
      editedQuestion.value = { ...res.data };
    },
    () => {
    },
  );
  foldAnswer.value = true;
};

onActivated(() => {
  loadData();
});


</script>


<style scoped>
.el-button {
  background-color: var(--el-button-bg-color, var(--el-color-white))
}
</style>