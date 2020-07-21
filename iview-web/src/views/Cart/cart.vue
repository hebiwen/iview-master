<template description="购物车">
  <div class="page-cart">
    <div v-show="lstCart.length>0">
      <dl class="section">
      <dt>
        <input type="checkbox" :checked="lstCart.length == checkIndex.length" @click="doCheckGroup" />
        <a href="javascript:;">佳贝母婴用品专卖店(所属分类、行业)  <Icon type="ios-arrow-forward" /></a>
      </dt>
      <dd>
        <ul>
          <li class="goods goods-last" v-for="(goods,index) in lstCart" style="background-color:#ddd">
            <div class="item-select">
              <input type="checkbox" name="cb" :checked="checkIndex.indexOf(index)>=0" @change="doCheck(index)" />
            </div>
            <div class="item-img">
              <img src="//img10.360buyimg.com/mobilecms/s234x234_jfs/t1/124383/30/2018/243801/5ec21e2dE0edc1ad8/99fd02b9f37200bf.jpg!q70.dpg.webp" alt="商品缩略图" />
            </div>
            <div class="item-main">
              <div class="item-name">{{ goods.goodsName }}</div>
              <div class="item-tag">原味256g</div>
              <div class="item-fee">
                <div class="fee">{{ "¥ " + goods.goodsPrice.toFixed(2) }}</div>
                <div class="num-wrap">
                  <span class="minus" @click="doAddOrMinus(goods,-1)">-</span>
                  <div class="input-wrap">
                    <!--input中绑定 value="{{goood.goodsAmount}}" 是错误的 -->
                    <input type="text" class="num" v-model="goods.goodsAmount"  />
                  </div>
                  <span class="plus ios-add"  @click="doAddOrMinus(goods,1)">+</span>
                </div>
              </div>
              <div class="item-action"><a href="javascript:;" @click="doRemove(goods)">删除</a>&nbsp;&nbsp;<a>加入收藏</a></div>
            </div>
          </li>
          
        </ul>
      </dd>
      </dl>

     <!-- <dl class="section">
      <dt>
        <Checkbox></Checkbox>
        <a href="javascript:;">佳贝母婴用品专卖店(所属分类、行业)  <Icon type="ios-arrow-forward" /></a>
      </dt>
      <dd>
        <ul>
          <li class="goods">
            <div class="item-select"><Checkbox></Checkbox></div>
            <div class="item-img">
              <img src="//img10.360buyimg.com/mobilecms/s234x234_jfs/t1/124383/30/2018/243801/5ec21e2dE0edc1ad8/99fd02b9f37200bf.jpg!q70.dpg.webp" alt="商品缩略图" />
            </div>
            <div class="item-main">
              <div class="item-name">米素儿泌乳益生菌宝宝营养米粉钙铁辛米糊儿童果蔬多维淮上辅食256g</div>
              <div class="item-tag">原味256g</div>
              <div class="item-fee">
                <div class="fee">¥ 88.00</div>
                <div class="num-wrap">
                  <span class="minus">-</span>
                  <div class="input-wrap">
                    <input type="text" class="num" value="1" />
                  </div>
                  <span class="plus ios-add">+</span>
                </div>
              </div>
            </div>
          </li>
          <li class="goods goods-last">
            <div class="item-select"><Checkbox></Checkbox></div>
            <div class="item-img">
              <img src="//img10.360buyimg.com/mobilecms/s234x234_jfs/t1/124383/30/2018/243801/5ec21e2dE0edc1ad8/99fd02b9f37200bf.jpg!q70.dpg.webp" alt="商品缩略图" />
            </div>
            <div class="item-main">
              <div class="item-name">米素儿泌乳益生菌宝宝营养米粉钙铁辛米糊儿童果蔬多维淮上辅食256g</div>
              <div class="item-tag">原味256g</div>
              <div class="item-fee">
                <div class="fee">¥ 88.00</div>
                <div class="num-wrap">
                  <span class="minus">-</span>
                  <div class="input-wrap">
                    <input type="text" class="num" value="1" />
                  </div>
                  <span class="plus ios-add">+</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </dd>
      </dl>
     <dl class="section">
        <dt>
          <Checkbox></Checkbox>
          <a href="javascript:;">佳贝母婴用品专卖店  <Icon type="ios-arrow-forward" /></a>
        </dt>
        <dd>
          <ul>
            <li class="goods">
              <div class="item-select"><Checkbox></Checkbox></div>
              <div class="item-img">
                <img src="//img10.360buyimg.com/mobilecms/s234x234_jfs/t1/124383/30/2018/243801/5ec21e2dE0edc1ad8/99fd02b9f37200bf.jpg!q70.dpg.webp" alt="商品缩略图" />
              </div>
              <div class="item-main">
                <div class="item-name">米素儿泌乳益生菌宝宝营养米粉钙铁辛米糊儿童果蔬多维淮上辅食256g</div>
                <div class="item-tag">原味256g</div>
                <div class="item-fee">
                  <div class="fee">¥ 88.00</div>
                  <div class="num-wrap">
                    <span class="minus">-</span>
                    <div class="input-wrap">
                      <input type="text" class="num" value="1" />
                    </div>
                    <span class="plus ios-add">+</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </dd>
     </dl> -->

     <dl>
        <div class="fixBar" style="background:#ddd">
          <div class="item-select-all"><input type="checkbox" />  全选</div>
          <div class="total">
            <div class="t-detail">
              <p class="t-main">总计:<span class="t_price">¥ {{ checkfeeSum.toFixed(2) }}</span></p>
            </div>
            <div class="btn-buy">
            结算
            <span class="num">{{lstCart.length}} 件</span>
            </div>
          </div>
        </div>
     </dl>
    </div>
    <div v-show="lstCart.length<=0" class="cart-null">当前购物车没有商品</div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  name:'Cart',
  data(){
    return{
        local_cart_cookie:'local_cart',
        lstCart:[],
        checkfeeSum:0.00, //商品总费用
        cart:{
          goodsId:null,
          goodsName:'',
          goodsAmount:1,
          goodsPrice:0,
          feeSum:0
        },
        itemAmount:1,
        checkIndex:[],
        isCheckedGroup:false
    }
  },
  mounted(){
    // console.log("localCart:" + JSON.parse(this.$store.state.app.localCart))
    this.doInit();
  },
  methods:{
    doInit(){
      let lstCart = this.$store.state.app.localCart ? JSON.parse(this.$store.state.app.localCart) : [];
      this.lstCart = lstCart;
      lstCart.forEach((item)=>{
        this.checkfeeSum +=item.feeSum; 
      })
    },
    doAddOrMinus(itemCart,itemAmount){
        if(itemCart.goodsAmount + itemAmount < 1) return; // 商品数量为1时不能再减
        this.cart = itemCart;
        this.itemAmount = itemAmount;
        itemCart.goodsAmount += itemAmount;
        this.$store.commit('addCart',this)
    },
    doRemove(itemGoods){
      // filter 过滤掉array 返回剩下的元素
      var newCart = this.lstCart.filter(function(item){
          return item != itemGoods;
      })
      this.lstCart = newCart; //刷新
      Cookies.set(this.local_cart_cookie,newCart);
    },
    doCheck(idx){
      let index = this.checkIndex.indexOf(idx);
      if(index>=0){
        this.checkIndex.splice(index,1);
      }else{
        this.checkIndex.push(idx);
      }
    },
    doCheckGroup(){
      this.isCheckedGroup = !this.isCheckedGroup;
      if(this.isCheckedGroup){
        // 全选时
        this.checkIndex = [];
        this.lstCart.forEach((item,idx) => {
          this.checkIndex.push(idx)
        })
      }else{
        this.checkIndex = [];
      }
    }
  },
  watch:{
    $route(to,from){
      if(to.name == 'cart'){
        this.doInit();
      }
    }
  }
}

</script>
<style>
dt input[type=checkbox] { margin-left: 5px;}
.item-select-all {top: 15px;left: 5px;width: 60px;position: absolute;display: block;}
</style>