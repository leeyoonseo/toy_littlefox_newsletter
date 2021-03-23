import EventBus from '../utils/EventBus.js';

export default {
    // [D] 렌더링하는 라우트 앞에 호출됨
    beforeRouteEnter (to, from, next){
        next(vm => {
            vm.$store.dispatch('FETCH_CONFIG', to.name)
            .then(() => {
                if(to.name !== 'Global'){
                    EventBus.$emit('ready');
                }    
            });
        });
    }
}