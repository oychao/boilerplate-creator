import Vue from 'vue';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';

import store from './store';
import router from './router';
import app from './components/app.vue';

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
