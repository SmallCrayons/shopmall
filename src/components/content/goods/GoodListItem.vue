<template>
	<div class="goods-item">
		<!-- <a href="goodsitem.link">  </a> link现在没法用了-->
			<img :src="showImage" @load="imageLoad"
			 @click="itemClick"/>
		<!-- @load="imageLoad":监听图片加载事件 -->
		<div class="goods-info">
			<div class="introduce">{{goodsitem.title}}</div>
			<span class="price">价格:{{goodsitem.price}}</span>
			&nbsp;&nbsp;
			<span class="collect">收藏:{{goodsitem.cfav}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'GoodListItem',
		components:{
			
		},
		props: {
			goodsitem: {
				type: Object,
				default () {
					return {}
				}
			}
	
		},
		created() {
			// console.log(this.goodsitem)
		},
		methods:{
		//解决class="content"的元素计算可滚动高度时，因为图片加载慢于计算速度，滚动高度不够问题（方法二）
			imageLoad() {
				// console.log('imageLoad')
				//监听每一张图片，当图片加载完成后用scroll.refresh()再进行一场刷新；
				//1.监听图片加载事件后发送给Home.vue (2在main.js中)
				if(this.$route.path.indexOf("/home") !== -1){
					this.$bus.$emit('itemImageLoad')
				}
				
			},
			itemClick() {
				// console.log('111111')
				this.$router.push('/detail/'+this.goodsitem.iid)
			}
		},
		computed:{
			showImage(){
				// return this.goodsitem.image || this.goodsitem.show.img
				// ||是懒加载，如果第一个为true就不会去读第二个。
				// 前后交换位置会报错是因为在加载时没有获取到goodsitem的show就去获取它的show.img就会报错（this.goodsitem.show.img变为this.goodsitem.show就不会报错，会显示undefined）
				return this.goodsitem.image ? this.goodsitem.image : this.goodsitem.show.img 
			}
		}
		
	}
</script>

<style scoped>
	.goods-item{
		width: 46%;
		padding-bottom: 40px;
		position: relative;
	}
	.goods-item img{
		width: 100%;
		border-radius: 3px;
	}
	.goods-info{
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		overflow: hidden;
		text-align: center;
	}
	.goods-info .introduce{
		/* overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 3px;
		word-break: break-all; */
		
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-break: break-all; 
	}
	.goods-info .price{
		color: deeppink;
		margin-right: 20px;
		
	}
	.goods-info .collect{
		position: relative;
	}
	.goods-info .collect::before{
		content: '';
		position: absolute;
		left: -15px;
		top: -1px;
		width: 14px;
		height: 14px;
		background: url('~assets/img/home/collect_icon.png') 0 0/14px 14px;
	}
</style>
