<template>
  <div class="page-top" height="15px">
    <Row>
      <Col span="4" >
        <Icon type="ios-arrow-back" v-if="isCanBack" />
      </Col>
      <Col span="20">{{ title }}</Col>
    </Row>
  </div>
</template>

<script>
export default {
    name:'Top',
    // props:{
    //   title:String
    // },
    data(){
      return {
        isCanBack:true,
        title:''
      }
    },watch:{
       $route(to,from){
         this.title = to.name;
       }
    }
}

</script>
<style>
.page-top div div i { text-align: left; }
.page-top div div.ivu-col-span-20 { text-align: center; }
</style>
