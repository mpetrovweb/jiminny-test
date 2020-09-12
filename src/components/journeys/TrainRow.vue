<template>
	<tr>
		<td>{{ journey.name }} <span class="visible-small-desktop-inline">/ {{ journey.route }}</span></td>

		<td class="hidden-small-desktop">{{ journey.route }}</td>

		<td>
			<TimeTable
				class="hidden-tablet-mobile"
				:name="journey.train.name"
				:timetable="journey.timetable"
				@changeStation="changeStation"
			/>

			<div class="visible-tablet-mobile">
				<template v-for="timetable in journey.timetable">
					{{ formatTime(timetable.time) }}: {{ timetable.station }} <br />
				</template>
			</div>
		</td>

		<td class="hidden-tablet-mobile">{{ journey.timetable[nextStationIndex].station }}</td>

		<td>{{ journey.train.name }}</td>
	</tr>
</template>

<script>
import moment from 'moment';
import TimeTable from '@/components/journeys/TimeTable';

export default {
	name: 'TrainRow',

	components: {
		TimeTable
	},

	props: {
		journey: {
			type: Object,
			required: true
		}
	},

	data () {
		return {
			nextStationIndex: 0
		}
	},

	computed: {
		formatTime() {
			return (time) => {
				return moment(time).utc().format('HH:mm');
			}
		}
	},

	methods: {
		changeStation(index) {
			this.nextStationIndex = index;
		}
	}
}
</script>
