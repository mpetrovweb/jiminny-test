<template>
	<div class="journeys">
		<header class="journeys__head">
			<div class="journeys__head__inner">
				<h1 class="journeys__title">Jiminny Trainspotting</h1>

				<div class="journeys__actions">
					<button type="button" class="journeys__button">Start</button>
				</div><!-- /.journeys__actions -->
			</div><!-- /.journeys__head__inner -->

			<div class="journeys__head__inner">
				<div class="journeys__meta">
					<strong>Trains in Transit</strong>

					<span></span>
				</div><!-- /.journeys__meta -->

				<div class="journeys__meta">
					<strong>Current Time</strong>

					<span>{{currentTime}}</span>
				</div><!-- /.journeys__meta -->
			</div><!-- /.journeys__head__inner -->
		</header><!-- /.journeys__head -->

		<div class="journeys__body">
			<TrainsTable :journeys="journeys" />
		</div><!-- /.journeys__body -->
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import TrainsTable from '@/components/journeys/TrainsTable';

export default {
	name: 'Journeys',

	components: {
		TrainsTable
	},

	data () {
		return {
			currentTime: '09:00'
		}
	},

	computed: {
		...mapGetters(['journeys'])
	},

	methods: {
		...mapActions(['fetchJourneys'])
	},

	created() {
		this.fetchJourneys();
	}
}
</script>
