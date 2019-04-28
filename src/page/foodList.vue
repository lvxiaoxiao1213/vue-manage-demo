<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table-container">
            <el-table
                :data="tableData"
                @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
                style="width: 100%">
                <el-table-column type="expand">
                    <template v-slot="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="食品名称">
                                <span>{{props.row.name}}</span>
                            </el-form-item>
                            <el-form-item label="餐馆名称">
                                <span>{{props.row.restaurant_name}}</span>
                            </el-form-item>
                            <el-form-item label="食品 ID">
                                <span>{{props.row.item_id}}</span>
                            </el-form-item>
                            <el-form-item label="餐馆 ID">
                                <span>{{props.row.restaurant_id}}</span>
                            </el-form-item>
                            <el-form-item label="食品介绍">
                                <span>{{props.row.description}}</span>
                            </el-form-item>
                            <el-form-item label="餐馆地址">
                                <span>{{props.row.restaurant_address}}</span>
                            </el-form-item>
                            <el-form-item label="食品评分">
                                <span>{{props.row.rating}}</span>
                            </el-form-item>
                            <el-form-item label="食品分类">
                                <span>{{props.row.category_name}}</span>
                            </el-form-item>
                            <el-form-item label="月销量">
                                <span>{{props.row.month_sales}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="食品名称" prop="name">
                </el-table-column>
                <el-table-column label="食品介绍" prop="description">
                </el-table-column>
                <el-table-column label="评分" prop="rating">
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template v-slot="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
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
            restaurant_id: null,
            city: {},
            offset: 0,
            limit: 20,
            count: 0,
            tableData: [],
            selectTable: {},
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
            this.httpService.get('/shopping/v2/foods/count', {restaurant_id: this.restaurant_id}).then(countData => {
                if (countData.status == 1) {
                    this.count = countData.count;
                }
                this.getFoods();
            })
        },
        getFoods() {
            this.httpService.get('/shopping/v2/foods', {offset: this.offset, limit: this.limit, restaurant_id: this.restaurant_id}).then(data=>{
                data.forEach((item, index)=>{
                    item.index = index;
                })
                this.tableData = data;
            })
        },
        handleSelect(index){
            this.selectIndex = index;
            this.selectMenu = this.menuOptions[index];
        },
        handleEdit(row) {
            this.getSelectItemData(row, 'edit')
            this.dialogFormVisible = true;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            this.getFoods()
        },
    }
}
</script>

<style lang="scss" scoped>

</style>
