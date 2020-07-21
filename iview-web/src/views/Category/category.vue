<template>
  <div class="page-category">
    <div class="page-category-tab">
      <ul @click="doSelectTab($event)">
        <li :class="{'category-tab-active':tabName=='hyzx'}" name="hyzx">行业资讯</li>
        <li :class="{'category-tab-active':tabName=='hybg'}" name="hybg">行业报告</li>
        <li :class="{'category-tab-active':tabName=='hyfl'}" name="hyfl">行业导航</li>
        <li :class="{'category-tab-active':tabName=='hyrd'}" name="hyrd">行业热点</li>
        <li :class="{'category-tab-active':tabName=='zdtj'}" name="zdtj">重点推荐</li>
        <li :class="{'category-tab-active':tabName=='nfjs'}" name="nfjs">年份检索</li>
        <li :class="{'category-tab-active':tabName=='dzbg'}" name="dzbg">定制报告</li>
      </ul>
    </div>
    <div class="page-category-detail">
      <dl>
        <dd v-for="item in categorys" :key="item._id">
          <dt>{{ item.CategoryName }}</dt>
          <ul v-if="item.Childrens.length>0">
            <li v-for="it in item.Childrens" class="sub-category" >
              <a href="javascript:;">
                <div class="sub-title">{{it.CategoryName}}</div>
                <i>80篇</i>
              </a>
            </li>
          </ul>
          <ul v-else>
            <li class="sub-category">
              <a href="javascript:;">
                <div class="sub-title">{{item.CategoryName}}</div>
                <i>80篇</i>
              </a>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
    name:'category',
    data(){
      return{
        tabName :'hyzx',
        categorys:[]
      }
    },
    mounted(){
      this.getCategory()
    },
    methods:{
      doSelectTab(e){
        var currTab = e.target.attributes.name.value;
        this.tabName = currTab;

        this.getCategory();
      },
      getCategory(){
        this.$http.get(this.baseURL +'/categoryList',{ params:{ group:[ this.tabName ] } }).then(result => {
          this.categorys = result.data.data;
        })
      }
    }
}
</script>
<style>
.category-tab-active{color: red}
.category-detail-active{display: block !important;}
</style>