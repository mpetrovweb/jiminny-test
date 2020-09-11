<template>
	<div class="journeys">

	</div>
</template>

<script>
export default {
	name: 'Journeys',

	data () {
		return {

		}
	},

	mounted() {
		fetch('http://localhost:8080/journeys.json')
			.then(response => response.json())
			.then(data => console.log(data));
	}
}
</script>
