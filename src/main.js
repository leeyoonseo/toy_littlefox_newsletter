import Vue from 'vue'
import App from './App.vue'
import { router } from './routes/index.js'
import { store } from './store/index.js'

// import './assets/js/jquery-3.4.1.min';
import './assets/css/reset.css';

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App),
    router
}).$mount('#app')

