<template>
	<div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
		<div v-if="Object.keys(paramInfo.image).length !== 0">{{paramInfo.image}}</div>

		<table class="sizes" border="0" cellspacing="0" v-for="item in paramInfo.sizes[0]">
			<tr>
				<td v-for="item2 in item" >{{item2}}</td>
			</tr>
		</table>
		<br>
		
		<table class="infos" border="0" cellspacing="0" v-for="item in paramInfo.infos">
			<tr>
				<td class="info-item">{{item.key}}</td>
				<td class="info-next">{{item.value}}</td>
			</tr>
		</table>
	</div>
</template>

<script>
	export default {
		name: 'DetailParamInfo',
		props: {
			paramInfo: {
				type: Object
			}
		}
	}
</script>

<style scoped>
	.param-info {
		background-color: #FFFFFF;
	}
	.infos{
		width: 95%;
		margin-left: 2%;
		margin-right: 3%;
		border-bottom: 1px solid #C0C0C0;
		margin-bottom: 10px;
	}
	.info-item{
		width: 30%;
		padding-left: 10px;
	}
	.info-next{
		color: crimson;
	}
	.sizes{
		width: 95%;
		margin-left: 2%;
		margin-right: 3%;
		border-bottom: 1px solid #C0C0C0;
		margin-bottom: 10px;
	}
	.sizes>tr>td{
		width: 10%;
		padding-left: 10px;
	}
	.sizes>tr>td:first-child{
		/* background-color: #2EC4B6; */
		width: 20%;
	}
	.sizes>tr>td:last-child{
		width: 20%;
	}
</style>
