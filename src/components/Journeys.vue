<template>
	<div class="journeys">
		<header class="journeys__head">
			<div class="journeys__head__inner">
				<h1 class="journeys__title">Jiminny Trainspotting</h1>

				<div class="journeys__actions">
					<button
						type="button"
						class="journeys__button"
						@click="toggleSpotting"
					>
						<template v-if="!isSpotting"> Start </template>
						<template v-else> Stop </template>
					</button>
				</div><!-- /.journeys__actions -->
			</div><!-- /.journeys__head__inner -->

			<div class="journeys__head__inner">
				<div class="journeys__meta">
					<strong>Trains in Transit</strong>

					<span></span>
				</div><!-- /.journeys__meta -->

				<div class="journeys__meta">
					<strong>Current Time</strong>

					<span>{{ formatedCurrentTime }}</span>
				</div><!-- /.journeys__meta -->
			</div><!-- /.journeys__head__inner -->
		</header><!-- /.journeys__head -->

		<div class="journeys__body">
			<TrainsTable :journeys="journeys" />
		</div><!-- /.journeys__body -->
	</div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapMutations, mapActions } from 'vuex';

import TrainsTable from '@/components/journeys/TrainsTable';

export default {
	name: 'Journeys',

	components: {
		TrainsTable
	},

	data () {
		return {
			isSpotting: false,
			interval: null
		}
	},

	computed: {
		...mapGetters(['journeys','currentTime', 'formatedCurrentTime']),
	},

	methods: {
		...mapMutations({
			setCurrentTime: 'SET_CURRENT_TIME'
		}),

		...mapActions(['fetchJourneys']),

		toggleSpotting() {
			if ( this.isSpotting ) {
				this.isSpotting = false;

				clearInterval(this.interval);
			} else {
				this.isSpotting = true;

				this.interval = setInterval(() => {
					this.setCurrentTime(this.currentTime.add(1, 'minutes'));
				}, 500);
			}
		}
	},

	created() {
		this.fetchJourneys();

		this.setCurrentTime(moment('09:00', 'HH:mm'));
	}
}
</script>
