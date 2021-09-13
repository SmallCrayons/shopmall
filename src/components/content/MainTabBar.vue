<template>
	<div>
	<tab-bar>
		<tab-bar-item path="/home" activecolor="darksalmon">
			<template v-slot:item-icon>
				<img src="~assets/img/tarbar/home1.png" />
			</template>
			<template v-slot:item-icon-active>
				<img src="~assets/img/tarbar/home2.png" />
			</template>
			<template v-slot:item-text><div>首页</div></template>
		</tab-bar-item>
		
		<tab-bar-item path="/classify" activecolor="darksalmon">
			<template v-slot:item-icon>
				<img src="~assets/img/tarbar/classify1.png" />
			</template>
			<template v-slot:item-icon-active>
				<img src="~assets/img/tarbar/classify2.png" />
			</template>
			<template v-slot:item-text><div>分类</div></template>
		</tab-bar-item>
		
		<tab-bar-item path="/cart" activecolor="darksalmon"> 
			<template v-slot:item-icon>
				<img src="~assets/img/tarbar/shopcart1.png" />
			</template>
			<template v-slot:item-icon-active>
				<img src="~assets/img/tarbar/shopcart2.png" />
			</template>
			<template v-slot:item-text><div>购物车</div></template>
		</tab-bar-item>
		
		<tab-bar-item path="/profile" activecolor="darksalmon">
			<template v-slot:item-icon>
				<img src="~assets/img/tarbar/me1.png" />
			</template>
			<template v-slot:item-icon-active>
				<img src="~assets/img/tarbar/me2.png" />
			</template>
			<template v-slot:item-text><div>我的</div></template>
		</tab-bar-item>
		
	</tab-bar>
	</div>
</template>

<script>
	import TabBar from '../common/tabbar/Tabbar.vue'
	import TabBarItem from '../common/tabbar/TabBarItem.vue'
	
	export default {
		name: 'MainTabBar',
		components: {
			TabBar: TabBar,
			TabBarItem
		}
	}
	
</script>

<style>
</style>
