<template>
  <el-dialog title="添加代办" v-model="visible" draggable @close="cancel">
    <el-form :model="todoItem">
      <el-form-item label="事项" class="ml-16 mr-16">
        <el-input v-model="todoItem.title" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="描述" class="ml-16 mr-16">
        <el-input v-model="todoItem.description" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="持续时间" class="ml-16 mr-16">
        <el-input v-model="todoItem.duration" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="截止日期" class="ml-16 mr-16">
        <el-date-picker
            time-arrow-control
            v-model="todoItem.deadline"
            type="datetime"
            placeholder="选择截止日期"
            :shortcuts="shortcuts"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="upsertItem">确 定</el-button>
    </span>
    </template>
  </el-dialog>

  <div class="flex justify-between">
    <el-tabs @tab-click="tabChange" class="flex flex-1" v-model="activeTab">
      <el-tab-pane label="待完成" name="undone"></el-tab-pane>
      <el-tab-pane label="已完成" name="done"></el-tab-pane>
      <el-tab-pane label="已过期" name="expired"></el-tab-pane>
    </el-tabs>
    <el-button @click="visible = true" :icon="Plus" size="large" type="primary" plain></el-button>
  </div>


  <el-table :data="data">
    <el-table-column prop="title" label="事项"/>
    <el-table-column prop="description" label="描述"/>
    <el-table-column prop="duration" label="持续时间"/>
    <el-table-column prop="deadline" label="倒计时">
      <template #default="scope">
        <el-countdown :value="dayjs(scope.row.deadline)" v-if="scope.row.deadline && scope.row.deadline >= dayjs()"/>
        <div v-else/>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="240px" align="right">
      <template #default="scope">
        <el-button type="primary" plain @click="completeItem(scope.row.id)" v-show="activeTab === 'undone'">完成
        </el-button>
        <el-button type="success" plain @click="editItem(scope.row)" v-show="activeTab === 'undone'">编辑</el-button>
        <el-button type="danger" plain @click="deleteItem(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>


</template>
<script setup>
import myAxios from "@/utils/http";
import {nextTick, reactive, ref, toRaw, watchEffect} from "vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {dayjs} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'

const route = useRoute();
const router = useRouter();
const activeTab = ref(route.query.tab ? route.query.tab : "undone")

const data = ref([]);
const visible = ref(false);
const todoItem = ref({})


const shortcuts = [
  {
    text: '今晚24点',
    value: dayjs().add(1, 'd').startOf('d')
  },
  {
    text: '本周末',
    value: dayjs().add(1, 'w').startOf('w')
  },
  {
    text: '本月末',
    value: dayjs().add(1, 'M').startOf('M')
  },
  {
    text: '24小时后',
    value: dayjs().add(1, 'd')
  },
  {
    text: '3天后',
    value: dayjs().add(3, 'd')
  },
  {
    text: '7天后',
    value: dayjs().add(7, 'd')
  },
]

const tabChange = () => {
  nextTick(() => {
    router.push({path: '/todo', query: {tab: activeTab.value}})
  })
}

const loadData = () => {
  myAxios.get(`/todo/${activeTab.value}`).then(
      (res) => {
        data.value = res.data
      },
      () => {
      }
  );
}
watchEffect(() => {
  loadData()
})


const cancel = () => {
  visible.value = false;
  todoItem.value = {}
}


const upsertItem = () => {
  const deadline = todoItem.value.deadline;
  const upload = {...todoItem.value, deadline: deadline ? dayjs(deadline).valueOf() : null}
  myAxios.post("/todo/upsert", upload).then(
      (res) => {
        data.value = res.data;
        visible.value = false
        todoItem.value = {}
        loadData();
      },
      () => {
      }
  );
}

const completeItem = (id) => {
  myAxios.post(`/todo/complete/${id}`).then(
      (res) => {
        console.log(res)
        loadData();
      },
      () => {
      }
  );
}
const deleteItem = (id) => {
  myAxios.post(`/todo/delete/${id}`).then(
      (res) => {
        console.log(res)
        loadData();
      },
      () => {
      }
  );
}

const editItem = (row) => {
  console.log(toRaw(row))
  todoItem.value = {...row};
  visible.value = true
}

</script>


<style scoped>

</style>
