<template>
	<div class="timetable">
		<div
			class="timetable__road"
			:style="`width: ${maxDistance}px`"
		>

		</div><!-- /.timetable__road -->

		<div class="timetable__train">
			<img src="/images/train.svg" alt="Train" width="16" height="16">
		</div><!-- /.timetable__train -->

		<template v-for="(station, index) in timetable">
			<div
				class="timetable-item"
				:style="`left: ${calcDistance(station.time)}px`"
			>
				<span class="timetable-item__time">
					{{ formatTime(station.time) }}
				</span>

				<img class="timetable-item__station" src="/images/station.svg" alt="Station" width="20" height="16">
			</div><!-- /.timetable-item -->
		</template>
	</div><!-- /.timetable -->
</template>

<script>
import moment from 'moment';

export default {
	name: 'TimeTable',

	props: {
		timetable: {
			type: Array,
			required: true
		}
	},

	data () {
		return {
			startHour: moment('09:00', 'HH:mm'),
			spacePerMinute: 5,
			maxDistance: 0
		}
	},

	computed: {
		formatTime() {
			return (time) => {
				return moment(time).utc().format('HH:mm');
			}
		},

		calcDistance() {
			return (time) => {
				const start = moment(time).utc().set({
					hour: this.startHour.get('hour'),
					minutes: this.startHour.get('minutes')
				});

				const duration = moment.duration(moment(time).diff(start))
				const durationInMinutes = duration.asMinutes();
				const distance = durationInMinutes * this.spacePerMinute;

				if ( this.maxDistance < distance ) {
					this.maxDistance = distance;
				}

				return distance;
			}
		}
	}
}
</script>
