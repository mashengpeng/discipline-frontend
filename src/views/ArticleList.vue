<template>
  <div>

    <a-space>
      <a-button @click="edit">写文章</a-button>
    </a-space>

    <a-list item-layout="horizontal" :data-source="data">
      <template #renderItem="{ item }">
        <a-list-item class="w-[60vw] pb-10" @click="jump_to_article_detail(item.id)">
          <a-list-item-meta :description="`标签:${item.tag}  作者:${item.author}`">
            <template #title>
              {{ item.title }}
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>

  </div>

</template>

<script setup>
import {ref} from 'vue'
import myAxios from '@/utils/httpRequest'
import {onBeforeRouteUpdate, useRouter} from "vue-router";

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

const router = useRouter();
const jump_to_article_detail = (id) => {
  router.push({
    path: `/article/${id}`
  })
}
</script>

<style scoped>

</style>