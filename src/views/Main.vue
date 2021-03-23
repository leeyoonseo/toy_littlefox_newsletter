<template>
    <div class="main">
        <header>
            <h1 class="main__title">
                <img class="main__logo" src="../assets/img/littlefox_logo.png" title="로고">
                <span>Little Fox News Letter Solution</span>
            </h1>

            <div class="main__info">
                version.03 (vuejs)
                <p class="main__info__version"></p>
            </div>
        </header>

        <nav class="main__nav">
            <ul>
                <li v-for="(data, i) in navData" :key="i" class="main__nav__list">
                    <!-- [D] 내부 링크 -->
                    <template v-if="data.to">
                        <router-link :to="data.to" :title="data.title" class="main__nav__anchor">
                            <span v-html="data.text" class="main__nav__title"></span>
                        </router-link>
                    </template>
                    
                    <!-- [D] 외부 링크 -->
                    <template v-if="!data.to">
                        <a :href="data.href" :title="data.title" class="main__nav__anchor">
                            <span v-html="data.text" class="main__nav__title"></span>
                        </a>
                    </template>
                </li>
            </ul>
        </nav>

        <footer class="main__nav__footer">
            &copy; 2000~{{ new Date().getFullYear() }} Little Fox Co., Ltd. All rights reserved.
        </footer>

    </div><!-- // .main -->
</template>

<script>
import EventBus from '../utils/EventBus.js';

export default {
    name : 'Main',
    data(){
        return{

            // [D] 외부 링크 인 경우 href로 작성
            navData : [
                { 
                    to : '/en',
                    title : '리틀팍스 영어 새소식/뉴스레터 페이지 바로가기',
                    text : '영어'
                },

                { 
                    to : '/cn',
                    title : '리틀팍스 중국어 새소식/뉴스레터 페이지 바로가기',
                    text : '중국어'
                },

                { 
                    to : '/global',
                    title : '리틀팍스 글로벌 새소식/뉴스레터 페이지 바로가기',
                    text : '글로벌'
                },

                { 
                    href : 'https://www.littlefox.co.kr/ko',
                    title : '리틀팍스 사이트 바로가기',
                    text : '리틀팍스<br>바로가기'
                },

            ]
        }
    },

    created(){
        // [D] 데이터 리셋
        EventBus.$off();
        this.$store.commit('INIT_DATA');   
    },

    methods : {
        isRouterLink(data){
            if(data.to){
                return true;
                
            }else{
                return false;

            }
        }
    }
}
</script>

<style scoped>
    .main{
        margin: 0 auto;
        padding: 2em;
        max-width: 1280px;
        min-width: 1000px;
        text-align: center;
        box-sizing: border-box;
    }

    .main__title{
        padding: 0.5em 0;
        border-bottom: 3px solid #333;
    }
    .main__logo{
        position: relative;
        top: 5px;
        margin-right: 0.2em;
        width: 77px;
        height: auto;
    }

    .main__info{
        overflow: hidden;
        padding: 1em 0;
        font-size: 0.8em;
        text-align: right;
        border-bottom: 1px solid #aaa;
    }

    .main__nav{
        overflow: hidden;
        padding: 10em 0;
    }
    .main__nav__list{
        display: block;
        float: left;
        width: 24%;
        height: 200px;
        font-size: 140%;
        border: 1px solid #ddd;
        box-sizing: border-box;
        text-align: center;
    }
    .main__nav__list + .main__nav__list{
        margin-left: 1%;
    }
    .main__nav__anchor{
        display: inline-block;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        font-weight: 700;
        background: #f5f5f5;
        box-sizing: border-box;
    }
    .main__nav__anchor:hover{
        color: #fff;
        background: #0e4493;
    }
    .main__nav__title{
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
    }
    .main__nav__footer{
        padding: 1em 0;
        float: left;
        width: 100%;
        font-size: 0.8em;
        text-align: center;
        border-top: 1px solid #838383;
    }
</style>