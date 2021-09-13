<template>
	<div class="recommend">
		<div class="item" v-for="item in recommends">
			<a v-bind:href="item.link">
				<img :src="item.image" >
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'RecomView',
		props: {
			recommends: {
				type: Array,
				default () {
					return []
				}
			}
		},
		
	}
</script>

<style>
	.recommend{
		display: flex;
		width: 100%;
		text-align: center;
		font-size: 12px;
		padding: 10px 0 15px;
		border-bottom: 10px solid #eee;
	}
	.item{
		flex: 1;
		
	}
	.item img{
		width: 75px;
		height: 75px;
		margin-bottom: 10px;
	}
	
</style>
