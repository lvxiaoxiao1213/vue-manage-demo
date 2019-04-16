<template>
    <div class="header-container">
        <el-breabcrumb>
            <el-breadcrumb-item :to="{path: './manage'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breabcrumb>
        <el-dropdown>
            
        </el-dropdown>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="sass">

</style>

