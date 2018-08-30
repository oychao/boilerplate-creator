import Vue from 'vue';

import store from './store';
import App from 'comps/App.vue';

const v = new Vue({
  components: { App },
  data: { name: 'World' },
  el: '#app',
  template: '<app></app>',
  store
});
