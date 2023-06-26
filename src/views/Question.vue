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
  <div>
    <a-space>
      <a-button @click="edit">编辑</a-button>
      <a-button @click="loadData">换一道</a-button>
    </a-space>

    <div class="pb-4" v-if="data.tag !== ''">
      <a-tag v-for="tag in data.tag.split(',')">{{ tag }}</a-tag>
    </div>
    {{ data.answer }}
  </div>

</template>

<style scoped>

</style>