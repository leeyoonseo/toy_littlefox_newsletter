export default {
    INIT_DATA(state){
        state.config = '';
        state.uiConfig = '';
        state.data = '';
        state.content = '';
        state.contentURL = '';
        state.styleText = '';
        state.styleSheetURL = '';
    },

    SET_CONFIG(state, config){
        state.config = config;
    },

    SET_UI_CONFIG(state, uiConfig){
        state.uiConfig = uiConfig;
    },

    SET_DATA(state, data){
        state.data = data;
    },

    SET_CONTENT(state, content){
        state.content = content;
    },

    SET_CONTENT_URL(state, contentURL){
        state.originContent = contentURL;
    },

    SET_STYLE_TEXT(state, styleText){
        state.styleText = styleText;
    },

    SET_CSS_URL(state, styleSheetURL){
        state.styleSheetURL = styleSheetURL;
    },
}