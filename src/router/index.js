// 全局路由(无需嵌套上左右整体布局)
import { createRouter, createWebHistory } from 'vue-router';
import { ElNotification } from 'element-plus';
import http from '@/utils/http';


const globalRoutes = [
  {
    path: '/404',
    component: () => import('@/views/global/404.vue'),
    meta: { title: '404未找到', anno: true },
  },
  {
    path: '/login',
    component: () => import('@/views/global/Login.vue'),
    meta: { title: '登录', anno: true },
  },
  { path: '/:pathMatch(.*)*', redirect: '/404', anno: true },
];

const toolsRoutes = [
  {
    path: '/tools',
    component: () => import('@/views/tools/Tools.vue'),
    meta: { title: '工具箱' },
  },
  {
    path: '/tools/calendar',
    component: () => import('@/views/tools/Calendar.vue'),
    meta: { title: '日历' },
  },
  {
    path: '/tools/formatter',
    component: () => import('@/views/tools/Formatter.vue'),
    meta: { title: 'JSON格式化' },
  },
  {
    path: '/tools/diff',
    component: () => import('@/views/tools/CodeDiff.vue'),
    meta: { title: '文本对比' },
  },
  {
    path: '/tools/todo',
    component: () => import('@/views/tools/Todo.vue'),
    meta: { title: '代办事项', keepAlive: true },
  },
];

const articleRoutes = [
  { path: '/article', redirect: '/article/list' },
  {
    path: '/article/list',
    component: () => import('@/views/article/ArticleList.vue'),
    meta: { title: '文章', keepAlive: true },
  },
  {
    path: '/article/:id',
    component: () => import('@/views/article/Article.vue'),
    meta: { title: '文章', keepAlive: true },
  },
];

const questionRoutes = [
  {
    path: '/question',
    redirect: '/question/list',
  },
  {
    path: '/question/list',
    component: () => import('@/views/question/QuestionList.vue'),
    meta: { title: '题目', keepAlive: true },
  },
  {
    path: '/question/:x',
    component: () => import('@/views/question/Question.vue'),
    meta: { title: '题目', keepAlive: true },
  },
];

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = [{
  path: '/',
  redirect: '/index',
  component: () => import('@/views/Main.vue'),
  // name: 'main',
  children: [
    { path: '/index', component: () => import('@/views/Index.vue'), meta: { title: '首页', keepAlive: true } },
    { path: '/me', component: () => import('@/views/Me.vue'), meta: { title: '我的', keepAlive: true } },
  ].concat(toolsRoutes).concat(articleRoutes).concat(questionRoutes),
}];


export const router = createRouter({
  // 创建一个 hash 历史记录。
  history: createWebHistory(),
  // 应该添加到路由的初始路由列表。
  routes: mainRoutes.concat(globalRoutes),
  //routes: mainRoutes,
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  // scrollBehavior(to, from, savedPosition) {
  //     if (to.hash) {
  //         return {
  //             el: to.hash,
  //         }
  //     }
  // },
});

router.beforeEach((to, from, next) => {

  document.title = to.meta.title ?? 'vue';
  if (to.meta.anno) {
    next();
    return;
  }
  http.get('/user/anon/isLogin').then(
    (res) => {
      if (!res.data) {
        ElNotification({
          title: '未登录,请先登录',
          type: 'info',
          duration: 1000,
        });
        localStorage.clear();
        next('/login');
      } else {
        next();
      }
    },
    () => {
      next('/login');
    },
  );
});



