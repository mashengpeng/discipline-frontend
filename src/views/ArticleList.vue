<template>
  <div>

    {{ data }}

  </div>

</template>

<script setup>
import {ref} from 'vue'
import myAxios from '@/utils/http'
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