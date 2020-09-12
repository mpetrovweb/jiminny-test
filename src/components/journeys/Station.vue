<template>
	<div
		class="timetable-item"
		:style="`left: ${stationDistance}px`"
	>
		<span class="timetable-item__time">
			{{ formatTime(station.time) }}
		</span>

		<img class="timetable-item__station" src="/images/station.svg" alt="Station" width="20" height="16">
	</div><!-- /.timetable-item -->
</template>

<script>
import moment from 'moment';

export default {
	name: 'Station',

	props: {
		station: {
			type: Object,
			required: true
		},

		stationDistance: {
			type: Number,
			required: true
		}
	},

	computed: {
		formatTime() {
			return (time) => {
				return moment(time).utc().format('HH:mm');
			}
		}
	},
}
</script>
