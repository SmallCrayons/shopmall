<template>
	<div class="wrapper" ref='wrapper'>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	
	export default {
		name: 'Scroll',
		props:{
			probeType:{
				type:Number,
				default(){
					return 0
				}
			},
			pullUpLoad:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scroll: null
			}
		},
		mounted() {
			// 默认情况下BScroll是不可以实时的监听滚动位置
			// probe侦测;probeType: 0/1/2/3
			// 0,1都是不侦测实时的位置
			// 2:在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测，
			// 3:只要是滚动,都侦测．
			
			//1.创建BScroll
			this.scroll = new BScroll(this.$refs.wrapper, {
				click: true,//控制除button外的标签可以点击
				scrollY: true,
				
				//解决class="content"的元素计算可滚动高度时，因为图片加载慢于计算速度，滚动高度不够问题（方法一）
				observeDOM: true,
				
				//这里不确定是否每次用的时候都要监听滚动和上拉事件，通过props传递值，用时再决定
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad,
			})
			
			// console.log(this.scroll)
			
			//2.监听、滑动滚动位置；与probeType对应
			this.scroll.on('scroll', (position) => {
				// console.log(position)
				//每次运用组件时，执行命令也许会有差别，所以this.$emit把数据传递给父组件，在父组件中进行操作
				this.$emit('scrollroot',position)
				
			})
			
			//3.监听上拉事件
			this.scroll.on('pullingUp', () => {
			    this.$emit('pulling')
				//发送网络请求，请求更多数据
				//等数据请求完成，并将其展示出来后
				setTimeout(() => { //解决只能展示上拉加载一次的问题
					this.scroll.finishPullUp()
				}, 2000)
			})
			
		},
		methods:{
			// scrollTo(x, y, time=300){
			//   this.scroll && this.scroll.scrollTo(x, y, time)
			// },
			finishPullup() {
			  this.scroll.finishPullup()
			},
			refresh() {
			  this.scroll && this.scroll.refresh()
			  console.log('--------')
			},
			getScrollY(){
				//三目运算符，判断scroll是否有值
				return this.scroll ? this.scroll.y : 0
			}
		}
		
	}
</script>

<style scoped>
	
</style>
