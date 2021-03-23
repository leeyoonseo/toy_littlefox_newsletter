<template>
  <div class="global-list">
        <h2 class="hidden">목록 리스트</h2>

        <ul class="global-list__inner">
            <template v-for="(data, i) in config">
                <li :class="data.folderName" :data-index="i" :key="i" 
                    :style="{ 
                        backgroundImage : `url(${root}Global/${data.folderName}/news/global_news/head_bg.png`,
                        backgroundSize : 'cover',
                        backgroundRepeat : 'no-repeat'
                    }"
                    @click="onClick"
                    class="global-list__list"
                >
                    <span class="global-list__title">{{data.title}}</span>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import EventBus from '../utils/EventBus.js';

export default {
    name : 'GlobalList',
    
    props : {
        isOpen : Boolean
    },

    data(){
        return{
            root : __dirname // 배경이미지에 사용
        }
    },

    computed : {
        config(){
            return this.$store.getters.CONFIG;
        }
    },

    methods : {
        onClick({ target }){
            this.$store.commit('SET_UI_CONFIG', this.config[target.dataset.index]);
            this.$emit('closeGlobalList');

            EventBus.$emit('ready');
        }
    }
}
</script>

<style scoped>
    .global-list{
        z-index:2;
        overflow-y:auto;
        position:fixed; top:50px;
        width:100%; height:calc(100% - 50px);
        background:#fff;
    }
    .global-list__inner{
        overflow:hidden;
        padding:50px 0;
        margin:0 auto;
        width:820px;
    }
    .global-list__list{
        float:left;
        margin-top:20px;
        width:400px; height:127px;        
        cursor:pointer;
    }
    .global-list__list:hover{
        box-shadow:3px 3px 10px rgba(0,0,0,0.5);
    }
    .global-list__list:nth-child(1),
    .global-list__list:nth-child(2){
        margin-top:0;
    }
    .global-list__list:nth-child(2n){
        margin-left:20px;
    }
    .global-list__title{
        display:inline-block;
        padding:5px 10px;
        color:#fff;
        background:rgba(0,0,0,0.5);
    }
</style>