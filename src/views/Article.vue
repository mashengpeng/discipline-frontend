<template>
  <div>


    <div class="pb-4" v-if="data.tag !== ''">

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