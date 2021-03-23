<template>
    <aside v-show="isOpen" class="code-viewer">
        <div class="code-viewer__inner">
            <textarea 
                ref="code" 
                v-model="resultCode" 
                contenteditable="true" 
                class="code-viewer__code"
                readonly
            ></textarea>

            <button @click="onClose" type="button" class="code-viewer__button">닫기</button>
            <button @click="onCopy" type="button" class="code-viewer__button">복사하기</button>
        </div>
    </aside>
</template>

<script>
import EventBus from '../utils/EventBus.js';
import { mapGetters } from 'vuex';

export default {
    name : 'codeViewer',
    
    data(){
        return{
            isOpen : false,
            resultCode : ''
        }
    },

    computed : mapGetters({
        content : 'CONTENT',
        styleText : 'STYLE_TEXT',
        data : 'DATA' 
    }),

    // [D] Lifecycle : components, template, dom 접근 가능
    mounted(){
        EventBus.$on('open-code-popup', () => this.onOpen());

    },

    methods : {

        setResultCode(){
            this.resultCode = '';

            if(this.$route.name !== 'CN' && this.data.type === 'news'){
                this.resultCode += '<style rel="stylesheet" type="text/css">' + this.styleText + '</style>';
            }

            this.resultCode += this.content.outerHTML;
        },
        
        onOpen(){
            this.isOpen = true;
            this.setResultCode();
        },

        onClose(){
            this.isOpen = false;
        },

        // @support IE11~ | Chrome | Opera | Whale | FireFox
        onCopy(){
            const target = this.$refs.code;
            target.select();
            document.execCommand("copy");
        }

    } // methods
}
</script>

<style scoped>
    .code-viewer{
        z-index:9;
        position:fixed; left:0; right:0; top:0; bottom:0;
        background:rgba(0,0,0,.6);
    }
    .code-viewer__inner{
        position:absolute; 
        left:10%; 
        right:10%; 
        top:10%; 
        bottom:10%;
        color:#333;
        font-size:0.85em;
        background:#fff;
    }
    .code-viewer__code{
        z-index:1;
        overflow-y:auto
        ;position:relative;
        padding:1em;
        width:100%;
        height:100%;
        box-sizing:border-box;
    }
    .code-viewer__button{
        position:absolute;
        width:5em;
        height:3em;
        left:100%;
        top:0;
    }
    .code-viewer__button + .code-viewer__button{
        top:3.5em;
    }
</style>