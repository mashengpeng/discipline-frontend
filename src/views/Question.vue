<script setup>
import {ref} from 'vue'
import http from '@/utils/http'

const data = ref({
  tag: ''
});
const loadData = () => {
  http.post("/question/random").then(
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

</template>

<style scoped>

</style>