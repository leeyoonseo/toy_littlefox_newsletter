<template>
    <section class="side-tab">

        <nav>
            <!-- 뉴스레터, 새소식 탭 -->
            <ul ref="tabType" class="side-tab__type">
                <template v-if="uiConfig.useLetter">
                    <li @click="onClickTypeTab" data-type="letter" class="side-tab__list side-tab__type__list">뉴스레터</li>
                </template>

                <template v-if="uiConfig.useNews">
                    <li @click="onClickTypeTab" data-type="news" class="side-tab__list side-tab__type__list">새소식</li>
                </template>
            </ul>

            <!-- 언어 탭 -->
            <ul v-if="name === 'Global'" ref="tabLang" class="side-tab__lang">
                <template v-if="data.type">
                    <template v-for="(lang, v) in uiConfig.language[data.type]">
                        <li :key="v" :data-language="lang" @click="onClickLangTab" class="side-tab__list side-tab__lang__list">{{ lang }}</li>
                    </template>
                </template>
            </ul>

            <!-- PC, Mobile 탭 -->
            <ul v-if="name !== 'CN' && data.type" v-show="data.type == 'news'" ref="tabScreen"
                :class="['side-tab__screen', data.type == 'news' ? 'on' : '']">
                    <li @click="onClickScreenTab" data-screen="pc" class="side-tab__list side-tab__screen__list">PC</li>
                    <li @click="onClickScreenTab" data-screen="mobile" class="side-tab__list side-tab__screen__list">Mobile</li>
            </ul>
        </nav>

        <code-view-button></code-view-button>

    </section><!-- // .side_tab -->
</template>

<script>
import EventBus from '../utils/EventBus.js';
import CodeViewButton from './CodeViewButton.vue';

export default {
    name : 'SideTab',

    components : {
        CodeViewButton
    },

    data(){
        return {
            data : '',
            styleSheetURL : '',
            name : this.$route.name
        }
    },

    computed : {
        uiConfig(){
            return this.$store.getters.UI_CONFIG;
        }
    },

    watch : {
        data : function(){
            this.$store.commit('SET_DATA', this.data);
        }
    },
  
    // [D] Lifecycle : components, template, dom 접근 가능
    mounted(){

        // [D] config 준비 완료
        EventBus.$on('ready', () => {
            this.$nextTick(() => {
                this.init();
            });
        });
    },

    methods : {
        init(){
            this.onClickChild('tabType');
            this.saveStyleSheetURL();
        },

        /**
         * 탭 첫번째 자식 객체 클릭
         * @param {String} target - 클릭한 객체의 부모 ID값 
         */
        onClickChild(target){   
            const tabs = this.$refs[target];
            const firstChild = this.findFirstChild(tabs);

            firstChild.click();
        },

        /**
         * 뉴스레터, 새소식 탭 클릭 시
         * @param {Object} e - MouseEvent
         */
        onClickTypeTab(e){
            this.data = ''; // 초기화
            this.onTabClick(e);

            this.$nextTick(() => {
                if(this.name === 'EN' && this.data.type === 'news'){
                    this.onClickChild('tabScreen');
                    this.setPosTab('tabType');

                }else if(this.name === 'Global'){
                    this.onClickChild('tabLang');

                    if(this.data.type === 'news'){
                        this.onClickChild('tabScreen');
                    }
                }
            });            
        },

        /**
         * 언어 탭 클릭 시
         * @param {Object} e - MouseEvent
         */
        onClickLangTab(e){
            this.onTabClick(e);
            
            if(this.name !== 'CN' && this.data.type === 'news') {
                this.setPosTab('tabLang');
            }
        },

        /**
         * PC, Mobile 탭 클릭 시
         * @param {Object} e - MouseEvent
         */
        onClickScreenTab(e){
            this.onTabClick(e);

        },

        /**
         * 탭 클릭 시, 데이터 값 저장 및 타겟에 on 클래스 추가
         * @param {Object} e - MouseEvent
         */
        onTabClick(e){
            const siblings = this.getSiblings(e);
            const { target } = e;

            siblings.filter(function(e){
                const classAttr = e.getAttribute('class');

                if((/on/g).test(classAttr)){
                    e.classList.remove('on');
                }
            });

            target.classList.add('on');   
            this.data = Object.assign({}, this.data, target.dataset);
        },

        /**
         * 자식요소의 첫번째 객체 리턴
         * @param {Object} target - 자식요소를 찾을 부모 객체
         * @return {Object} arr[0] - 첫번째 자식 객체
         */
        findFirstChild(target){
            let arr = [];
            target = target.childNodes;

            for(let i = 0; i < target.length; i++){
                if(target[i].nodeType === Node.ELEMENT_NODE){
                    arr.push(target[i]);
                }
            }

            return arr[0];
        },

        // stylesheet의 주소 정보 저장
        saveStyleSheetURL(){
            if(this.name === 'CN') return false;

            const url = `${__dirname+this.name}/${this.uiConfig.folderName}/${this.uiConfig.stylesheet}`;

            this.styleSheetURL = url;
            this.$store.commit('SET_CSS_URL', this.styleSheetURL);
            this.$store.dispatch('FETCH_STYLE_TEXT', this.styleSheetURL);
        },

        /**
         * object를 배열에 넣어 리턴
         * @param {Object} el - 배열에 담을 object
         * @return {Array} arr - object를 담은 배열
         */
        objectToArray(el){
            let arr = [];

            for(let i = 0; i < el.length; i++){
                arr.push(el[i]);
            }

            return arr;
        },

        /**
         * 형제 요소 찾기
         * @param {Object} target - 형제 요소를 찾을 객체
         * @return {Array} arr - 형제 요소를 담은 배열
         */
        getSiblings({ target }){
            const { children } = target.parentElement;
            const arr = this.objectToArray(children);

            return arr.filter((e) => e !== target);
        },

        /**
         * 탭의 위치 조정함
         */
        setPosTab(id){
            const target = this.$refs.tabScreen;
            let tabs = this.$refs[id].children;
            let onTab;

            tabs = this.objectToArray(tabs);

            for(var i = 0; i < tabs.length; i++){
                if(tabs[i].getAttribute('class').match('on')) {
                    onTab = tabs[i];
                }
            }

            target.style.top = `${onTab.offsetTop}px`;
        }

    } // methods
}
</script>

