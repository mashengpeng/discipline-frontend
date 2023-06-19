import {createApp} from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import "./css/tailwindcss.css"
import {router} from "./router";

createApp(App).use(router).use(Antd).mount('#app')
