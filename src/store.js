import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

function getAlertColorByType(type){
    switch(type){
        case "error":
            return "#f44336";
        case "success":
            return "#4CAF50";
        case "alert":
            return "#ffeb3b";
        default:
            return "#2196F3";
    }
}

const UI = {
    state: () => ({
        snackbar: {
            text: null,
            color: null,
        },
        userPremises: null
    }),
    mutations: {
        updateSnackbar(state, Snackbar){
            state.snackbar=Snackbar
        },
        updateUserPremises(state, userPremises){
            state.userPremises=userPremises
        },
    },
    actions: {
        updateSnackbar(context, [text, type]){
            context.commit("updateSnackbar",{
                text: text,
                color: getAlertColorByType(type),
            });

            setTimeout(() => {
                context.commit("updateSnackbar",{
                    text: null,
                    color: null,
                });
            }, 3000)
        },
        updateUserPremises(context, userPremises){
            context.commit("updateUserPremises", userPremises);
        },
    },
    getters: {
        getSnackbar(state){
            return state.snackbar
        },
        getUserPremises(state){
            return state.userPremises
        },
    }
};

const User = {
    state: () => ({
        user: null,
    }),
    mutations: {
        updateUser(state, user){
            state.user=user
        },
    },
    actions: {
        updateUser(context, user){
            context.commit("updateUser",user);
        },
    },
    getters: {
        getUser(state){
            return state.user
        },
    }
};

const store = new Vuex.Store({
    modules: {
        User: User,
        UI: UI
    }
});

export default store