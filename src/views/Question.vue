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
    <div class="pb-4" v-if="data.tag !== ''">
      <a-tag v-for="tag in data.tag.split(',')">{{ tag }}</a-tag>
    </div>
    {{ data.answer }}
  </div>

</template>

<style scoped>

</style>