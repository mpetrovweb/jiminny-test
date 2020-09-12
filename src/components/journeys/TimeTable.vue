<template>
	<div class="timetable">
		<div
			class="timetable__road"
			:style="`width: ${maxDistance}px`"
		>

		</div><!-- /.timetable__road -->

		<div
			class="timetable__train"
			:style="`transform: translate3D(${trainDistance}px, 0, 0);`"
		>
			<img src="/images/train.svg" alt="Train" width="16" height="16">
		</div><!-- /.timetable__train -->

		<template v-for="(station, index) in timetable">
			<div
				class="timetable-item"
				:style="`left: ${stationDistance(station.time)}px`"
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
import { mapGetters } from 'vuex';

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
			maxDistance: 0,
			trainDistance: 0,
			nextStationIndex: 0
		}
	},

	computed: {
		...mapGetters(['currentTime']),

		formatTime() {
			return (time) => {
				return moment(time).utc().format('HH:mm');
			}
		},

		stationDistance() {
			return (time) => {
				const start = moment(time).utc().set({
					hour: this.startHour.get('hour'),
					minutes: this.startHour.get('minutes')
				});

				const distance = this.calcDistance(moment(time), start);

				if ( this.maxDistance < distance ) {
					this.maxDistance = distance;
				}

				return distance;
			}
		}
	},

	methods: {
		calcDistance(time, startTime) {
			const duration = moment.duration(time.diff(startTime))
			const durationInMinutes = duration.asMinutes();
			const distance = durationInMinutes * this.spacePerMinute;

			return distance;
		},

		getNextStationIndex() {
			return this.timetable.findIndex(item => {
				const time = moment(item.time).utc().format('HH:mm');

				return moment(time, 'HH:mm').isAfter(this.currentTime);
			})
		},

		emitStationIndex() {
			const nextIndex = this.getNextStationIndex();

			if ( nextIndex > this.nextStationIndex ) {
				this.nextStationIndex = nextIndex;

				this.$emit('changeStation', nextIndex);
			}
		}
	},

	created() {
		// Subscribing to the mutation to know
		// when the time is updated
		// Note: currentTime is updated deeply, so it is not reactive
		this.unsubscribe = this.$store.subscribe((mutation) => {
			if ( mutation.type === 'SET_CURRENT_TIME' ) {
				this.trainDistance = this.calcDistance(this.currentTime, this.startHour);

				if ( this.trainDistance > this.maxDistance ) {
					this.trainDistance = this.maxDistance;
				}

				this.emitStationIndex();
			}
		});
	},

	beforeDestroy() {
		this.unsubscribe();
	}
}
</script>
