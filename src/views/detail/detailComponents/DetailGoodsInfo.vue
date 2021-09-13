<template>
	<div class="detailGoods" v-if="Object.keys(detailInfo).length !== 0">
		<div class="decInfo">
			<span class="span-desc">{{detailInfo.desc}}</span>
		</div>
		<div class="item1-key"> {{detailInfo.detailImage[0].key}}</div>
		<div class="info-list" >
			<img v-for="(item,index) in detailInfo.detailImage[0].list" 
			:key='index' :src="item" @load="imgLoad" />
		</div>

	</div>
</template>

<script>
	export default {
		name: 'DetailGoodsInfo',
		props: {
			detailInfo: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				counter: 0,
				imagesLength: 0
			}
		},
		methods: { //里面的这一坨是为了监听图片是否加载完全，之后进行scroll.refresh()刷新；
			//如果Soroll.vue中添加了observeDOM: true，其实就可以不用写这些，不会有bug
			imgLoad() {
				//判断所有图片都加载完了，之后再进行一次回调
				this.counter ++
				if (this.counter === this.detailInfo.detailImage[0].list.length) {
					this.$emit('imageload')
					// console.log('detailgoodsinfo的imgload')
				}
			}
		},
		// watch: { //可以监听元素的变化
		// 	detalInfo() {
		// 		//获取图片的个数，且只获取一次
		// 		this.imagesLength = this.detailInfo.detailImage[0].list.length
		// 	}
		// }



	}
</script>

<style scoped>
	div img {
		width: 100%;
	}

	.item1-key {
		margin: 0 5px;
		/* border: 1px solid #B6B7A3; */
	}

	.decInfo {
		display: flex;
		justify-content: center;
	}

	.span-desc {
		margin: 10px 5px;
		/* border: 2px solid seagreen; */
	}
</style>
