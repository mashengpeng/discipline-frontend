<template>

  <div class='h-screen flex justify-center items-center'>
    <el-space>
      <el-input v-model='username' placeholder='请输入用户名'></el-input>
      <el-button @click='login'>登陆</el-button>
    </el-space>

  </div>


</template>


<script setup>
import http from '@/utils/http';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { ref } from 'vue';

const username = ref('');


const router = useRouter();
const login = () => {


  http.get('/user/anon/login', { params: { username: username.value } },
    // {
    //   headers: {
    //     REMOTE_ADDR: sessionStorage.getItem('ip'),
    //   },
    //   username: username.value,
    // }
  ).then(
    (res) => {
      if (res.message === 'success') {
        ElNotification({
          title: '登录成功',
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

</script>


<style scoped>

</style>