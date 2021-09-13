<template>
	<swiper>
		<swiper-item v-for= "item in banners" v-bind:key="item.id">
			<!-- v-bind:key="item.id"这个不加会报错 -->
			<a :href='item.link'>
				<!-- 为什么只监听这个组件，因为这个组件相对于其他组件加载图片更大。
				 如果这个组件加载好了，那么其他在小导航上面的组件也就加载好了-->
				<img :src="item.image" @load="imageLoad" />
			</a>
		</swiper-item>
	</swiper>
</template>

<script>
	import {Swiper,SwiperItem} from 'components/common/swiper/index.js'

	export default {
		name: 'HomeSwiper',
		components: {
			Swiper,
			SwiperItem
		},
		data() {
			return{
				isLoad:false
			}
		},
		props: { //父传子
			banners: {
				type: Array,
				default () {
					return []
				}

			}
		},
		methods:{
			// imageLoad() {//这样会发送4次
			// 	// console.log('imgload')
			// 	this.$emit('swiperImageLoad')
			// }
			
			imageLoad() {
				if(!this.isLoad){//加入if判断，可以让数据只发送一次，而不多次发送
					this.$emit('swiperImageLoad')
					this.isLoad = true
				}
			}
		}

	}
</script>

<style>
</style>
