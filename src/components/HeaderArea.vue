<template>
        <header class="header">
            <h1 class="header__title">
                <router-link to="/" title="메인으로 가기" class="header__link__main">
                    <img class="main__logo" src="../assets/img/littlefox_logo.png" title="로고">
                    Little Fox News Letter Solution
                </router-link>
            </h1>

            <template v-if="this.$route.name === 'Global'">
                <button v-show="isOpen" @click="onClick" class="header__button">목록</button>
            </template>
        </header>
</template>

<script>
export default {
    name : 'HeaderArea',

    props : {
        isOpen : Boolean
    },

    computed : {
        uiConfig(){
            return this.$store.getters.UI_CONFIG;
        }
    },

    methods : {
        onClick(){
            this.$emit('openGlobalList');
        }
    }
}
</script>

<style scoped>
    /* 헤더 */
    .header {
        z-index:3;
        position:fixed; left:0; right:0; top:0;
        padding:5px 1em;
        min-width:815px;
        height:40px;
        line-height:40px;
        background:#fff;
        box-shadow:0 0 5px 0 rgba(0,0,0,.5);
    }
    .header__title{
        display:inline-block;
        margin:0;
        font-size:1em;
        cursor:pointer;
    }
    .header__link__main{
        float:left;
        height:40px;
        line-height:40px;
        letter-spacing:-1px;
    }
    .header__link__main img {
        width: 3em;
        vertical-align: middle;
        margin-right: 5px;
    }

    /* 목록 버튼 */
    .header__button{
        float:right;
        width:55px; height:40px;
        color:#fff; font-weight:700; text-align:center;
        background:#014099;
        cursor:pointer;
    }
    .header__button:hover{
        border:none;
        background-color:#022d6a;
    }
</style>