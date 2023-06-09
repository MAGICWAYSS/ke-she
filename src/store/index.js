import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import category from './category'
import booklist from './booklist'
import borrowInfo from './borrowInfo'
import readerlist from './readerlist'
import report from './report'
import createPersistedstate from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab,
        category,
        booklist,
        borrowInfo,
        readerlist,
        report
    },
    plugins: [
        // veux持久化配置
        createPersistedstate({
          key: 'rabbitstore-client',
          paths: ['booklist','category']
        })
      ]
    
})
