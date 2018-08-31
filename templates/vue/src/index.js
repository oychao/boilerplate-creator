import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { sync } from 'vuex-router-sync';

import store from './store';
import router from './router';
import app from './components/app.vue';

Vue.use(VueAxios, axios);

console.log(Vue.axios === axios);

const unsync = sync(store, router);

const vm = new Vue({
  components: {
    app
  },
  el: '#root',
  template: '<app />',
  router,
  store
});
