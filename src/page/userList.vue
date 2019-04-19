<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table-container">
            <el-table :data="tableData" highlight-current-row style="width: 100%">
                <el-table-column type="index" width="100"></el-table-column>
                <el-table-column property="registe_time" label="注册日期" width="220"></el-table-column>
                <el-table-column property="username" label="用户姓名" width="220"></el-table-column>
                <el-table-column property="city" label="地址"></el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left; margin-top: 10px">
                <el-pagination
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="currentPage"
                 :page-size="20"
                 layout="total, prev, pager, next"
                 :total="count"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/headTop'

export default {
    data() {
        return {
            tableData: [{
                registe_time: '2016-05-02',
                username: 'tom',
                city: 'Shanghai'
            },{
                registe_time: '2016-05-02',
                username: 'lucy',
                city: 'Shanghai'
            },{
                registe_time: '2016-05-02',
                username: 'amy',
                city: 'Shanghai'
            },{
                registe_time: '2016-05-02',
                username: 'cindy',
                city: 'Shanghai'
            }],
            currentRow: null,
            offset: 0,
            limit: 15,
            count: 4,
            currentPage: 1
        }
    },
    components: {
        headTop
    },
    created() {
        this.initData();
    },
    methods: {
        initData() {
            this.httpService.get('/v1/users/count').then(data=>{
                if(data['status']===1){
                    this.count = data['count']
                }else{
                    throw new Error('获取数据失败');
                }
            })
            this.getUsers();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1) * this.limit;
            this.getUsers();
        },
        getUsers() {
            this.httpService.get('/v1/users/list', {offset: this.offset, limit: this.limit}).then(data=>{
                this.tableData = data;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
 .table-container {
     padding: 20px;
 }
</style>

