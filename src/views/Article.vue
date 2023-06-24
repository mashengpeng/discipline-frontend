<script setup>
import {ref} from 'vue'
import myAxios from '@/utils/httpRequest'

const data = ref([]);
const loadData = () => {
  myAxios.post("/article/list").then(
      (res) => {
        console.log(res)
        data.value = res.data;
      },
      () => {
      }
  );
}
loadData();
</script>

<template>
  <a-list item-layout="horizontal" :data-source="data" class="flex justify-center">
    <template #renderItem="{ item }">
      <a-list-item class="w-[60vw] pb-10">
        <a-list-item-meta :description="`标签:${item.tag}  作者:${item.author}`">
          <template #title>
            <router-link to="/article">{{ item.title }}</router-link>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped>

</style>