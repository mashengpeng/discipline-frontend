<template>
  <el-container>
    <el-header class='flex justify-center p-0 h-[50px]'>
      <el-menu :default-active='activeMenu()'
               :ellipsis='false'
               class='w-full lg:pl-[calc(50vw-512px)] lg:pr-[calc(50vw-512px)]'
               mode='horizontal'
               router
      >
        <el-menu-item class='flex-1' index='/index'>首页</el-menu-item>
        <el-menu-item class='flex-1' index='/article'>文章</el-menu-item>
        <el-menu-item class='flex-1' index='/question'>题目</el-menu-item>
        <el-menu-item class='flex-1' index='/tools'>工具箱</el-menu-item>
        <el-menu-item class='flex-1' index='/me'>我的</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class='p-0 h-[calc(100vh-100px)]'>
      <el-scrollbar ref='scrollbar' @scroll='scroll'>
        <div
          class='md:pl-[calc(50vw-450px)] md:pr-[calc(50vw-450px)]  lg:pl-[62px] lg:pr-[62px]  lg:ml-[calc(50vw-512px)] lg:mr-[calc(50vw-512px)] pt-4 pb-4 min-h-[calc(100vh-100px)] lg:shadow-2xl'>
          <el-button circle
                     class='shadow fixed z-50 left-[4px] xl:left-[calc(50vw-600px)] bottom-16 lg:top-16'
                     size='large' @click='$router.back()'>
            <el-icon size='30'>
              <caret-left />
            </el-icon>
          </el-button>
          <div></div>
          <el-button circle
                     class='shadow fixed z-50 left-[4px] xl:left-[calc(50vw-600px)] lg:top-32 invisible lg:visible'
                     size='large' @click='$router.go(0)'>
            <el-icon size='30'>
              <refresh />
            </el-icon>
          </el-button>

          <router-view v-slot='{ Component }'>
            <Transition>
              <div>
                <keep-alive>
                  <component
                    :is='Component'
                    v-if='$route.meta.keepAlive'
                    :key='$route.path'
                  />
                </keep-alive>
                <component
                  :is='Component'
                  v-if='!$route.meta.keepAlive'
                  :key='$route.path'
                />
              </div>
            </Transition>
          </router-view>


        </div>
        <el-button v-if='backTopVisible'
                   circle
                   class='shadow fixed z-50 right-[4px] xl:right-[calc(50vw-600px)] bottom-32'
                   size='large'
                   @click='backTop'>
          <el-icon size='30'>
            <caret-top />
          </el-icon>
        </el-button>
      </el-scrollbar>
    </el-main>
    <el-footer class='p-0 h-[50px] flex justify-center bg-white border'>
      <el-space>
        <el-link href='https://github.com/' target='_blank'>github</el-link>
        <el-link href='https://gitlab.com/' target='_blank'>gitlab</el-link>
      </el-space>

    </el-footer>
  </el-container>

</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { CaretLeft, CaretTop, Refresh } from '@element-plus/icons-vue';
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();

const scrollbar = ref(null);
const backTopVisible = ref(false);

const scroll = (e) => {
  backTopVisible.value = e.scrollTop > 0;
};

const backTop = () => {
  scrollbar.value.setScrollTop(0);
};

const activeMenu = () => {
  return route.path.split('/').slice(0, 2).join('/');
};

</script>
<style scoped>
.el-button {
  background-color: var(--el-button-bg-color, var(--el-color-white))
}
</style>