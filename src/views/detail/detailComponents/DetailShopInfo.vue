<template>
	<div class="detail-shop" >
		<div class="shop-top">
			<img v-bind:src="shop.logo" />
			<span>{{shop.name}}</span>
		</div>
		
		<div class="shop-score">
			<div class="score-left">
				<div class="left1">
					<p>{{shop.sells}}</p>
					<span>总销量</span>
				</div>
				<div class="right1">
					<p>{{shop.goodscount}}</p>
					<span>全部宝贝</span>
				</div>
			</div>
			<div class="score-right">
				<div class="scoreItem" v-for="item in shop.score">
					<span>{{item.name}}</span>
					<span class="center2" :class="{'score-better':item.isBetter}">
						{{item.score}}
					</span>
					<span class="right2" :class="{'better-more':item.isBetter}">
						{{item.isBetter?'高':'低'}}
					</span>
				</div>
			</div>
		</div>
		
		<div class="shop-button">
			<button class="button">进店逛逛</button>
		</div>
	</div>
</template>

<script>
	export default {
		name:'DetailShopInfo',
		props:{
			shop:{
				type:Object,
				default(){
					return []
				}
			}
		}
	}
</script>

<style scoped>
	.detail-shop{
		border-top: 3px solid #e9e9ec;
		border-bottom: 3px solid #e9e9ec;
		margin: 10px 0;
		padding: 15px 0;
	}
	.shop-top{
		display: flex;
		align-items:center;
		margin-left: 10px;
	}
	.shop-top>img{
		width: 50px;
		height: 50px;
		border: 1px solid #c1c6ce;
		border-radius: 50%;
		margin-right: 10px;
	}
	.shop-top>span{
		color: #323738;
		font-size: 20px;
	}
	
	
	.shop-score{
		display: flex;
		justify-content: space-between;
		align-items:center;
		margin: 10px 20px;
	}
	.score-left{
		display: flex;
		justify-content: space-between;
		margin: 0 10px;
		text-align: center;
		font-size: 16px;
		border-right: 2px solid #7E8C8D;
		padding-right: 6%;
	}
	.left1{
		margin-right: 10px;
	}
	.left1 p{
		font-size: 20px;
		margin-bottom: 5px;
	}
	.right1 p{
		font-size: 20px;
		margin-bottom: 5px;
	}
	/* 店铺评分和高低的样式，class后面的样式回覆盖前面的样式 */
	.center2{
		color: green;
	}
	.right2{
		background-color: green;
		color: #FFFFFF;
	}   
	.score-better{
		color: orangered;
	}
	.better-more{
		background-color: orangered;
		color: #FFFFFF;
	}
	
	
	.scoreItem{
		display: flex;
		text-align: left;
		margin: 8px 0;
	}
	.center2{
		width: 32px;
		margin: 0 6px;
	}
	
	
	.shop-button{
		display: flex;
		justify-content:center;
		font-size: 16px;
		margin-top: 15px;
	}
	.button{
		padding: 4px 30px;
		background-color: rgb(179, 215, 223,0.3);
		border-radius: 10px;
		border: 1px solid rgb(179, 215, 223,0.3);
	}
</style>
