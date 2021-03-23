import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        config : '',
        uiConfig : '',
        data : '',
        content : '',
        contentURL : '',
        styleText : '',
        styleSheetURL : ''
    },
    getters,
    mutations,
    actions 
});