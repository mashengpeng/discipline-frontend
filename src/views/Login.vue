<template>
  <el-button @click="login">登陆</el-button>
  <el-button @click="logout">登出</el-button>
  <el-button @click="check">检查是否登陆</el-button>

</template>


<script setup>
import http from "@/utils/http";

const login = () => {
  http.get("/user/login").then(
      (res) => {
      },
      () => {
      }
  );
}
const logout = () => {
  http.get("/user/logout").then(
      (res) => {
      },
      () => {
      }
  );
}
const check = () => {
  http.get("/user/isLogin").then(
      (res) => {
      },
      () => {
      }
  );
}
</script>



<style scoped>

</style>