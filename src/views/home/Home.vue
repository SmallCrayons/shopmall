<template>
	<div class="home">
		<!-- 标题导航栏 -->
		<nav-bar class="home-nav">
			<template v-slot:center>购物街</template>
		</nav-bar>

		<!-- 轮播图 -->
		<!-- <swiper>
			<swiper-item v-for='item in banners'>
				<a :href='item.link'><img :src="item.image" /></a>
			</swiper-item>
		</swiper> -->

		<tab-control :titles='titles' class="show-control" ref="tabControl2"
		@tabClick='tabclick' v-show='isTabFixed'></tab-control>
		
		
		<scroll class="roll" ref="roll" 
		:probe-type = '3' @scrollroot='contentScroll' 
		:pull-up-load = 'true' @pulling = 'loadmore'>
				<!-- 轮播图抽离后写法 -->
				<home-swiper class="home-swiper" v-bind:banners="banners"
				@swiperImageLoad='swiperImageLoad'></home-swiper>
				<!-- 商品分类 -->
				<recom-view :recommends="recommends"></recom-view>
				<!-- 本周流行 -->
				<popular-view></popular-view>
				<!-- 小导航 -->
				<!-- <tab-control :titles="['流行','新款','精选']"></tab-control> -->
				<tab-control :titles='titles' 
				class="tab-control" ref="tabControl"
				@tabClick='tabclick'></tab-control>
				<!-- 小导航下的商品展示 -->
				<goods-list :goods="goods[currentType].list"></goods-list>
		</scroll>
		
		<!-- 返回顶部  .native:在我们需要监听一个组件的原生事件时(不仅仅只是click事件),
		必须给对应的事件加上.native修饰符,才能进行监听。创建的组件是无法直接监听的-->
			<back-top @click.native='backClick' v-show="isShow"></back-top>
			
		<br><br><br>

	</div>
</template>

