<template>
	<div id="tab-bar">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'TabBar',
	}
</script>

<style scoped>
	#tab-bar {
		display: flex;
		background-color: #e7f1f7;

		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;

		box-shadow: 0 -2px 2px rgba(150, 100, 125, 0.2);
	}
</style>
