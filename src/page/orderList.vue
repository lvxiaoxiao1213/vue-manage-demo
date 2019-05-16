<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table-container">
            <el-table 
                :data="tableData"
                @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row=>row.index"
                style="width: 100%"
            >
                <el-table-column type="expand">
                    <template v-slot="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="用户名">
                                <span>{{props.row.user_name}}</span>
                            </el-form-item>
                            <el-form-item label="店铺名称">
                                <span>{{props.row.restaurant_name}}</span>
                            </el-form-item>
                            <el-form-item label="收货地址">
                                <span>{{props.row.address}}</span>
                            </el-form-item>
                            <el-form-item label="店铺 ID">
                                <span>{{props.row.restaurant_id}}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{props.row.restaurant_address}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
			      label="订单 ID"
			      prop="id">
			    </el-table-column>
			    <el-table-column
			      label="总价格"
			      prop="total_amount">
			    </el-table-column>
			    <el-table-column
			      label="订单状态"
			      prop="status">
			    </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/headTop'

export default {
    data() {
        return {
            tableData: [],
            currentRow: null,
            offset: 0,
            limit: 15,
            count: 0,
            currentPage: 1,
            restaurant_id: null,
            expendRow: []
        }
    },
    components: {
        headTop
    },
    created() {
        this.restaurant_id = this.$route.query.restaurant_id;
        this.initData();
    },
    methods: {
        initData() {
            this.httpService.get('/bos/orders/count', {restaurant_id: this.restaurant_id}).then(data=>{
                if(data.status == 1) {
                    this.count = data.count;
                }else {
                    throw new Error('获取数据失败');
                }
                this.getOrders();
            })
        },
        getOrders() {
            this.httpService.get('/bos/orders', {offset: this.offset, limit: this.limit, restaurant_id: this.restaurant_id}).then(data => {
                this.tableData = [];
                data.forEach((item, index)=>{
                    let tableItem = {};
                    tableItem.id = item.id;
                    tableItem.total_amount = item.total_amount;
                    tableItem.status = item.status_bar.title;
                    tableItem.user_id = item.user_id;
 					tableItem.restaurant_id = item.restaurant_id;
 					tableItem.address_id = item.address_id;
                    tableItem.index = index;
                    this.tableData.push(tableItem)
                })
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            this.getOrders()
        },
        expand(row, status) {
            if(status) {
                let apiArr = [];
                apiArr.push(this.httpService.get(`/shopping/restaurant/${row.restaurant_id}`));
                apiArr.push(this.httpService.get(`/v1/user/${row.user_id}`));
                apiArr.push(this.httpService.get(`/v1/addresse/${row.address_id}`));
                Promise.all(apiArr).then(data=>{
                    this.tableData.splice(row.index, 1, {...row, ...{restaurant_name: data[0].name, restaurant_address: data[0].address, address: data[2].address, user_name: data[1].username}});
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
