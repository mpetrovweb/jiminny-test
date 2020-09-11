<template>
	<div id="app">
		<div class="container">
			<Journeys />
		</div><!-- /.container -->
	</div>
</template>

<script>
import Journeys from '@/components/Journeys';

export default {
	name: 'App',

	components: {
		Journeys
	}
}
</script>

<style lang="scss">
	@import '@/assets/scss/main';
</style>
