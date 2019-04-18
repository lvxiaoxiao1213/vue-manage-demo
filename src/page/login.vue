<template>
    <div class="login-page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form-container" v-show="showLogin">
                <div class="manage-tip">
                    <p>elm后台管理系统</p>
                </div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" placeholder="密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')" class="submit-btn">登录</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur'}
                ],
            },
            showLogin: false
        }
    },
    mounted() {
        this.showLogin = true;
    },
    methods: {
        submitForm(formName) {
            this.httpService.post('/admin/login', { user_name: this.loginForm.username, password: this.loginForm.password}).then(data=>{
                if(data['status']===1) {
                    this.$router.push('manage');
                    this.$message({
                        type: 'success',
                        message: '登录成功'
                    });
                }
            })
            
        }
    },
    watch: {
        adminInfo: function(newValue) {
            if(newValue.id) {
                this.$message({
                    type: 'success',
                    message: '检测到你之前登录过，将自动登录'
                })
                this.$router.push('manage')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .login-page{
		background-color: #324057;
	}
	.manage-tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form-container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -160px;
        margin-right: -160px;
        width: 320px;
        height: 320px;
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
