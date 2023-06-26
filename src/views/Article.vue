<template>
  <div>
    <a-space>
      <a-button @click="edit">编辑</a-button>
    </a-space>

    <div class="pb-4" v-if="data.tag !== ''">
      <a-tag v-for="tag in data.tag.split(',')">{{ tag }}</a-tag>
    </div>
    <div class="h-full">{{ data.content }}</div>

    <div class="h-screen">上一篇</div>
    <div>赞</div>
    <div>评论</div>
    <div>下一篇</div>


  </div>

</template>
<script setup>

import {ref} from 'vue'
import myAxios from '@/utils/httpRequest'
import {useRoute, useRouter} from "vue-router";

const data = ref([]);
const route = useRoute();
const loadData = () => {
  myAxios.post(`/article/${route.params.id}`).then(
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


<style scoped>

</style>