<template>
    <div class="header-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path: './manage'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown @command="handleCommand">
            <img src="../assets/images/logo.png" class="logo">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="home">首页</el-dropdown-item>
                <el-dropdown-item command="signout">退出</el-dropdown-item>
            </el-dropdown-menu>
            
        </el-dropdown>
    </div>
</template>

<script>
export default {
    methods: {
        handleCommand(command) {
            if(command === 'home'){
                this.$router.push('/manage');
            }else{
                console.log('signout')
                this.$router.push('/');
            }
        }
    }
}
</script>

<style lang="scss">
    .header-container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
    .logo {
        width: 36px;
        height: 36px;
		margin-right: 20px;
    }
</style>

