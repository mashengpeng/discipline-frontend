<template>
  <el-container>
    <el-header class="flex justify-center p-0 h-[50px]">
      <el-menu mode="horizontal" router :ellipsis="false" class="w-full xl:pl-96 xl:pr-96">
        <el-menu-item index="/" class="flex-1">首页</el-menu-item>
        <el-menu-item index="/todo" class="flex-1">代办事项</el-menu-item>
        <el-menu-item index="/article/list" class="flex-1">文章</el-menu-item>
        <el-menu-item index="/question" class="flex-1">题目</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="h-[calc(100vh-100px)] p-0">
      <div class="xl:ml-96 xl:mr-96 p-8 h-full overflow-auto bg-amber-50">
        <router-view></router-view>
      </div>
    </el-main>
    <el-footer class="p-0 h-[50px]">Footer</el-footer>
  </el-container>

</template>
<script setup>
import {onBeforeRouteUpdate, useRouter} from "vue-router";

const router = useRouter();

const jump_page = (x) => {
  router.push({
    name: x.key
  })
}
</script>
<style scoped>
</style>