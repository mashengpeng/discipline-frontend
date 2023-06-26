<template>
  <a-layout>
    <a-layout-header class="bg-amber-50 h-[50px] flex justify-center p-0">
      <a-menu mode="horizontal" class="w-screen flex justify-center h-[50px] leading-3" theme="light"
              @click="jump_page">
        <a-menu-item key="home">
          首页
        </a-menu-item>
        <a-menu-item key="todo">
          代办事项
        </a-menu-item>
        <a-menu-item key="articleList">
          文章
        </a-menu-item>
        <a-menu-item key="question">
          题目
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <!--    <a-layout class="flex h-[calc(100vh-100px)] overflow-y-scroll justify-center w-screen items-center">-->
    <a-layout class="h-[calc(100vh-100px)] bg-red-900">
      <div class="bg-amber-200 ml-96 mr-96 pl-16 pr-16 h-full overflow-auto">
        <router-view></router-view>
      </div>

    </a-layout>
    <a-layout-footer class="bg-amber-50 h-[50px]"></a-layout-footer>
  </a-layout>
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
<style>

</style>