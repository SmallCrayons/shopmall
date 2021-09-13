<template>
	<div class="tab-control">
		<!-- 也可以用插槽，但是如果只展示文字的话，这样的方式更加好 -->
		<div class="item-control" v-for="(item,index) in titles" 
		:class="{active:index==current}" @click="tabClick(index)">
		<!-- :class="{active:index===current}":动态的绑定一个叫active的class，
		当index===current为true时，就能给div赋上这个class属性 -->
		<span>{{item}}</span>
		</div>
		
	</div>
</template>

<script>
	export default {
		name:'TabControl',
		props:{
			titles:{
				type: Array,
				default(){
					return []
				}
			}
		},
		components:{
			// ControlItem,
		},
		data() {
			return{
				current:0
			}
		},
		methods:{
			tabClick(index){
				this.current=index;
				console.log('index')
				this.$emit("tabClick",index)
			}
		}
		
	}
</script>

<style>
	.tab-control{
		display: flex;
		text-align: center;
		font-size: 17px;
	}
	.item-control {
		flex: 1;
		height: 40px;
		line-height: 40px;
		
	}
	.item-control span{
		padding: 5px;
	}
	
	.active{
		color: #FF5777;
		
	}
	.active span{
		border-bottom: 2px solid #FF5777;
	}
	
</style>
