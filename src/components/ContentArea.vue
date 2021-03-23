<template>
    <div>
        <!-- [D] PC 컨텐츠 -->
        <section v-show="isPC" ref="realContent" v-html="content.outerHTML" class="content-area__real"></section>

        <!-- [D] Mobile 컨텐츠 -->
        <template v-if="name !== 'CN'">
            <section v-show="!isPC" class="content-area__preview"> 
                <iframe :src="contentURL" width="363px" class="content-area__preview__iframe"></iframe>
            </section>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name : 'ContentArea',
    
    data(){
        return{
            contentURL : '',
            name : this.$route.name
        }
    },

    computed : {
        ...mapGetters({
            uiConfig : 'UI_CONFIG',
            data : 'DATA',
            content : 'CONTENT',
            styleSheetURL : 'STYLESHEET_URL',
        }),

        isPC(){
            if(this.$route.name !== 'CN' && this.data.type === 'news' && this.data.screen === 'mobile'){
                return false;
            
            }else{
                return true;
                
            }
        }
    },

    watch : {
        styleSheetURL(){
            this.setStyleSheetURL();
        },

        data(){
            if(this.$route.name === 'Global'){
                if(this.data.type === 'news'){
                    if(this.data.screen) this.setContentURL(this.data);
                
                }else{
                    if(this.data.language) this.setContentURL(this.data);
                
                }

            }else{
                this.setContentURL(this.data);
            }
        }
    },
    
    methods : {

        setContentURL(){
            const contentArea = this.$refs.realContent;
            let contentURL;
           
            contentURL = `/${this.$route.name}/${this.uiConfig.folderName}/${this.data.type}`;    
            contentURL += (this.$route.name === 'Global') ? `/${this.data.language}.html` : '.html'; 

            this.contentURL = contentURL;
            this.$store.dispatch('FETCH_CONTENT_TEXT', contentURL);
        },

        setStyleSheetURL(){
            const newsStyle = document.getElementById('newsStyle');
            newsStyle.href = this.styleSheetURL;
        }       
           
    } // methods
}
</script>

<style scoped>
    .content-area__real{
        z-index:0;
        position:relative;
        padding:100px 0 50px;
        margin-left:200px;
        box-sizing:border-box;
    }
    .content-area__preview{
        z-index:0;
        padding:100px 0 50px;
        margin-left:200px;
    }
    .content-area__preview__iframe{
        display:block;
        margin:0 auto;
        min-height:812px;
        max-height:1200px;
        border:1px solid #aaa;
    }

    /* 동적 콘텐츠 내부에 있는 table */
    .real_content > table{
        margin:0 auto;
    }
</style>