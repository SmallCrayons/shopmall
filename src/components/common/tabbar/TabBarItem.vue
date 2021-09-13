<template>
		<!-- 这样写，组件无法重复利用
		<div class="tab-bar-item">
			<img src="../assets/img/tarbar/home1.png" />
			<div>首页</div>
		</div>-->
		
		<div class="tab-bar-item" @click="itemClick">
		<!-- 因为插槽会被插槽内容替换，所以写属性和方法时，最好在外面包一层div，避免属性被替换掉 -->
			<div v-if="!isActive"><slot name="item-icon"></slot></div>
			<div v-else><slot name="item-icon-active"></slot></div>
			<!-- <div :class="{active:isActive}"><slot name="item-text"></slot></div> -->
			<div :style="activestyle"><slot name="item-text"></slot></div>
		</div>
		
</template>

<script>
	export default{
		name:'TabBarItem',
		props:{//props：父元素向子元素传递数据
			path:String,
			activecolor:{
				type:String,
				default(){
					return "red"
				}
				
			}
		},
		data() {
			return{
				// isActive:false,
			}
		},
		computed:{
			isActive(){
				//indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。语法indexOf() 方法对大小写敏感！
				//如果要检索的字符串值没有出现，则该方法返回 -1。
				return this.$route.path.indexOf(this.path) !== -1
			},
			activestyle(){//三目运算符。判断是不是处于活跃状态，如果处于活跃状态，执行{color:this.activecolor}，否则执行{}
				return this.isActive ? {color:this.activecolor} : {}
			}
		},
		methods:{
			itemClick(){
				// console.log('itemClick')
				//给$router添加一个path，且不能返回(replace),添加的页面在最上面，覆盖下面的页面
				this.$router.replace(this.path)
			}
		}
		
	}
</script>

<style scoped="scoped">
	.tab-bar-item {
		border: 1px antiquewhite solid;
		flex: 1;
		text-align: center;
		height: 49px;
		/*tab-bar一般高度为49*/
		font-size: 14px;
		margin-top: 3px;
		vertical-align: middle;
		/*  vertical-align:属性设置元素的垂直对齐方式 
		middle:把此元素放置在父元素的中部*/
	}
	.tab-bar-item img{
		width: 26px;
		height: 26px;
	}
	.active{
		/* 在活跃页面时，会添加一个为active的class */
		color:darksalmon;
	}
</style>
