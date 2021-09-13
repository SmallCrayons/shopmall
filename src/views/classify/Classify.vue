<template>
	<!-- <h2>我是分类页面</h2> -->
	<div class="wrapper" ref='wrapper'>
		<div>
			<ul>
				<li>
					<h2>我是分类页面</h2>
				</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>
				<li>我是列表</li>

			</ul>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'

	export default {
		name: 'Classify',
		data() {
			return {
				scroll: null
			}
		},

		mounted() {
			// console.log(this.$refs.wrapper)
			// console.log(document.querySelector('.wrapper'))
			
			this.scroll = new BScroll(this.$refs.wrapper, {
				click: true,
				//click: false 时button可以监听点击，但div等其他标签不行不可以
				//click: true 时button可以监听点击，但div等其他标签也可以
				scrollY: true,
				probeType: 3,
				// 默认情况下BScroll是不可以实时的监听滚动位置
				// probe侦测;probeType: 0/1/2/3
				// 0,1都是不侦测实时的位置
				// 2:在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测，
				// 3:只要是滚动,都侦测．
				pullUpLoad: true
				
			})

			this.scroll.on('scroll', (position) => {
				//滑动时做的事情（与probeType:3对应）
				// console.log(position)
			})

			this.scroll.on('pullingUp', () => {
				//监听上拉事件
				console.log('上拉加载更多类容')

				//发送网络请求，请求更多数据
				//等数据请求完成，并将其展示出来后
				setTimeout(() => { //解决只能展示上拉加载一次的问题
					this.scroll.finishPullUp()
				}, 2000)
			})

		}
	}
</script>

<style scoped>
	.wrapper {
		height: 260px;
		background-color: #FAEBD7;
		overflow: hidden;

		/* 用原生代码实现局部滚动 */
		/* overflow-y: scroll;*/
		/* 设置Y轴可滚动，它会自动隐藏超出的东西 */


	}
</style>