<style scoped>
    .side-tab{
        z-index:1;
        position:fixed; left:0; top:50px; bottom:0;
        width:200px;
        border-right:1px solid #ccc;
        background:#f7f7f7;
        box-sizing:border-box;
    }
    .side-tab__list{
        z-index:10;
        position:relative;
        cursor:pointer;
    }
    .side-tab__type {
        margin:0; padding:0;
        width:100%;
    }
    .side-tab__type__list{
        padding:15px 0;
        line-height:20px;
        text-indent:15px;
        background:#dce3e6;
        box-sizing:border-box;
    }
    .side-tab__type__list.on,
    .side-tab__type__list:hover{
        color:#fff;
        background:#014099;
    }

    .en .news .side-tab__type__list.on:after{
        content:'';
        display:block;
        position:absolute; top:50%; right:-7px; 
        width:0; height:0; 
        border-right:7px solid none;
        border-left:7px solid #014099;
        border-top:7px solid transparent;
        border-bottom:7px solid  transparent;
        transform:translateY(-50%);
    }

    /* 언어 탭 */
    .side-tab__lang{
        margin:0;
        padding:0;
        background:#f5f4f3;
    }
    .side-tab__lang__list{
        position:relative;
        padding:1em;
        color:#333; font-size:85%; font-weight:normal;
        border-bottom:1px dashed #ccc;
        background:inherit; box-sizing:border-box;
    }
    .side-tab__lang__list.on, 
    .side-tab__lang__list:hover{
        width:100%;
        color:#014099;
        font-weight:bolder;
        background:#fff;
    }
    .side-tab__lang__list.on{
        border:1px solid #014099;
        box-sizing:border-box;
    }

    /* PC, Mobile 탭 */
    .side-tab__screen{
        overflow:hidden;
        position:absolute; top:0; right:-85px;
        color:#014099; font-size:85%; font-weight:700; text-align:center; 
        background:#f5f4f3;
    }
    .side-tab__screen__list{
        float:left;
        display:block;
        padding:15px 0;
        width:100%;
        line-height:20px;
        border:1px solid #014099;
        box-sizing:border-box;
    }
    .side-tab__screen__list + .side-tab__screen__list{
        border-top:0;
    }
    .side-tab__screen__list.on, 
    .side-tab__screen__list:hover{
        color:#fff;
        background:#014099;
    }    
</style>