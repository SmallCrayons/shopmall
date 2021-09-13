<template>
	<div>
		<nav-bar>
			<template v-slot:left> 
				<div class="back" @click="backClick">
					<img src="~assets/img/back.png">
				</div>
			</template>
			<!-- 为什么class设置在template后设设置样式不起效果？？？？ -->
			 <template v-slot:center >
				<div class="titles" >
					<div class="title-item" v-for="(item,index) in titles"
					@click="itemClick(index)" :class="{active:currentType==index}">
						{{item}}
					</div>
				</div>
			</template>
			
		</nav-bar>	
	</div>
	
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'

	export default {
		name: 'DetailNavBar',
		components: {
			NavBar,
			
		},
		data() {
			return{
				titles:['商品','参数','评论','推荐'],
				currentType:0,
			}
		},
		methods:{
			itemClick(index){
				this.currentType=index
				this.$emit('titleClick',index)
			},
			backClick(){//返回上一级，两个都行
				this.$router.back()
				// this.$router.go(-1)
				
			}
		}
		
	}
</script>

<style scoped>
	.titles{
		display: flex;
	}
	.title-item{
		flex: 1;
		font-size: 17px;
	}
	.active{
		color: deeppink;
	}

	.back{
		margin-left: 15px;
		margin-top: 5px;
	}
	.back img{
		width: 40px;
		height: 40px;
	}
</style>
