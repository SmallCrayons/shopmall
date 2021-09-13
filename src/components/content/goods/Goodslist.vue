<template>
	<div class="goods">
		<!-- {{goods}} -->
		<good-list-item v-for="item in goods" :goodsitem="item"></good-list-item>
	</div>
</template>

<script>
	import GoodListItem from './GoodListItem'
	export default {
		name: 'GoodsList',
		components:{
			GoodListItem
		},
		props: {
			goods: {
				type: Array,
				default () {
					return []
				}
			}

		},
		created() {
			// console.log(this.goods)
		}
	}
</script>

<style scoped>
	.goods{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin: 0 5px 0 5px;
	}
	
	
</style>
