import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		journeys: [],
		currentTime: null,
		formatedCurrentTime: null,
		trainsInTransit: []
	},

	getters: {
		journeys: (state) => state.journeys,
		currentTime: (state) => state.currentTime,
		formatedCurrentTime: (state) => state.formatedCurrentTime,
		trainsInTransit: (state) => state.trainsInTransit
	},

	mutations: {
		FETCH_JOURNEYS(state, journeys) {
			state.journeys = journeys;
		},

		SET_CURRENT_TIME(state, moment) {
			state.currentTime = moment;
			state.formatedCurrentTime = moment.format('HH:mm');
		},

		ADD_TRAIN_IN_TRANSIT(state, train) {
			state.trainsInTransit.push(train);
		},

		REMOVE_TRAIN_IN_TRANSIT(state, train) {
			const index = state.trainsInTransit.indexOf(train);

			state.trainsInTransit.splice(index, 1);
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
