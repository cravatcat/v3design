import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import componetsUses from './components';
import './assets/styles/index.scss';

createApp(App)
  .use(Antd)
  .use(componetsUses)
  .mount('#app');
