import Vue from 'vue';

import App from 'comps/App.vue';

const v = new Vue({
  el: '#app',
  template: '<app></app>',
  data: { name: 'World' },
  components: { App }
});
