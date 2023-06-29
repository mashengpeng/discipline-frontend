<template>
  <el-container>
    <el-header class="flex justify-center p-0 h-[50px]">
      <el-menu mode="horizontal"
               router
               :ellipsis="false"
               class="w-full sm:pl-16 sm:pr-16 md:pl-32 md:pr-32 lg:pl-48 lg:pr-48  xl:pl-64 xl:pr-64 2xl:pl-96 2xl:pr-96"
               :default-active="route.path"
      >
        <el-menu-item index="/" class="flex-1">首页</el-menu-item>
        <el-menu-item index="/todo" class="flex-1">代办事项</el-menu-item>
        <el-menu-item index="/article/list" class="flex-1">文章</el-menu-item>
        <el-menu-item index="/question" class="flex-1">题目</el-menu-item>
        <el-menu-item index="/login" class="flex-1" @click="logout">注销</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="p-0 h-[calc(100vh-100px)]">
      <el-scrollbar>
        <div
            class="sm:ml-16 sm:mr-16 md:ml-32 md:mr-32 lg:ml-48 lg:mr-48  xl:ml-64 xl:mr-64 2xl:ml-96 2xl:mr-96 sm:pl-32 sm:pr-32 sm:pt-4 sm:pb-4 min-h-[calc(100vh-100px)] lg:shadow-2xl">
          <el-button size="large"
                     class="flex-1 border-0 shadow fixed z-50 left-[4px] sm:left-[6rem] md:left-[10rem] lg:left-[14rem] xl:left-[18rem] 2xl:left-[26rem] bottom-16 sm:top-16"
                     @click="router.back()" circle>
            <el-icon size="30">
              <caret-left/>
            </el-icon>
          </el-button>
          <router-view></router-view>
        </div>
        <el-backtop :right="40" :bottom="80" target=".el-scrollbar__wrap"/>
      </el-scrollbar>
    </el-main>
    <el-footer class="p-0 h-[50px] flex justify-center bg-white border">
      <el-space>
        <el-link href="https://github.com/" target="_blank">github</el-link>
        <el-link href="https://gitlab.com/" target="_blank">gitlab</el-link>
      </el-space>

    </el-footer>
  </el-container>

</template>
<script setup>
import {useRoute, useRouter} from "vue-router";
import http from '@/utils/http'
import {ElNotification} from 'element-plus'
import {CaretLeft} from "@element-plus/icons-vue";

const router = useRouter();
const route = useRoute();

const logout = () => {
  http.get("/user/logout").then(
      (res) => {
        ElNotification({
          title: '注销成功',
          type: 'info',
          duration: 1000
        });
      },
      () => {
      }
  );
}

</script>
<style scoped>
.el-button {
  background-color: var(--el-button-bg-color, var(--el-color-white))
}
</style>