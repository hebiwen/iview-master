<template>
  <div class="page-footer">
    <Row>
        <Col span="24">
        <ul class="foot-menu">
            <router-link tag="li" to="/index">
                <a href="javascript:;">
                    <Icon type="md-home"  size="25" />
                    <span class="foot-label">首页</span>
                </a>
            </router-link>
            <router-link tag="li" to="/category">
                <a href="javascript:;">
                    <Icon type="md-menu" size="25" />
                    <span class="foot-label">分类</span>
                </a>
            </router-link>
            <router-link tag="li" to="/shop">
                <a href="javascript:;">
                    <Icon type="md-planet" size="25" />
                    <span class="foot-label">书城</span>
                </a>
            </router-link>
            <router-link tag="li" to="/cart">
                <a href="javascript:;">
                    <Icon type="md-cart" size="25" />
                    <span class="foot-label">购物车</span>
                </a>
            </router-link>
            <router-link tag="li" to="/my">
                <a href="javascript:;">
                    <Icon type="md-person" size="25" />
                    <span class="foot-label">我的</span>
                </a>
            </router-link>
        </ul>
        </Col>
    </Row>
  </div>        
</template>

<script>
export default {
    name:'Footer',
    methods:{
        // handleCheck(name){
        //     console.log(name);
        //     this.$router.push({ path:name });
        // }
    },
    
}

</script>
<style>
.router-link-active a{ color: red !important; }
</style>