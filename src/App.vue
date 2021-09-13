<template>
	<div id="app">
		<keep-alive exclude="Detail">
			<!-- 保存数据，让数据不被销毁，Detail排除在外 -->
			<router-view></router-view>
		</keep-alive>
		
		<main-ta-bar></main-ta-bar>
	</div>
</template>

<script>
import MainTaBar from './components/content/MainTabBar.vue'

export default {
  name: 'App',
  components: {
	MainTaBar
  }
}
</script>

<style>
	@import url("./assets/css/base.css");
</style>
