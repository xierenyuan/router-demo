import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.config.debug = true;

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [{
        path: '/',
        component: require('./views/app.vue'),
        children: [{
            name: 'hello',
            path: '/hello',
            component: require('./views/pages/hello.vue')
        }]
    }]
});



//启动
const app = new Vue({
    router
}).$mount('#app');