<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <header class="form-header">选择食品种类</header>
                <el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">
                    <el-row class="category-select">
                        <el-form-item label="食品种类">
                            <el-select v-model="categoryForm.categorySelect" :placeholder="selectValue.label" style="width:100%">
                                <el-option
                                    v-for="item in categoryForm.categoryList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row class="add-category-row" :class="showAddCategory?'showEdit':''">
                        <div class="add-category">
                            <el-form-item label="食品种类" prop="name">
                                <el-input v-model="categoryForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="种类描述" prop="description">
                                <el-input v-model="categoryForm.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitcategoryForm('categoryForm')">提交</el-button>
                            </el-form-item>
                        </div>
                    </el-row>
                    <div class="add-category-button" @click="addCategoryFun">
                        <i class="el-icon-caret-top edit-icon" v-if="showAddCategory"></i>
                        <i class="el-icon-caret-bottom edit-icon" v-else solt="icon"></i>
                        <span>添加食品种类</span>
                    </div>
                </el-form>
                <header class="form-header">添加食品</header>
                <el-form :model="foodForm" :rules="foodrules" ref="foodForm" label-width="110px" class="form">
                    <el-form-item label="食品名称" prop="name">
                        <el-input v-model="foodForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="食品活动" prop="activity">
                        <el-input v-model="foodForm.activity"></el-input>
                    </el-form-item>
                    <el-form-item label="食品详情" prop="descrption">
                        <el-input v-model="foodForm.descrption"></el-input>
                    </el-form-item>
                    <el-form-item label="食品特点">
						<el-select v-model="foodForm.attributes" multiple placeholder="请选择">
						    <el-option
						      	v-for="item in attributes"
						      	:key="item.value"
						      	:label="item.label"
						      	:value="item.value">
						    </el-option>
					 	</el-select>
					</el-form-item>
					<el-form-item label="食品规格">
						<el-radio class="radio" v-model="foodSpecs" label="one">单规格</el-radio>
  						<el-radio class="radio" v-model="foodSpecs" label="more">多规格</el-radio>
					</el-form-item>
                    <el-row v-if="foodSpecs == 'one'">
                        <el-form-item label="包装费">
                            <el-input-number v-model="foodForm.specs[0].packing_fee" :min="0" :max="100"></el-input-number>
                        </el-form-item>
                        <el-form-item label="价格">
                            <el-input-number v-model="foodForm.specs[0].price" :min="0" :max="10000"></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row v-else>
                        <el-button type="primary" @click="dialogFormVisible = true">添加规格</el-button>
                        <el-table
                        :data="foodForm.specs"
                        :row-class-name="tableRowClassName">
                            <el-table-column prop="specs" label="规格"></el-table-column>
                            <el-table-column prop="packing_fee" label="包装费"></el-table-column>
						    <el-table-column prop="price" label="价格"></el-table-column>
						    <el-table-column label="操作">
                                <el-button size="small" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
import headTop from '@/components/headTop'
export default {
    data() {
        return {
            categoryForm: {
                categoryList: [],
                categorySelect: '',
                name: '',
                description: ''
            },
            foodForm: {
                name: '',
                description: '',
                activity: '',
                attributes: [],
                specs: [{
                    specs: '默认',
                    packing_fee: 0,
                    price: 20
                }]
            },
            foodrules: {
                name: [
                    {required: true, message: '请输入食品名称', trigger: 'blur'}
                ]
            },
            showAddCategory: false,
            foodSpecs: 'one',
        }
    },
    components: {
        headTop
    },
    computed: {
        selectValue() {
            return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
        }
    },
    methods: {
        addCategoryFun() {
            this.showAddCategory = !this.showAddCategory;
        }
    }
}
</script>

<style lang="scss" scoped>
    .form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
    .food-form{
        border: 1px solid #eaeefb;
        padding: 10px 10px 0;
    }
    .form-header{
		text-align: center;
		margin-bottom: 10px;
	}
	.category-select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
	.add-category-row{
		height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.showEdit{
		height: 185px;
	}
	.add-category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
	}
	.add-category-button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit-icon{
				color: #20a0ff;
			}
		}
		span{
            font-size: 14px;
            color: #999;
			transition: all 400ms;
		}
		.edit-icon{
			color: #ccc;
			transition: all 400ms;
		}
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.cell{
		text-align: center;
	}
</style>
