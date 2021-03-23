<template>
    <div class="code-view-button">
        <button @click="onClick" type="button" class="code-view-button__button">코드보기</button>
    </div>
</template>

<script>
import EventBus from '../utils/EventBus.js';

export default {
    name : 'CodeViewButton',

    methods : {
        onClick(){
            EventBus.$emit('open-code-popup');
        }
    }
}
</script>

<style scoped>
    .code-view-button{
        padding:2em 1em;
        font-size:16px;
        text-align:center;
    }
    .code-view-button__button{
        width:100%;
        height:3.077em;
        border-radius:1.5em;
    }
</style>