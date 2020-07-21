<style lang="css">
    @import '../../styles/wenku.css';
</style>

<template>
<div id="page-reg">
  <div class="container">
    <nav class="row wenku-list-title">
        <!-- <a href="user.html" class="pull-left"><img src="img/back.png" alt=""></a> -->
        <h3 class="text-center">会员登录</h3>
    </nav>

    <Row v-show="loginType">
        <Col span="24">
        <Form ref="formTop" :model="formTop" :rules="ruleTop" label-position="top" >
        <FormItem label="账号" prop="userName">
            <Input type="text" v-model="formTop.userName" placeholder="请输入账号/邮箱/手机号">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input type="password" v-model="formTop.password" placeholder="请输入登录密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formTop')" long>马上登录</Button>
        </FormItem>
        <FormItem style="text-align:center">
            <Button @click="changeLoginType">短信验证码登录</Button>
        </FormItem>
        </Form>
        </Col>
    </Row>

    <Row v-show="!loginType">
        <Col span="24">
        <Form ref="formTop" :model="formTop" :rules="ruleTop" label-position="top" >
        <FormItem label="手机号" prop="userName">
            <Input type="text" v-model="formTop.userName" placeholder="请输入手机号">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem label="手机验证码" prop="password">
            <Row :gutter="16">
                <Col span="18">
                    <Input type="text" v-model="formTop.password" placeholder="请输入手机验证码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </Col>
                <Col span="6">
                    <Button>获取验证码</Button>
                </Col>
            </Row>
            
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formTop')" long>马上登录</Button>
        </FormItem>
        <FormItem style="text-align:center">
            <Button @click="changeLoginType">账号密码登录</Button>
        </FormItem>
        </Form>
        </Col>
    </Row>

    <Row>
        <Col span="24">
        <!--支持第三方账号登录-->
           <Card>
               <p slot="title">第三方快速登录</p>
               <a href="#">QQ</a>
               <a href="#">微信</a>
           </Card>
        </Col>
    </Row>
    <Row>
        <Col span="24">
        <div class="col-xs-12">
            <div class="help-block wenku-tips">
                <span>忘记密码？<a href="/" class="font-color-green">找回密码</a></span>
                <span class="pull-right">没有账号？<router-link :to="{path:'/register'}" class="font-color-green">马上注册</router-link></span>
            </div>
        </div>
        </Col>
    </Row>

    </div>
</div>
</template>

<script>
export default {
    name:'Login',
    data(){
        return{
            formTop: {
                    userName: '',
                    password: ''
                },
            ruleTop: {
                    userName: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
                    password: [
                        { required: true, message: '请输入密码.', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度至少为6位', trigger: 'blur' }
                    ]
                },
            loginType:true
        }
    },
    methods:{
        handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (!valid) return;
                    let query = new URLSearchParams();
                    query.append("userName",this.formTop.userName);
                    query.append("password",this.formTop.password);
                    this.$http.post(this.baseURL + '/login',query).then((result) => {
                        if(!result){
                            this.$Message.error("用户名或密码错误");
                            return false;
                        }
                        // 登录成功跳转至首页
                        this.$router.push({
                            path:'/'
                        })
                    })
                })
            },
            changeLoginType(){
                this.loginType = !this.loginType;
            }
    }

}

</script>
<style>
</style>
