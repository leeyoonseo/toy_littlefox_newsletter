import Vue from 'vue';
import Router from 'vue-router';
import Main from '../views/Main.vue';
import CreateLangView from '../views/CreateLangView.js';

Vue.use(Router);

export const router = new Router({ 
    mode : 'history',
    routes : [
        { 
            name : 'Main', 
            path : '/', 
            component : Main
        },        
        {
            name : 'CN', 
            path : '/cn',
            component : CreateLangView('CN')
        },
        { 
            name : 'EN', 
            path : '/en', 
            component : CreateLangView('EN')
        },
        { 
            name : 'Global', 
            path : '/global', 
            component : CreateLangView('Global')
        }
    ]
});