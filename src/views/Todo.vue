<template>
  <el-dialog title="添加代办" v-model="visible">
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
      <el-button @click="visible = false">取 消</el-button>
      <el-button @click="addTodoItem">确 定</el-button>
    </span>
    </template>
  </el-dialog>

  <el-button @click="visible = true">添加</el-button>

  <el-tabs @tab-click="tabChange" v-model="route.params.status">
    <el-tab-pane label="待完成" name="undone"></el-tab-pane>
    <el-tab-pane label="已完成" name="done"></el-tab-pane>
    <el-tab-pane label="已过期" name="expired"></el-tab-pane>
  </el-tabs>
  <el-space class="flex flex-col items-stretch w-full" fill :fill-ratio="50">
    <el-descriptions :title="todo.title" v-for="todo in data" class="w-full" border :column="3">
      <template #extra>
        <el-button @click="completeItem(todo.id)">完成</el-button>
        <el-button @click="deleteItem(todo.id)">删除</el-button>
      </template>
      <el-descriptions-item label="描述" span="3">{{ todo.description }}</el-descriptions-item>
      <el-descriptions-item label="持续时间">{{ todo.duration }}</el-descriptions-item>
      <el-descriptions-item label="截止时间">{{ todo.deadline }}</el-descriptions-item>
    </el-descriptions>
  </el-space>


</template>
<script setup>
import myAxios from "@/utils/httpRequest";
import {reactive, ref} from "vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const data = ref([]);
const visible = ref(false);
const todoItem = ref({})

const tabChange = (e)=>{
  // console.log(e.paneName);
  router.push(`/todo/${e.paneName}`)
}

const loadData = (status) => {
  myAxios.get(`/todo/${status}`).then(
      (res) => {
        console.log(res)
        data.value = res.data;
      },
      () => {
      }
  );
}


onBeforeRouteUpdate((to, from, next) => {
  loadData(to.params.status);
  next()
});

loadData(route.params.status);

const addTodoItem = () => {
  console.log(todoItem.value)
  myAxios.post("/todo/add", todoItem.value).then(
      (res) => {
        console.log(res)
        data.value = res.data;
        visible.value = false
        todoItem.value = {}
        loadData(route.params.status);

      },
      () => {
      }
  );
}

const completeItem = (id) => {
  myAxios.post(`/todo/complete/${id}`).then(
      (res) => {
        console.log(res)
        loadData(route.params.status);
      },
      () => {
      }
  );
}
const deleteItem = (id) => {
  myAxios.post(`/todo/delete/${id}`).then(
      (res) => {
        console.log(res)
        loadData(route.params.status);
      },
      () => {
      }
  );
}

</script>


<style scoped>

</style>
