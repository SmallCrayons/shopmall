<template>
	<swiper class='detail-swiper'>
		<!-- template中写必须要有根组件，是说必须要有一个标签能够包揽完所有元素，并非一定要是div标签 -->
		<swiper-item class='detailItem' v-for="item in images" v-bind:key="item.id">
			<img :src="item" />
		</swiper-item>
	</swiper>

</template>

<script>
	import {
		Swiper,
		SwiperItem
	} from 'components/common/swiper/index.js'

	export default {
		name: 'DetailSwiper',
		components: {
			Swiper,
			SwiperItem
		},
		data() {
			return {
				isLoad: false
			}
		},
		props: { //父传子
			images: {
				type: Array,
				default () {
					return []
				}

			}
		},
		
	}
</script>

<style scoped>

	.detail-swiper {
		height: 300px;
		overflow: hidden;
	}
	.detailItem{
		margin-top: -50px;
	}
	
</style>
