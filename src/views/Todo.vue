<template>


  <a-card title="Todo List" class="xs:w-full sm:w-full md:w-3/4 lg:w-1/2 h-5/6 shadow-2xl">
    <template #extra>
      <a-button @click="visible = true">Add</a-button>
    </template>
    <a-list item-layout="horizontal" :data-source="data">
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a-button @click="completeItem(item.id)">完成</a-button>
            <a-button @click="deleteItem(item.id)">删除</a-button>
          </template>
          <a-list-item-meta
              :description="item.description"
          >
            <template #title>
                <span :class="{'line-through':item.completed}">
                  {{ item.title }}
                </span>
            </template>
            <template #avatar>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-card>

  <a-modal
      v-model:visible="visible"
      title="Title"
      :confirm-loading="confirmLoading"
      @ok="addTodoItem"
  >
    <a-form
        :model="todoItem"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
      <a-form-item
          label="事项"
          name="title"
          :rules="[{ required: true, message: 'Please input something' }]"
      >
        <a-input v-model:value="todoItem.title"/>
      </a-form-item>

      <a-form-item
          label="描述"
          name="description"
      >
        <a-input v-model:value="todoItem.description"/>
      </a-form-item>

    </a-form>
  </a-modal>

</template>
<script setup>
import myAxios from "@/utils/httpRequest";
import {ref} from "vue";

const data = ref([]);
const visible = ref(false);
const todoItem = ref({})
const loadData = () => {
  myAxios.get("/todo/list").then(
      (res) => {
        console.log(res)
        data.value = res.data;
      },
      () => {
      }
  );
}
loadData();

const addTodoItem = () => {
  console.log(todoItem)
  myAxios.post("/todo/add", todoItem.value).then(
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

</script>


<style scoped>

</style>
