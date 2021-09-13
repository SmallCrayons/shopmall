<template>
	<div class="comment-border">
		<div class="CommentInfo">
			<!-- {{commentInfo}} -->
			<!-- 评价/更多文字 -->
			<div class="title"><span>用户评价</span><span>更多</span></div>

			<div>
				<!-- 用户信息 -->
				<div class="user-message">
					<!-- 用户头像 -->
					<img class="user-avatar" :src="commentInfo.user.avatar" />
					<div class="user-tilte">
						<!-- 用户名 -->
						<span>{{commentInfo.user.uname}}</span>
						<!-- 样式 -->
						<div class="chooseStyle">{{commentInfo.created | showDate}} {{commentInfo.style}}</div>
					</div>

				</div>
				<!-- 评价信息 -->
				<span>{{commentInfo.content}}</span>

				<!-- 图片 -->
				<div class="comment-image">
					<img v-for="item in commentInfo.images" :src="item">
				</div>
			</div>
			<br>
		</div>
	</div>
</template>

<script>
	import {
		formatDate
	} from '../../../common/utils.js'

	export default {
		name: 'DetailCommentInfo',
		props: {
			commentInfo: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		filters: { //过滤器
			showDate(value) {
				//1.将时间戳转化为Date对象(date要求传入时间单位是毫秒，所以要*1000把秒转化为毫秒)
				const date = new Date(value * 1000)

				//2.将date格式化转换为对应的字符串
				return formatDate(date, 'yyyy-MM-dd')
			}
		}
	}
</script>

<style scoped="scoped">
	.comment-border{
		margin: 25px 0px;
		border-bottom: 8px solid #e2e4e8;
		border-top: 8px solid #e2e4e8;
	}
	.CommentInfo {
		margin: 15px 10px;
		
	}

	.user-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.comment-image>img {
		width: 100px;
	}

	.title {
		display: flex;
		justify-content: space-between;
		margin: 10px 5px;
	}

	.user-message {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.user-message span {
		margin-left: 10px;
	}

	.comment-image img {
		border-radius: 5px;
	}

	.chooseStyle {
		font-size: 14px;
		color: #8c979f;
		margin: 3px 10px;
	}

	.user-tilte {
		margin-top: 5px;
	}
</style>
