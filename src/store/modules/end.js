const state = {
    dialogVisible: false,
    dialogForUpdateVisible: false,
    dialogForLogVisible: false
}

const mutations = {
    TOGGLE_DIALOG: state => {
        if (state.dialogVisible){
            state.dialogVisible = false;
        } else {
            state.dialogVisible = true
        }
    },
    TOGGLE_UPDATE_DIALOG: state => {
        if (state.dialogForUpdateVisible){
            state.dialogForUpdateVisible = false;
        } else {
            state.dialogForUpdateVisible = true
        }
    }, 
    TOGGLE_LOG_DIALOG: state => {
        if (state.dialogForLogVisible){
            state.dialogForLogVisible = false;
        } else {
            state.dialogForLogVisible = true
        }
    }, 

}

const actions = {
    toggleDialogVisible({ commit }){
        commit('TOGGLE_DIALOG')
    }, 
    toggleDialogForUpdateVisible({ commit }){
        commit('TOGGLE_UPDATE_DIALOG')
    },
    toggleDialogForLogVisible({ commit }){
        commit('TOGGLE_LOG_DIALOG')
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}