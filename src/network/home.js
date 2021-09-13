import {request} from './request.js'

export function getHomeMultidata(){
	return request({
		url:'/home/multidata'
	})
}

export function getHomeGoods(type,page){
	return request({
		url:'/home/data',
		params:{
			type,
			page
		}
	})
	// //url:'http://123.207.32.32:8000/home/data?type=sell&page=2',
	// url:'http://152.136.185.210:7878/api/m5/home/data',
	// //?type=sell&page=2的参数,除了写在网址后面,也可以写在params里面
	// params:{
	// 	type:'sell',
	// 	page:2
	// }
	
}