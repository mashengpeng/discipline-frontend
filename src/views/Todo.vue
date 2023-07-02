<template>
  <el-dialog v-model='visible' draggable title='添加代办' @close='cancel'>
    <el-form :model='todoItem'>
      <el-form-item class='ml-16 mr-16' label='事项' prop='title'>
        <el-autocomplete v-model='todoItem.title' :fetch-suggestions='querySearch' class='w-[600px]'
                         clearable></el-autocomplete>
      </el-form-item>
      <el-form-item class='ml-16 mr-16' label='描述' prop='description'>
        <el-input v-model='todoItem.description' clearable></el-input>
      </el-form-item>
      <el-form-item class='ml-16 mr-16' label='持续时间' prop='duration'>
        <el-input v-model='todoItem.duration' clearable></el-input>
      </el-form-item>
      <el-form-item class='ml-16 mr-16' label='截止日期' prop='deadline'>
        <el-date-picker
          v-model='todoItem.deadline'
          :shortcuts='shortcuts'
          placeholder='选择截止日期'
          time-arrow-control
          type='datetime'
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class='dialog-footer'>
      <el-button @click='upsertItem'>确 定</el-button>
    </span>
    </template>
  </el-dialog>

  <el-button circle
             class='no-transparent flex-1 border-0 shadow fixed z-50 right-[4px] sm:right-[6rem] md:right-[10rem] lg:right-[14rem] xl:right-[18rem] 2xl:right-[26rem] bottom-16 sm:top-16'
             size='large' @click='visible = true'>
    <el-icon size='30'>
      <document-add />
    </el-icon>
  </el-button>

  <el-tabs v-model='activeTab' stretch tabPosition='bottom' type='card' @tab-click='tabChange'>
    <el-tab-pane label='待完成' name='undone'></el-tab-pane>
    <el-tab-pane label='已完成' name='done'></el-tab-pane>
    <el-tab-pane label='已过期' name='expired'></el-tab-pane>
  </el-tabs>

  <el-table :data='data'>
    <el-table-column label='事项' prop='title' />
    <el-table-column label='描述' prop='description' />
    <el-table-column label='持续时间' prop='duration' />
    <el-table-column label='倒计时' prop='deadline'>
      <template #default='scope'>
        <el-countdown v-if='scope.row.deadline && scope.row.deadline >= dayjs()' :value='dayjs(scope.row.deadline)' />
        <div v-else />
      </template>
    </el-table-column>
    <el-table-column align='right' fixed='right' label='' width='240px'>
      <template #default='scope'>
        <el-button v-show="activeTab === 'undone'" class='border-0' plain round
                   type='primary'
                   @click='completeItem(scope.row.id)'>
          <el-icon size='30'>
            <check />
          </el-icon>


        </el-button>
        <EditButton v-show="activeTab === 'undone'" @click='editItem(scope.row)'></EditButton>
        <el-button class='border-0' plain round type='danger' @click='deleteItem(scope.row.id)'>
          <el-icon size='30'>
            <delete-filled />
          </el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>


</template>
<script setup>
import http from '@/utils/http';
import { nextTick, ref, toRaw, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { dayjs } from 'element-plus';
import { Check, DeleteFilled, DocumentAdd } from '@element-plus/icons-vue';
import EditButton from '@/components/EditButton.vue';

const route = useRoute();
const router = useRouter();
const activeTab = ref(route.query.tab ? route.query.tab : 'undone');

const data = ref([]);
const visible = ref(false);
const todoItem = ref({});


const formRef = ref();

const querySearch = (queryString, callback) => {
  http.get('/todo/prompt', { params: { keyword: queryString } }).then(
    (res) => {

      callback(res.data);
    },
    () => {
    },
  );
};


const shortcuts = [
  {
    text: '今晚24点',
    value: dayjs().add(1, 'd').startOf('d'),
  },
  {
    text: '本周末',
    value: dayjs().add(1, 'w').startOf('w'),
  },
  {
    text: '本月末',
    value: dayjs().add(1, 'M').startOf('M'),
  },
  {
    text: '24小时后',
    value: dayjs().add(1, 'd'),
  },
  {
    text: '3天后',
    value: dayjs().add(3, 'd'),
  },
  {
    text: '7天后',
    value: dayjs().add(7, 'd'),
  },
];

const tabChange = () => {
  nextTick(() => {
    router.push({ path: '/todo', query: { tab: activeTab.value } });
  });
};

const loadData = () => {
  http.get(`/todo/${activeTab.value}`).then(
    (res) => {
      data.value = res.data;
    },
    () => {
    },
  );
};
watchEffect(() => {
  loadData();
});


const cancel = () => {
  visible.value = false;
  todoItem.value = {};
};


const upsertItem = () => {
  const deadline = todoItem.value.deadline;
  const upload = { ...todoItem.value, deadline: deadline ? dayjs(deadline).valueOf() : null };
  http.post('/todo/upsert', upload).then(
    (res) => {
      data.value = res.data;
      visible.value = false;
      todoItem.value = {};
      loadData();
    },
    () => {
    },
  );
};

const completeItem = (id) => {
  http.post(`/todo/complete/${id}`).then(
    (res) => {
      console.log(res);
      loadData();
    },
    () => {
    },
  );
};
const deleteItem = (id) => {
  http.post(`/todo/delete/${id}`).then(
    (res) => {
      console.log(res);
      loadData();
    },
    () => {
    },
  );
};

const editItem = (row) => {
  console.log(toRaw(row));
  todoItem.value = { ...row };
  visible.value = true;
};

</script>


<style scoped>
.no-transparent {
  background-color: var(--el-button-bg-color, var(--el-color-white))
}
</style>
