import Vue from 'vue'
import VueRouter from 'vue-router'

//1.安装插件
Vue.use(VueRouter)

//路由懒加载
const Home = () => import('../views/home/Home.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Classify = () => import('../views/classify/Classify.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail.vue')

//2.创建路由
const routes = [{ //让网页默认第一次打开时，是Home页面
		path: '', // path:'/',加不加/都行
		redirect: '/home', //redirect:重定向
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
		meta: { //元数据，描述数据的数据
			title: '首页'
		},
	},
	{
		path: '/cart',
		name: 'Cart',
		component: Cart,
		meta: {
			title: '购物车'
		}
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
		meta: {
			title: '我的'
		}
	},
	{
		path: '/classify',
		name: 'Classify',
		component: Classify,
		meta: {
			title: '分类'
		}
	},
	{
		path: '/detail/:iid',//动态路由
		name: 'detail',
		component: Detail,
		meta: {
			title: '详情'
		}
	},
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

// 3.导出
export default router
