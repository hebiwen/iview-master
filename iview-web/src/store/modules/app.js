import Cookies from 'js-cookie';

const app = {
    // state 状态
    state:{
        local_cart_cookie:'local_cart',
        localCart: Cookies.get('local_cart')
    }, 
    // mutations 更改store中状态的唯一方法，不能使用异步操作
    mutations:{
        addCart(state,vm){
            let cookieValue = Cookies.get(state.local_cart_cookie);
            let lstCart = cookieValue ? JSON.parse(cookieValue) : [];
            let goodsindex;
            // 判断当前商品是否已加入购物车，并获得数组中的Index
            let isExist = lstCart.some((item,index) => {
            //arr.some 有一个为true则返回ture. arr.any 所有都为true则返回ture. arr.filter 是否包含
            goodsindex = index;
            return item.goodsId == vm.cart.goodsId;
            });
            if(isExist){
                lstCart[goodsindex].goodsAmount += vm.itemAmount;
                lstCart[goodsindex].feeSum += vm.itemAmount * lstCart[goodsindex].goodsPrice;
            }else{
                lstCart.push({goodsId:vm.cart.goodsId,goodsName:vm.cart.goodsName,goodsAmount:vm.itemAmount,goodsPrice:vm.cart.goodsPrice,feeSum:vm.itemAmount * vm.cart.goodsPrice});
            }
            Cookies.set(state.local_cart_cookie,lstCart,{expires:3})
        }
    },
    actions:{
        addCartAsync(context,vm){
            console.log('statesaync:'+context.state.local_cart_cookie);
            context.commit('addCart',vm);
        }
    }
}

export default app;


