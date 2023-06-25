<template>
  <div class="flex justify-center items-center h-full w-full">
    <a-card :title="data.title" class="xs:w-full sm:w-full md:w-3/4 lg:w-1/2 h-5/6 shadow-2xl">
      <template #extra>
        <a-space>
          <a-button @click="edit">编辑</a-button>
        </a-space>
      </template>

      <!--      <a-card-meta>-->
      <!--        <template #description>{{ data.author }}</template>-->
      <!--      </a-card-meta>-->
      <!--      <a-divider></a-divider>-->
      <div class="pb-4" v-if="data.tag !== ''">
        <a-tag v-for="tag in data.tag.split(',')">{{ tag }}</a-tag>
      </div>
      <div class="h-full">{{ data.content }}</div>
      <template #actions>
        <div>上一篇</div>
        <div>赞</div>
        <div>评论</div>
        <div>下一篇</div>
      </template>
    </a-card>

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