import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		journeys: [],
		currentTime: null,
		formatedCurrentTime: null
	},

	getters: {
		journeys: (state) => state.journeys,
		currentTime: (state) => state.currentTime,
		formatedCurrentTime: (state) => state.formatedCurrentTime
	},

	mutations: {
		FETCH_JOURNEYS(state, journeys) {
			state.journeys = journeys;
		},

		SET_CURRENT_TIME(state, moment) {
			state.currentTime = moment;
			state.formatedCurrentTime = moment.format('HH:mm');
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
