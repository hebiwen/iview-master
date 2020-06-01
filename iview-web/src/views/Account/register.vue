<style lang="css">
    @import '../../styles/wenku.css';
</style>

<template>
  <div id="page-reg">
      <div class="container">
    <nav class="row wenku-list-title">
        <a href="user.html" class="pull-left"><img src="img/back.png" alt=""></a>
        <h3 class="text-center">会员注册</h3>
    </nav>

    <div class="wenku-main row">
        <form class="col-xs-12" role="form">
            <div class="form-group">
                <label class="control-label">邮箱</label>
                <input type="text" class="form-control" placeholder="请输入您的邮箱">
            </div>
            <div class="form-group">
                <label class="control-label col-xs-12 wenku-no-padding">验证码</label>
                <div class="col-xs-8 wenku-no-padding">
                    <input type="text" class="form-control" placeholder="请输入邮箱验证码">
                </div>
                <div class="col-xs-4"><span class="btn btn-success">获取验证码</span></div>
            </div>
            <div class="form-group">
                <label class="control-label mgt-15px">用户名</label>
                <input type="text" class="form-control" placeholder="请输入您的用户名，限2-16个字符">
            </div>
            <div class="form-group">
                <label class="control-label">密码</label>
                <input type="text" class="form-control" placeholder="请输入您的密码">
            </div>
            <div class="form-group">
                <label class="control-label">确认密码</label>
                <input type="text" class="form-control" placeholder="请输入您的确认密码">
            </div>
            <div class="form-group">
                <label class="control-label">个性签名</label>
                <textarea class="form-control" rows="3" placeholder="请输入您的个性签名，让更多的人认识你"></textarea>
            </div>

            <div class="form-group">
                 <button type="submit" class="btn btn-success btn-block">立即注册</button>
            </div>
        </form>

        <div class="col-xs-12">
            <div class="help-block wenku-tips">
                <span>忘记密码？<a href="findpwd.html" class="font-color-green">找回密码</a></span>
                <span class="pull-right">已有账号？<a href="login.html" class="font-color-green">马上登录</a></span>
            </div>
        </div>



    </div>

</div>


<div class="wenku-footer text-center">
    <div class="help-block">
        <a href="#">关于我们</a>
        <a href="#">文库协议</a>
        <a href="#">意见反馈</a>
        <a href="#">免责声明</a>
        <a href="#">联系我们</a>
    </div>
    <div class="help-block">
        ©2017 IT文库(wenku.it)
    </div>
    <div class="help-block">Powered By <a href="http://www.hc-cms.com" class="font-color-green">HC-CMS</a></div>
</div>
  </div>
</template>

<script>
export default {

}

</script>
<style>
</style>