<template>
	<tr>
		<td>{{ journey.name }}</td>

		<td>{{ journey.route }}</td>

		<td>
			<TimeTable
				:timetable="journey.timetable"
			/>
		</td>

		<td>Next Station</td>

		<td>{{ journey.train.name }}</td>
	</tr>
</template>

<script>
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

		}
	}
}
</script>
