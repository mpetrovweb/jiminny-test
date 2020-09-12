<template>
	<div class="journeys__table">
		<table>
			<thead>
				<tr>
					<th>Name <span class="visible-small-desktop-inline">/ Route</span></th>

					<th class="hidden-small-desktop">Route</th>

					<th>Timetable</th>

					<th class="hidden-tablet-mobile">Next Station</th>

					<th>Train</th>
				</tr>
			</thead>

			<tbody>
				<template v-for="journey in journeys">
					<TrainRow
						:key="'transit-' + journey.train.id"
						:journey="journey"
					/>
				</template>
			</tbody>
		</table>
	</div><!-- /.table -->
</template>

<script>
import TrainRow from '@/components/journeys/TrainRow';

export default {
	name: 'TrainsTable',

	components: {
		TrainRow
	},

	props: {
		journeys: {
			type: Array,
			required: true
		}
	}
}
</script>
