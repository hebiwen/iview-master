<template>
<div class="swipper">
  <swiper :options="swiperOption" class="swiper" >
      <!-- <swiper-slide><img src="../../assets/wap1.jpg" class="swipper-img" ></swiper-slide>
      <swiper-slide><img src="../../assets/wap2.png" class="swipper-img" ></swiper-slide> -->
      <swiper-slide :key="index" v-for="(image,index) in list" >
        <img :src="image.imgUrl" class="swipper-img" >
        <!-- <img v-lazy="image.imgUrl" class="swipper-img" > -->
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</div>
</template>

<script>
  export default {
    data() {
      return {
        swiperOption: {
          loop:true, //循环模式
          pagination: {
            el: '.swiper-pagination'  // 分页器
          }
        },
        //ajax请求的图片要用require才能显示
        list:[
          {imgUrl:require('../../assets/wap1.jpg') },
          {imgUrl:require('../../assets/wap2.png') }
        ]
      }
    }
  }
</script>

<style scoped>
  .swiper{
    width: 100%;
    float: left;
  }
  .swipper-img{
    width:100%;
    height:120px;
    display: block;
  }
</style>

