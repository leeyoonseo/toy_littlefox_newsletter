import { fetchData, fetchConfig } from '../api/index.js';

export default {
    /**
     * config 가져오기
     * [D] Global은 List 목록을 그리기 위해서 uiConfig와 config 사용
     * @param {Object} commit 속성을 노출하는 객체(context)의 commit 메소드
     * @param {String} url config.json 경로
     */
    async FETCH_CONFIG({ commit }, name){
        const response = await fetchConfig(name);
        const { data } = response;

        if (name === 'Global') {
            commit('SET_CONFIG', data);
        }

        commit('SET_UI_CONFIG', data);
        
        return response;
    },

    /**
     * 콘텐츠 가져오기
     * @param {Object} commit 속성을 노출하는 객체(context)의 commit 메소드
     * @param {Object} getters 속성을 노출하는 객체(context)의 getters 메소드
     * @param {String} url 콘텐츠 경로
     */
    async FETCH_CONTENT_TEXT({ commit, getters }, url){
        const response = await fetchData(url);
        const content = getContent();
        
        commit('SET_CONTENT', content);

        /**
         * 원하는 HTML만 리턴
         * @return {Object} content - 렌더링 할 content
         */
        function getContent(){
            const el = document.createElement('div');
            const { UI_CONFIG, DATA } = getters;
            const id = ( DATA.type === 'letter') ? UI_CONFIG.wrapperLetter : UI_CONFIG.wrapperNews;
            let content;

            el.innerHTML = response.data;

            for(let i = 0; i < el.childNodes.length; i++){
                if(el.childNodes[i].id === id){
                    content = el.childNodes[i];
                }
            }

            return content;
        } // getContent

        return response;
    },
    
    /**
     * 스타일 가져오기
     * @param {Object} commit 속성을 노출하는 객체(context)의 commit 메소드
     * @param {String} url 스타일시트 경로
     */
    async FETCH_STYLE_TEXT({ commit }, url){
        const response = await fetchData(url);

        commit('SET_STYLE_TEXT', response.data);
        return response;
    },

 } // actions