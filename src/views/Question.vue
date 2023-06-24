<script setup>
import {ref} from 'vue'
import myAxios from '@/utils/httpRequest'

const data = ref({
  tag: ''
});
const loadData = () => {
  myAxios.post("/question/random").then(
      (res) => {
        console.log(res)
        data.value = res.data[0];
      },
      () => {
      }
  );
}
loadData();

const edit = () => {

}

</script>
<template>
  <a-card :title="data.title" hoverable class="xs:w-full sm:w-full md:w-3/4 lg:w-1/2 h-5/6 shadow-2xl">
    <template #extra>
      <a-space>
        <a-button @click="edit">编辑</a-button>
        <a-button @click="loadData">换一道</a-button>
      </a-space>
    </template>
    <div class="pb-4">
      <a-tag v-for="tag in data.tag.split(',')">{{ tag }}</a-tag>
    </div>
    {{ data.answer }}
  </a-card>
</template>

<style scoped>

</style>