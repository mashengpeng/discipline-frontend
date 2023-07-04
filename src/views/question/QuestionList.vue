<script setup>
import {ref} from 'vue'
import http from '@/utils/http'

const data = ref(null);
const loadData = () => {
  http.post("/question/list").then(
      (res) => {
        data.value = res.data;
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
  <el-card v-for='question in data' :key='question.id' :body-style="{ padding: '0px' }"
           class='box-card border-0 m-1 p-4'
           shadow='hover'>
    <div class='hover:cursor-pointer' @click='$router.push(`/question/${question.id}`)'>
      {{ question.title }}
    </div>

  </el-card>
</template>

<style scoped>

</style>