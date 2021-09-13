<template>
	<div id="detail" >
		<!-- 导航栏 -->
		<!-- 标签中属性不区分大小写，所以 :probeType要写成:probe-type-->
		<detail-nav-bar class="detail-nav" @titleClick="titleClick"></detail-nav-bar>

		<scroll class="content" :probe-type='3' :pull-up-load='true' ref="scroll"
		@scrollroot='scrollroot' :probeType='3'>
			<!-- 轮播图 -->
			<detail-swiper :images="topImage"></detail-swiper>

			<!-- 商品介绍 -->
			<detail-base-info :goods="goods"></detail-base-info>

			<!-- 商家介绍 -->
			<detail-shop-info :shop="shop"></detail-shop-info>

			<!-- 商品信息 -->
			<detail-goods-info :detail-info="detailInfo" @imageload='imageLoad' />

			<!-- 参数信息 -->
			<detail-param-info ref="params" :param-info="goodsParam"></detail-param-info>

			<!-- 评价信息 -->
			<detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>

			<!-- 商品推荐展示 -->
			<goods-list ref="recommends" :goods='recommends'></goods-list>

		</scroll>

		<!-- <h3>{{iid}}</h3> -->
	</div>
</template>

<script>
	import DetailNavBar from './detailComponents/DetailNavBar.vue'
	import DetailSwiper from './detailComponents/DetailSwiper.vue'
	import DetailBaseInfo from './detailComponents/DetailBaseInfo.vue'
	import DetailShopInfo from './detailComponents/DetailShopInfo.vue'
	import DetailGoodsInfo from './detailComponents/DetailGoodsInfo.vue'
	import DetailParamInfo from './detailComponents/DetailParamInfo.vue'
	import DetailCommentInfo from './detailComponents/DetailCommentInfo.vue'

	import Scroll from 'components/common/scroll/Scroll.vue'
	import GoodsList from 'components/content/goods/Goodslist.vue'

	import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
	import {debounce} from 'common/utils.js'

	export default {
		name: 'Detail',
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			Scroll,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodsList,
		},
		data() {
			return {
				iid: null,
				topImage: [],
				goods: {},
				shop: {},
				detailInfo: {},
				goodsParam: {},
				commentInfo: {},
				recommends: [],
				themeTopYs:[],
				getThemeTopY:null,
				scrollY:0
			}
		},
		created() {
			//1.保存传入的iid
			// console.log(this.$route.params)
			this.iid = this.$route.params.iid

			//2.根据iid请求详情页数据
			getDetail(this.iid).then(res => {
				const data = res.result
				//1.获取轮播图数据
				console.log(res)
				this.topImage = data.itemInfo.topImages

				//2.获取商品数据
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

				//3.创建店铺信息对象
				this.shop = new Shop(data.shopInfo)
				// console.log(res.result.shopInfo.shopLogo)

				//4.详情信息获取
				this.detailInfo = data.detailInfo

				//5.获取商品参数信息
				this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)

				//6.获取评论信息 
				if (data.rate.cRate !== 0) {
					this.commentInfo = data.rate.list[0]
				}
				
				// //获取不到完整的值
				// this.themeTopYs = []
				// this.themeTopYs.push(0)
				// this.themeTopYs.push(this.$refs.params.$el.offsetTop)
				// this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
				// this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
				// console.log(this.themeTopYs)
				
				// //能拿到完整的值，但拿到的值不正确
				// this.$nextTick(() =>{//延迟一帧时间，再进行
				// //根据最新的数据，对应的dom已经被渲染出来了，但是图片还没有加载出来，所以位置会有错
				// // 也就是拿到的offsetTop是不包括图片的高度的
				// // 一般情况下，offsetTop不对都是因为图片高度不对
				// 	this.themeTopYs = []
				// 	this.themeTopYs.push(0)
				// 	this.themeTopYs.push(this.$refs.params.$el.offsetTop)
				// 	this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
				// 	this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
				// 	console.log(this.themeTopYs)
				// })
				
				
			})

			// 3.请求推荐数据
			getRecommend().then(res => {
				// console.log(res)
				// console.log(res.data.list)
				this.recommends = res.data.list
				// console.log(this.recommends)
			})
			
			//4.给getThemeTopY赋值，并且加防抖函数
			// this.getThemeTopY = debounce(() =>{
			// 	this.themeTopYs = []
			// 	this.themeTopYs.push(0)
			// 	this.themeTopYs.push(this.$refs.params.$el.offsetTop+50)
			// 	this.themeTopYs.push(this.$refs.comment.$el.offsetTop+50)
			// 	this.themeTopYs.push(this.$refs.recommends.$el.offsetTop+50)
			// 	console.log(this.themeTopYs)
			// })

		},
		// updated() {//在这里获取会消耗大量内存
		// 	this.themeTopYs = []//因为会数据发生变化就会触发updated，会重复添加数据，所以需要先清空
		// 	this.themeTopYs.push(0)
		// 	this.themeTopYs.push(this.$refs.params.$el.offsetTop)
		// 	this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
		// 	this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
		// 	console.log(this.themeTopYs)
		// },
		methods: {
			
			imageLoad() {
				//图片获取完后，刷新
				this.$refs.scroll.scroll.refresh()
				
				//图片加载完成后，获取详情页导航相关位置的高度
				this.themeTopYs = []
				this.themeTopYs.push(0)
				this.themeTopYs.push(this.$refs.params.$el.offsetTop-50)
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop-50)
				this.themeTopYs.push(this.$refs.recommends.$el.offsetTop-50)
				console.log(this.themeTopYs)
					
			},
			titleClick(index) {
				console.log(index)
				this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],500)
			},
			
			scrollroot(position){
				console.log(position)
				//1.获取Y值
				this.scrollY = -position.y
				
				//2.scrollY与themeTopYs中的值比较
				
			}
		}

	}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 10;
		background-color: #FFFFFF;
		height: 100vh;
	}

	.content {
		height: calc(100% - 44px);
	}

	.detail-nav {
		position: relative;
		z-index: 10;
		background-color: #FFFFFF;
	}
</style>
