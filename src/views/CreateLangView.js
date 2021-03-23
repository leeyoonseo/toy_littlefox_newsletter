import FetchConfigMixin from '../mixins/FetchConfigMixin.js';
import Index from './Index.vue';

export default function createLangView(name){
    return{
        name : name,

        mixins : [FetchConfigMixin],
        
        props : {
            info : Object
        },

        render(createElement){
            return createElement(Index);
        }
    }
}