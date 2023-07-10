<template>
  <el-button @click="logout">注销</el-button>
  {{ data }}
</template>

<script setup>
import http from "@/utils/http";
import {ElNotification} from "element-plus";
import {onActivated, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();


const data = ref(null);

const logout = () => {
  http.get('/user/anon/logout').then(
      (res) => {
        ElNotification({
          title: '注销成功',
          type: 'info',
          duration: 1000,
        });
        localStorage.clear();
        router.push("/login")
      },
      () => {
      },
  );
};

const loadData = () => {
  http.post('/user/info').then(
      (res) => {
        data.value = res.data;
      },
      () => {
      },
  );
};

onActivated(() => {
  loadData();
})
</script>


<style scoped>

</style>