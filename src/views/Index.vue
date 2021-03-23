<template>
    <div>
        <header-area :isOpen="!isOpen" @openGlobalList="onOpen"></header-area>
        <side-tab></side-tab>

        <template v-if="this.$route.name === 'Global'">
            <global-list v-show="isOpen" :isOpen="isOpen" @closeGlobalList="onClose"></global-list>
        </template>

        <content-area></content-area>
        <code-viewer></code-viewer>
    </div>
</template>

<script>
import HeaderArea from '../components/HeaderArea.vue';
import SideTab from '../components/SideTab.vue';
import GlobalList from '../components/GlobalList.vue';
import ContentArea from '../components/ContentArea.vue';
import CodeViewer from '../components/CodeViewer.vue';

export default {
    name : 'Index', 

    components : {
        HeaderArea,
        SideTab,
        GlobalList,
        ContentArea,
        CodeViewer
    },

    data(){
        return{
            isOpen : true
        }
    },

    methods : {
        onClose(){
            this.isOpen = false;
        },

        onOpen(){
            this.isOpen = true;
        }
    }
}
</script>

<style>
    @import url("../assets/css/page_common.css");
    @import url("../assets/css/ui.VideoLayer.css");
</style>