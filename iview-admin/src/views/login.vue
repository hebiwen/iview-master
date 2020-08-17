<style lang="less">
    @import '../styles/login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入手机号或者登录账号</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            form: {
                userName: Cookies.get('user'),
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
       async handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    var query = new URLSearchParams();
                    query.append("userName",this.form.userName);
                    query.append("password",this.form.password);
                    this.$http.post('/api/admin/login', query).then(result => {
                        if(result.data.length <= 0){
                            this.$Message.error("账号或密码错误");
                            return;
                        }
                        if(result.data[0].UserType == null || result.data[0].UserType.indexOf('管理员') < 0 ){
                            this.$Message.warning("您没有登录权限"); // 通过UserType来判断是否有登录权限
                            return;
                        }
                        Cookies.set('user', result.data[0].UserName);
                        Cookies.set('password', this.form.password);
                        this.$store.commit('setAvator',result.data[0].Avtar);
                        Cookies.set('access',0);
                        this.$router.push({name: 'home'});
                    })
                }
            });
        }
    }
};
</script>

<style>

</style>
