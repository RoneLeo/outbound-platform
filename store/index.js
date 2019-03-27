import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	// strict: process.env.NODE_ENV !== 'production',
	state: {
		login: false,
		token: '',
		avatarUrl: '',
		userName: 'haha',
		imgSrc: '',
		videoSrc: '',
		formData: {
			ba: '',
			wz: '四川省成都市',
			pic: '',
			audios: [],
			imgs: [],
			videos: []
		}
	},
	getters: {
		doneTodos: state => {
			return state.todos.filter(todo => todo.done)
		}
	},
	mutations: {
		resetFormData(state){
			state.formData = {
				ba: '',
				wz: '四川省成都市',
				pic: '',
				audios: [],
				imgs: [],
				videos: []
			}
		},
		saveFormData(state, form) {
			const oldForm = state.formData;
			state.formData = Object.assign(oldForm, form);
			console.log('state.formData', state.formData);
		},
		login(state, provider) {
			console.log(state)
			console.log(provider)
			state.login = true;
			state.token = provider.token;
			state.userName = provider.userName;
			state.avatarUrl = provider.avatarUrl;
		},
		logout(state) {
			state.login = false;
			state.token = '';
			state.userName = '';
			state.avatarUrl = '';
		}
	}
})
export default store
