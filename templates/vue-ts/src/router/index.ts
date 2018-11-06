import Vue from 'vue';
import VueRouter from 'vue-router';

import counter from '../components/counter.vue';
import field from '../components/field.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/counter'
    },
    {
      path: '/counter',
      component: counter
    },
    {
      path: '/field',
      component: field
    }
  ]
});

export default router;
