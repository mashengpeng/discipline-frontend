// 全局路由(无需嵌套上左右整体布局)
import {createRouter, createWebHistory} from "vue-router";

const globalRoutes = [
    {path: '/404', component: () => import('@/views/404.vue'), name: '404', meta: {title: '404未找到'}},
    {path: '/login', component: () => import('@/views/Login.vue'), name: 'login', meta: {title: '登录'}}
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
    path: '/',
    component: () => import('@/views/Main.vue'),
    name: 'main',
    meta: {title: '主入口整体布局'},
    children: [
        {path: '/', component: () => import('@/views/Home.vue'), name: 'home', meta: {title: '首页'}},
        {path: '/todo', component: () => import('@/views/Todo.vue'), name: 'todo', meta: {title: '代办事项'}},
        {
            path: '/article/list',
            component: () => import('@/views/ArticleList.vue'),
            name: 'articleList',
            meta: {title: '文章'}
        },
        {path: '/article/:id', component: () => import('@/views/Article.vue'), name: 'article', meta: {title: '文章'}},
        {path: '/question', component: () => import('@/views/Question.vue'), name: 'question', meta: {title: '题目'}},
    ],
}

export const router = createRouter({
    // 创建一个 hash 历史记录。
    history: createWebHistory(),
    // 应该添加到路由的初始路由列表。
    routes: globalRoutes.concat(mainRoutes),
    //routes: mainRoutes,
    // 是否应该禁止尾部斜杠。默认为假
    strict: true,
    scrollBehavior: () => ({left: 0, top: 0}),
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});



