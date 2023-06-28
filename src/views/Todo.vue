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
            placeholder="选择日期时间"
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
    <el-button @click="visible = true" :icon="Plus" size="large"></el-button>
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
    <el-table-column fixed="right" label="操作" width="250">
      <template #default="scope">
        <el-button @click="completeItem(scope.row.id)">完成</el-button>
        <el-button @click="editItem(scope.row)">编辑</el-button>
        <el-button @click="deleteItem(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>


</template>
<script setup>
import myAxios from "@/utils/httpRequest";
import {nextTick, reactive, ref, toRaw} from "vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {dayjs} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'

const route = useRoute();
const router = useRouter();
const activeTab = ref("undone")

const data = ref([]);
const visible = ref(false);
const todoItem = ref({})

const tabChange = () => {
  nextTick(()=>{
    loadData()
  })

}

const loadData = () => {
  console.log(activeTab.value)
  myAxios.get(`/todo/${activeTab.value}`).then(
      (res) => {
        data.value = res.data
      },
      () => {
      }
  );
}


// onBeforeRouteUpdate((to, from, next) => {
//   loadData(to.params.status);
//   next()
// });

loadData();

const cancel = () => {
  visible.value = false;
  todoItem.value = {}
}


const upsertItem = () => {
  const deadline = todoItem.value.deadline;
  const upload = {...todoItem.value, deadline: deadline ? dayjs(deadline).valueOf() : null}
  console.log(upload)
  myAxios.post("/todo/upsert", upload).then(
      (res) => {
        console.log(res)
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
