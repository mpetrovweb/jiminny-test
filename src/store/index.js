import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		journeys: []
	},

	getters: {
		journeys: (state) => state.journeys
	},

	mutations: {
		FETCH_JOURNEYS(state, journeys) {
			state.journeys = journeys;
		}
	},

	actions: {
		fetchJourneys({commit}) {
			return fetch('http://localhost:8080/journeys.json')
				.then(response => response.json())
				.then(data => {
					commit('FETCH_JOURNEYS', data.journeys);
				});
		}
	}
});
