<template description="书城">
  <div class="page-shop">
    <Row>
      <Col span="24">
        <ul class="g-nav-list">
          <li>签到有奖</li>
          <li>高考题库</li>
          <li>图书频道</li>
          <li>大学生频道</li>
          <li>精品专区</li>
          <li>工具</li>
          <li>办公资料</li>
          <li>全部分类</li>
        </ul>
      </Col>
    </Row>
    <Row>
      <!-- 广告插入 -->
    </Row>
    <Row>
      <ul class="g-tab-item-list">
        <li class="tab-item">中小学教材</li>
        <li class="tab-item">中小学教材</li>
        <li class="tab-item">中小学教材</li>
        <li class="tab-item">中小学教材</li>
        <li class="tab-item">中小学教材</li>
      </ul>
      <div class="g-list">
        <dl class="g-detail" v-for="goods in goodsList">
          <router-link tag="a" :to="{path:'/shop/goods',query:{ id:goods._id }}">
            <dd><img src="../../assets/wap2.png" /></dd>
            
            <dt>{{ goods.GoodsName }}</dt>
          </router-link>
        </dl>
        <!-- <dl class="g-detail">
          <dd><img src="../../assets/wap2.png"></dd>
          <dt>慢慢来,一切都来得及</dt>
        </dl>
        <dl class="g-detail">
          <dd><img src="../../assets/wap2.png"></dd>
          <dt>慢慢来,一切都来得及</dt>
        </dl> -->
      </div>
    </Row>
  </div>
</template>

<script>
export default {
  name:'ShopIndex',
  data(){
    return{
      goodsList:[]
    }
  },
  mounted(){
    this.loadGoodsList()
  },
  methods:{
      loadGoodsList(){
        this.$http.get(this.baseURL + '/goodsList').then(result=>{
          this.goodsList = result.data.data;
        })
      }
  }
}

</script>
<style>
</style>