// 全局路由(无需嵌套上左右整体布局)
import {createRouter, createWebHistory} from 'vue-router';
import http from '@/utils/http';
import {ElNotification} from 'element-plus';

const globalRoutes = [
    {
        path: '/404',
        component: () => import('@/views/global/404.vue'),
        meta: {title: '404未找到', anno: true}
    },
    {
        path: '/login',
        component: () => import('@/views/global/Login.vue'),
        meta: {title: '登录', anno: true},
    },
    {path: '/:pathMatch(.*)*', redirect: '/404'},
];

const toolsRoutes = [
    {
        path: '/tools',
        component: () => import('@/views/tools/Tools.vue'),
        meta: {title: '工具箱'},
    },
    {
        path: '/tools/calendar',
        component: () => import('@/views/tools/Calendar.vue'),
        meta: {title: '日历'},
    },
    {
        path: '/tools/formatter',
        component: () => import('@/views/tools/Formatter.vue'),
        meta: {title: '格式化'},
    },
    {
        path: '/tools/diff',
        component: () => import('@/views/tools/Diff.vue'),
        meta: {title: 'Diff'},
    },
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = [{
    path: '/',
    redirect: '/index',
    component: () => import('@/views/Main.vue'),
    // name: 'main',
    children: [
        {path: '/index', component: () => import('@/views/Index.vue'), meta: {title: '首页'}},
        {path: '/todo', component: () => import('@/views/Todo.vue'), meta: {title: '代办事项'}},
        {path: '/article', redirect: '/article/list'},
        {
            path: '/article/list',
            component: () => import('@/views/article/ArticleList.vue'),
            meta: {title: '文章'},
        },
        {
            path: '/article/:id',
            component: () => import('@/views/article/Article.vue'),
            meta: {title: '文章'},
        },
        {
            path: '/question',
            component: () => import('@/views/Question.vue'),
            meta: {title: '题目'},
        },

    ].concat(toolsRoutes),
}];


export const router = createRouter({
    // 创建一个 hash 历史记录。
    history: createWebHistory(),
    // 应该添加到路由的初始路由列表。
    routes: mainRoutes.concat(globalRoutes),
    //routes: mainRoutes,
    // 是否应该禁止尾部斜杠。默认为假
    strict: true,
    scrollBehavior: () => ({left: 0, top: 0}),
});

router.beforeEach((to, from, next) => {

    document.title = to.meta.title ?? 'vue';

    if (to.meta.anno) {
        next();
        return;
    }
    // ElNotification({
    //     title: '检查登录',
    //     type: 'info',
    //     offset: 50,
    // });
    http.get('/user/isLogin').then(
        (res) => {
            if (!res.data) {
                ElNotification({
                    title: '未登录,请先登录',
                    type: 'info',
                    duration: 1000,
                });
                localStorage.clear();
                next('login');
            } else {
                next();
            }
        },
        () => {
            next('login');
        },
    );
});



