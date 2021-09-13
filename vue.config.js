//Vue4起别名的配置

const path = require('path'); //引入path模块
function resolve(dir) {
	return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}
module.exports = {	
	//给路径起别名相关配置（vue3/4就是要新建一个名为vue.config.js的文件写）
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('./src'))
			.set('components', resolve('./src/components'))
			.set('views', resolve('src/views'))
			.set('assets', resolve('src/assets'))
			.set('common', resolve('src/common'))
			.set('network', resolve('src/network'))
		//set第一个参数：设置的别名，第二个参数：设置的路径
	}
}

//使用时注意
// 1.在html代码中 ：要在路径前添加波浪线 否则会报错
// <img src="~assets/img/tabbar/active.svg" alt="">

// 2.在script代码中：不用添加波浪线 直接使用
// import MainTabBarItem from "components/MainTabBarItem";

