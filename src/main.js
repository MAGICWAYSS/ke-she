import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import request from "@/utils/request";
import store from './store/index'
import echarts from "echarts"
import 'element-ui/lib/theme-chalk/index.css'
import '../fontCss/iconfont.css'
Vue.config.productionTip = false
Vue.use(ElementUI, { size: "small" });
Vue.prototype.request=request
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')