<template>
  <div class='flex justify-center items-center h-screen'>
    <el-button @click='login'>登陆</el-button>
    <!--    <el-button @click="logout">登出</el-button>-->
    <el-button @click='check'>检查是否登陆</el-button>
  </div>


</template>


<script setup>
import http from '@/utils/http';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';


const router = useRouter();
const login = () => {


  http.get('/user/login', {
    headers: {
      REMOTE_ADDR: sessionStorage.getItem('ip'),
    },
  }).then(
    (res) => {
      if (res.message === 'success') {
        ElNotification({
          title: '登录成功',
          message: JSON.stringify(res.data),
          type: 'success',
          duration: 5000,
        });
        localStorage.setItem('tokenName', res.data.tokenName);
        localStorage.setItem('tokenValue', res.data.tokenValue);
        router.push('/');
      }
    },
    () => {
    },
  );
};

const check = () => {
  http.get('/user/isLogin').then(
    (res) => {
      if (res.data) {
        ElNotification({
          title: '已登录',
          type: 'success',
          duration: 1000,
        });
      } else {
        ElNotification({
          title: '未登录',
          type: 'info',
          duration: 1000,
        });
      }

    },
    () => {
    },
  );
};
</script>


<style scoped>

</style>