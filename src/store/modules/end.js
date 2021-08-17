const state = {
    dialogVisible: false
}

const mutations = {
    TOGGLE_DIALOG: state => {
        if (state.dialogVisible){
            state.dialogVisible = false;
        } else {
            state.dialogVisible = true
        }
    }
}

const actions = {
    toggleDialogVisible({ commit }){
        commit('TOGGLE_DIALOG')
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}