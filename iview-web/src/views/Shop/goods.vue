<template description="商品详情">
  <div class="page-goods">
    <div class="goods-info">
      <div class="goods-top">
        <div>
          <img src="../../assets/wap1.jpg" class="gd-thumb" />
          <div class="gd-detail">
            <h3>{{cart.goodsName}}</h3>
            <div>刘效舜</div>
            <div class="item-fee">
                <div class="fee">¥ {{cart.goodsPrice}}</div>
                <div class="num-wrap">
                  <span class="minus" @click="doAddOrMinus(-1)">-</span>
                  <div class="input-wrap">
                    <input type="text" class="num" :value="itemAmount" />
                  </div>
                  <span class="plus ios-add" @click="doAddOrMinus(1)">+</span>
                </div>
            </div>
          </div>
        </div>
        <div class="gd-desc">
          通过设置属性 long 可将按钮宽度设置为 100%，常用于弹窗内操作按钮使用者也可以直接通过给组件添加 style 来设置更细节的样式，比如定宽。
        </div>
      </div>
      <div class="goods-dir">
        <div>目录 <b>共45章</b></div>
      </div>
    </div>
    <div class="goods-foot">
      <Button type="success" @click="addGoodsToCart">加入购物车</Button>
      <Button type="error">立即购买</Button>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    name:'goods',
    data(){
      return {
        local_cart_cookie:'local_cart',
        itemAmount:1,
        cart:{
          goodsId:null,
          goodsName:'',
          goodsAmount:1,
          goodsPrice:0,
          feeSum:0
        }
      }
    },
    mounted(){
      // console.log("store1:"+this.$store.state.app.localCart) // 这样取store中的属性
      this.loadGoods(); 
    },
    methods:{
      loadGoods(){
        this.$http.get(this.baseURL + '/goodsDetail',{ params:{ id:this.$route.query.id } }).then(result=>{
          this.cart = {
            goodsId: result.data.data._id,
            goodsName : result.data.data.GoodsName,
            goodsPrice : result.data.data.GoodsPrice,
          }
        },err=>{
          console.log(err);
        })
      },
      addGoodsToCart(){
        this.$store.commit('addCart',this);         // 同步
        // this.$store.dispatch('addCartAsync',this);  // 异步
      },
      //直接加入购物车
      addGoodsToCart1(){
        let cookieValue = Cookies.get(this.local_cart_cookie);
        let lstCart = cookieValue ? JSON.parse(cookieValue) : [];
        let goodsindex;
        // 判断当前商品是否已加入购物车，并获得数组中的Index
        let isExist = lstCart.some((item,index) => {
          //arr.some 有一个为true则返回ture. arr.any 所有都为true则返回ture
          goodsindex = index;
          return item.goodsId == this.cart.goodsId;
        });
        if(isExist){
          lstCart[goodsindex].goodsAmount += this.itemAmount;
          lstCart[goodsindex].feeSum += this.itemAmount * lstCart[goodsindex].goodsPrice;
        }else{
          lstCart.push({goodsId:this.cart.goodsId,goodsName:this.cart.goodsName,goodsAmount:this.itemAmount,goodsPrice:this.cart.goodsPrice,feeSum:this.itemAmount * this.cart.goodsPrice});
        }
        Cookies.set(this.local_cart_cookie,JSON.stringify(lstCart),"3d")
      },
      doAddOrMinus(amount){
        if(this.itemAmount + amount < 1) return;
        this.itemAmount += amount;
      }
    },
    watch:{
      $route(to,from){
        if(to.name=='goods'){
          this.loadGoods()
        }
      }
    }
}

</script>
<style>
.page-goods{ position: relative;padding: 2px 2px; }
.goods-foot { position: fixed;bottom: 53px;width: 100%; }
.goods-foot button { width: 49%; }

.gd-thumb{ width: 120px;height: 180px;position: relative; }
.gd-detail { position: absolute;left: 130px;top: 0;right: 0; }
</style>