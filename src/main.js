import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './css/tailwindcss.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueDiff from 'vue-diff';
import 'vue-diff/dist/index.css';

const app = createApp(App);
app.use(VueDiff);
app.use(ElementPlus, { locale: zhCn });
app.use(router);
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
// }

app.mount('#app');