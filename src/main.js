import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import VueTheMask from 'vue-the-mask';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap.js';


Vue.use(BootstrapVue);
Vue.use(VueResource);
//Vue.http.headers.common['Access-Control-Allow-Origin'] = true;
Vue.use(VueRouter);
Vue.use(VueTheMask);

new Vue({
  el: '#app',
  render: h => h(App)
})
