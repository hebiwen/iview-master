<template>
  <div class="page-header">
    <Row>
      <Col span="24" style="text-align:center" >
        <img src="@/assets/logo.png" alt="文库">
      </Col>
      <Col span="24">
        <ul class="head-menu">
          <router-link tag="li" to="/index">推荐</router-link>
          <router-link tag="li" to="/category">热门</router-link>
          <router-link tag="li" to="/my">互联网</router-link>
          <router-link tag="li" to="/my">教学办公</router-link>
          <router-link tag="li" to="/my">文学科教</router-link>
        </ul>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {

}

</script>
<style>
</style>