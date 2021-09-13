<template>
	<!-- Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，
	数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致  -->
	<div class="DetailBase" v-if="Object.keys(goods).length !==0">
		<!-- v-if="Object.key(goods).length !==0"判断传入的goods元素传入数据是否为空。
		 如果为空，就不渲染-->
		<div class="info-title">{{goods.title}}</div>
		
		<div class="info-price">
			<span class="newPrice">{{goods.newPrice}}</span>
			<span class="oldPrice">{{goods.oldPrice}}</span>
			<div v-if="goods.discount" class="discount">
				<span>{{goods.discount}}</span>
			</div>
		</div>
		
		<div class="info-columns" >
			<!-- <span v-for="item in goods.columns">{{item}}</span> -->
			<span>{{goods.columns[0]}}</span>
			<span>{{goods.columns[1]}}</span>
			<span>{{goods.services[goods.services.length-1].name}}</span>
		</div>
		
		<div class="info-services">
			<div class="servicesItem" v-for="index in goods.services.length-1" :key='index'>
				<img v-bind:src="goods.services[index-1].icon">
				<span>{{goods.services[index-1].name}}</span>
			</div>
		</div>
	
		<!-- 数字可以遍历，从1开始 -->
		<!-- <div v-for="item in 10">{{item}}</div> -->
			
	</div>
</template>

<script>
	export default {
		name:"DetailBaseInfo",
		data() {
			return{
				
			}
		},
		props:{
			goods:{
				type:Object,
				default(){
					return []
				}
			}
		},
		
	}
</script>

<style scoped>
	.DetailBase{
		position: relative;
		margin-top: 5px;
	}
	
	.info-title{
		font-size: 17px;
		margin-bottom: 5px;
	}
	
	.info-price{
		/* display: flex; */
		margin-bottom: 5px;
		margin-left: 10px;
	}
	.newPrice{
		color: deeppink;
		font-size: 22px;
	}
	.oldPrice{
		color: #7E8C8D;
		font-size: 10px;
		margin: 0 5px 0 5px;
		text-decoration: line-through;
	}
	
	.discount{
		display: inline-block;
		background-color: #ee8188;
		border-radius: 10px;
		text-align: center;
		padding: 3px 5px;
	}
	.discount span{
		font-size: 16px;
		color: #FFFFFF;
	}
	
	
	.info-columns{
		display: flex;
		justify-content: space-between;
		color: #7E8C8D;
		margin-bottom: 5px;
	}
	.info-columns span{
		font-size: 13px;
		margin-left: 10px;
		margin-right: 10px;
	}
	
	.info-services{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.servicesItem{
		/* flex: 1; */
		font-size: 14px;
		line-height: 14px;
		/* text-overflow: ellipsis; */
		margin-left: 5px;
		margin-right: 5px;
		display: flex;
		align-items:center;
		margin: 5px 5px;
	}
	.servicesItem>img{
		width: 15px;
		height: 15px;
		/* border:1px solid #FFEA00; */
		margin-right: 3px;
	}
</style>
