import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import store from './src/store';
import app from './src/components/app.vue';
import demoCounter from './src/components/demo-counter.vue';
import demoModel from './src/components/demo-model.vue';
import demoAlive from './src/components/demo-alive.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/demo-counter',
            component: demoCounter,
        },
        {
            path: '/demo-model',
            component: demoModel,
        },
        {
            path: '/demo-alive',
            component: demoAlive,
        },
    ],
});

new Vue({
    el: '#root',
    template: '<app />',
    store,
    router,
    components: {
        app,
    },
});