<script>
	import NavBar from '../../components/common/navbar/NavBar.vue'
	import TabControl from 'components/content/tabControl/TabControl.vue'
	import GoodsList from 'components/content/goods/Goodslist.vue'
	import Scroll from 'components/common/scroll/Scroll.vue'
	import BackTop from 'components/content/backTop/BackTop.vue'
	
	import HomeSwiper from './childComponents/HomeSwiper.vue'
	import RecomView from './childComponents/RecomView.vue'
	import PopularView from './childComponents/PopularView.vue'
	
	import {
		getHomeMultidata,
		getHomeGoods
	} from '../../network/home.js'
	import {debounce} from 'common/utils.js'

	export default {
		name: 'Home',
		components: {
			NavBar,
			TabControl,
			HomeSwiper,
			RecomView,
			PopularView,
			GoodsList,
			Scroll,
			BackTop,
		},
		data() {
			return {
				// result:null,
				banners: [],
				recommends: [],
				titles: ['流行', '新款', '精选'],
				goods: {
					'pop': {page: 0,list: []},
					'new': {page: 0,list: []},
					'sell': {age: 0,list: []},
				},
				currentType: 'pop',
				isShow:false,
				tabOffsetTop:0,
				isTabFixed:false,
				saveY:0
			}
		},
		
		//让Home中的内容保持原来的位置
		destroyed() {//测试添加keep-alive后，点击其他页面数据不被销毁
			console.log('home destroyed')
		},
		//存储页面Y的位置，使返回时能返回用户离开时的页面(加上keep-alive就能记录，但这样确保万无一失)
		activated() {
			// console.log('home activated')
			this.$refs.roll.scroll.scrollTo(0,this.saveY,0)
			this.$refs.roll.scroll.refresh()
		},
		deactivated() {
			// console.log('home deactivated')
			//1.保存Y值
			this.saveY = this.$refs.roll.getScrollY()
			// 2.取消全局事件的监听
			// this.$bus.$off('要取消的事件名称',要取消的函数) this.$bus.$off('itemImageLoad')这样写全部的itemImageLoad都会被取消
			
		},
		
		//created里面最好只写请求数据的信息，要做什么可以在methods中用写，之后调用函数
		//不要在created中拿元素（类似this.$refs.xxx），因为无法保证拿的时候有没有创建好，不一定拿的到
		created() { 
			//请求轮播图数据
			this.homeMultidata()

			//请求商品数据；请求多个数据
			this.homeGoods('pop')
			this.homeGoods('new')
			this.homeGoods('sell')
			// console.log(this.goods['pop'].page)==console.log(this.goods.pop.page)
		},
		mounted() {
			// this.$bus.$on('itemImageLoad', () =>{
			// 	this.$refs.roll.refresh()
			// })这样写会反复多次调用refresh()，可以用防抖函数解决这个问题
			
			// 3.用事件总线($bus)监听item中图片加载完成，之后进行刷新
			
			//直接调用roll.scroll.refresh方法会报错，要传入封装之后的this.$refs.roll.refresh
			const refresh = debounce(this.$refs.roll.refresh,200)
			this.$bus.$on('itemImageLoad', () =>{
				//进行防抖操作
				refresh()
				// console.log(this.$refs.tabControl.$el.offsetTop)
			})
			
			//获取tabControl的offsetTop
			//所有的组件都有一个属性$el:用于获取组件中的元素			
			//写在这里是无法得出正确的高度的，虽然组件加载完全了，但图片并不一定加载好了，
			// 没有把组件撑开，得到的高度就是错的
			// console.log(this.$refs.tabControl.$el.offsetTop)
			// console.log(this.goods['pop'].list)
		},
		
		methods: {
			// 网络请求相关
			
			homeMultidata() {
				getHomeMultidata().then(res => {
			//res是局部变量，数据在请求完成后会被销毁，所以不能直接使用，要在data中保存一下
					//请求轮播图数据
					this.banners = res.data.banner.list
					// console.log(res.data.banner.list[1].image)
					
					//请求轮播图下的分类数据
					this.recommends = res.data.recommend.list 
				})
			},
			homeGoods(type) {
				//默认goods[type].page为0，所以要定义一个page+1(即第一页)，之后给
				//给getHomeGoods()传入，请求数据，之后把list与page数据保存到对应goods[type]中
				const page = this.goods[type].page + 1
				getHomeGoods(type, page).then(res => {
					//这里不能直接this.goods[type].list = res.data.list，后面的数据会覆盖前面的数据
					// 用for循环把res.data.list中的元素添加到this.goods[type].list中
					// for(let n of res.data.list){this.goods[type].list.push(n)}

					// push(...res.data.list):把res.data.list中的元素一个一个添加到this.goods[type].list中
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
					
					
					//完成上拉加载更多?为什么会报错
					// this.$refs.roll.finishPullup()
				})
			},

			//点击事件
			
			//流行/新款等页面切换
			tabclick(index) {
				// console.log(index)
				switch (index) {
					case 0:
						this.currentType = 'pop';
						break;
					case 1:
						this.currentType = 'new';
						break;
					case 2:
						this.currentType = 'sell';
						break;
				}

				//解决两个小导航点击后，不同步显示的问题 current是TabControl组件里面的
				this.$refs.tabControl.current = index;
				this.$refs.tabControl2.current = index;

			},
			//返回顶部
			backClick(){
				// console.log(this.$refs.roll)
				// console.log(this.$refs.roll.scroll)
				// scrollTo(x轴坐标,y轴坐标,(选填)：多少毫秒之内回到顶部）
				//this.$refs.roll.scroll：这个scroll是Scroll组件里面定义的scroll
				this.$refs.roll.scroll.scrollTo(0,0,500)
			},
			
			//监听scroll滑动，backTop的显示和隐藏
			contentScroll(position){
				// console.log(position)
				//判断BackTop是否显示
				this.isShow = -position.y>1000
				//因为position.y是负值，所以要在前面加"-"
				
				//决定tabControl是否吸顶
				this.isTabFixed = (-position.y)>this.tabOffsetTop
				
			},
			
			//上拉加载事件
			loadmore(){
				console.log("上拉加载更多")
				this.homeGoods(this.currentType)
			},
			
			swiperImageLoad(){//获取tabcontrol的offsetTop
				// 组件不是DOM元素,是没有OffsetTop的,无法通过.OffsetTop来获取的。
				// 就需要通过$el来获取组件中的DOM元素
				//所有的组件都有一个属性$el:用于获取组件中的元素
				// console.log(this.$refs.tabControl.offsetTop )
				//console.log(this.$refs.tabControl.$el.offsetTop )
				this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
				
			}
		}

	}
</script>

<style scoped>
	/* @import url("../../assets/css/base.css"); */
	.home {
		position: relative;
		height: 100vh;
	}
	.home-nav {
		/* background-color: var(--color-tint); */
		background-color: #ffbcbd;
		color: #FFFFFF;   
		/* 相对与屏幕定位 */
		/* position: fixed; 原生页面时，为了不被滚走设置。用scroll就不用fixed
		left: 0;
		right: 0;
		top: 0;
		z-index: 10; */
	}

	.home-swiper {
		/* padding-top: 44px; */
	}

	.tab-control {
/* sticky：粘贴，粘性定位。position: sticky; 基于用户的滚动位置来定位。
粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。*/
		/* position: sticky;  在better-scroll中无效*/
		background-color: #FFFFFF;
		z-index: 10;
	}
	
	.show-control{
		position: relative;
		top: -1px;
		z-index: 10;
	}

/* 计算滚动高度方法一
	.roll{
		height: calc(100% - 93px); */
		/* 屏幕的100%高度-上下导航栏的高度 */
/* 		overflow: hidden;
		margin-top: 44px;
	} */
	
	
	/* 计算滚动高度方法二 */
	.roll {
		overflow: hidden;
		position: absolute;
		left: 0;
		right: 0;
		top: 44px;
		bottom: 49px;
	}
	
</style>
