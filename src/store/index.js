import Vue from 'vue'
import Vuex from 'vuex'
// import menus from "./modules/menus";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tokenValue: '',
		permList: [],
	},
	mutations: {

		SET_TOKEN: (state, tokenValue) => {
			state.tokenValue = tokenValue
			localStorage.setItem("pltoken", tokenValue)
		},

		SAVE_MYPERM: (state, permissionList) => {
			state.permList = permissionList
			localStorage.setItem("qx", JSON.stringify(permissionList))
		},

	},
	actions: {},
	modules: {
		// menus
	}
})
