import { createApp } from 'vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.less'
import Antd from 'ant-design-vue/es';
import axios from 'axios';
import 'ant-design-vue/lib/style';
import router from './router'


axios.defaults.baseURL = 'http://localhost:3400';

const app = createApp(App).use(router).use(router);
app.use(Antd)
	.mount('#app')
