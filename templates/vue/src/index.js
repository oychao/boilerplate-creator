import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { sync } from 'vuex-router-sync';

import store from './store';
import router from './router';
import app from './components/app.vue';

Vue.use(VueAxios, axios);

sync(store, router);

new Vue({
  el: '#app',
  components: {
    app
  },
  template: '<app />',
  router,
  store
});
