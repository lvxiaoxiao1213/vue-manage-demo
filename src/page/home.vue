<template>
    <div>
        <head-top></head-top>
        <section class="data-section">
            <header class="section-title">数据统计</header>
            <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data-list today-head"><span class="data-num head">当日数据：</span></div></el-col>
                <el-col :span="4"><div class="data-list"><span class="data-num">{{userCount}}</span> 新增用户</div></el-col>
                <el-col :span="4"><div class="data-list"><span class="data-num">{{orderCount}}</span> 新增订单</div></el-col>
                <el-col :span="4"><div class="data-list"><span class="data-num">{{adminCount}}</span> 新增管理员</div></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data-list all-head"><span class="data-num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data-list"><span class="data-num">{{allUserCount}}</span> 注册用户</div></el-col>
                <el-col :span="4"><div class="data-list"><span class="data-num">{{allOrderCount}}</span> 订单</div></el-col>
                <el-col :span="4"><div class="data-list"><span class="data-num">{{allAdminCount}}</span> 管理员</div></el-col>
            </el-row>
        </section>
        <tendency :sevenDate="sevenDate" :sevenDay="sevenDay"></tendency>
    </div>
</template>

<script>
import headTop from '@/components/headTop'
import tendency from '@/components/tendency'
import dtime from 'time-formater'

export default {
    name: 'Home',
    data() {
        return {
            userCount: null,
            orderCount: null,
            adminCount: null,
            allUserCount: null,
            allOrderCount: null,
            allAdminCount: null,
            sevenDay: [],
            sevenDate: [[], [], []]
        }
    },
    components: {
        headTop,
        tendency
    },
    mounted() {
        this.initData();
        for(let i = 6; i > -1; i--) {
            const date = dtime(new Date().getTime() - 864000000*i).format('YYYY-MM-DD')
            this.sevenDay.push(date);
        }
        console.log(this.sevenDay)
        this.getSevenData();
    },
    methods: {
        initData() {
            const today = dtime().format('YYYY-MM-DD');
            this.httpService.get(`/statis/user/${today}/count`).then(data=>{
                this.userCount = data.count;
            })
            this.httpService.get(`/statis/order/${today}/count`).then(data=>{
                this.orderCount = data.count;
            })
            this.httpService.get(`/statis/admin/${today}/count`).then(data=>{
                this.adminCount = data.count;
            })
            this.httpService.get(`/v1/users/count`).then(data=>{
                this.allUserCount = data.count;
            })
            this.httpService.get(`/bos/orders/count`).then(data=>{
                this.allOrderCount = data.count;
            })
            this.httpService.get(`/admin/count`).then(data=>{
                this.allAdminCount = data.count;
            })
        },
        getSevenData() {
            const apiArr = [[], [], []];
            // this.sevenDay.forEach(item => {
            //     apiArr[0].push(userCount)
            // })
        }
    }
}
</script>

<style lang="scss" scoped>
.data-section{
		padding: 20px;
		margin-bottom: 40px;
		.section-title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data-list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data-num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today-head{
            background: #FF9800;
        }
        .all-head{
            background: #20A0FF;
        }
	}
</style>
