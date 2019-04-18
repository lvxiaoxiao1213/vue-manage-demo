import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    adminInfo: {
        avatar: 'default.jpg'
    }
}

const mutations = {
    saveAdminInfo(state, adminInfo) {
        state.adminInfo = adminInfo;
    }
}

const actions = {
    getAdminData({commit}) {
        
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})
