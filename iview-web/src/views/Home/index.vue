<template description="首页">
      <div class="page-index">
        <div class="page-index-head">
            <!--横幅轮播功能-->
            <Swiper></Swiper>
        </div>
        
        <div class="page-index-list fl" style="width:100%;">
            <ul class="index-menu">
                <!--子集路由跳转时带上back-->
                <li><router-link tag="a" :to="{path:'/index',query:{category:'全部'}}" :class="{'current': currCategory == '全部' }">全部</router-link></li>
                <li v-for="item in categorys" :key="item._id" >
                    <router-link tag="a" :to="{path:'/index',query:{category:item.CategoryName}}" :class="{'current':item.CategoryName == currCategory}" >{{item.CategoryName}}</router-link>
                    <!-- <a href="javascript:;" :class="item.CategoryName == currCategory ? 'current' : ''">{{item.CategoryName}}</a> -->
                </li>
            </ul>
            
            <!-- 拉到底部刷新分页 -->
            <Scroll :on-reach-bottom="handleReachBottom" height="380" >
            <ul class="index-list">
                <li v-for="item,index in reports" :key="item._id">
                    <router-link  tag="a" :to="{path:'/index/report',query:{id:item._id}}" >
                        <div class="index-list-title">{{(index+1) + '.' +item.Title}}</div>
                        <div class="index-list-content">{{ item.Content.substring(0,50) }}</div>
                    </router-link>
                </li>
            </ul>
            </Scroll>
        </div>
    </div>
</template>

<script>
import Swiper from './banner';
import util from '../../libs/util';

export default {
    name:'Index',
    data(){
        return{
            reports:[],
            pageIndex:1,
            total:0,
            categorys:[],
            currCategory:'全部'
        }
    },
    components:{
        Swiper
    },
    mounted(){ 
        this.getCategory();
        this.getReports();
     },
    methods:{
        getCategory(){
            this.$http.get(this.baseURL + '/categoryList',{params:{group:['hyzx','hybg']}}).then(result => {
                if(result.data.data.length <=0) return;
                this.categorys = result.data.data;
                // this.currCategory = result.data.data[0].CategoryName;
            })
        },
        getReports(pageIndex){
            var _params = { 
                pageIndex:pageIndex, 
                category:this.currCategory == '全部' ? '' : this.currCategory
                };
            // nginx 发布时使用全路径 http://134.175.93.211:3090/reportList
            // 配置baseURL之前路径是 /api/web/reportList
            this.$http.get(this.baseURL + '/reportList',{ params : _params }).then(result => {
                this.reports = result.data.data;
            })
        },
        handleReachBottom(){
            return new Promise( resolve => {
                this.pageIndex =  this.pageIndex*1 + 1;
                setTimeout(()=>{
                    var _params = { name:'',pageIndex:this.pageIndex};
                    this.$http.get(this.baseURL + '/reportList',{params:_params}).then(result=>{
                        if(result.data.data.length>0)
                        {
                            result.data.data.forEach((item)=>{
                                this.reports.push(item);
                            })
                        }
                    })
                    resolve();
                },500);
            })
        }
    },
    watch:{
        $route(){
            //不知道为啥用query ,而params娶不到值
            console.log("query:"+ this.$route.query);
            let currentCate = this.$route.query.category
            if(!util.isNullOrEmpty(currentCate)){
                this.currCategory = currentCate;
                this.getReports();
            }
        }
    }
}
</script>
<style>
   .ivu-scroll-loader-wrapper { padding: 0 }
  .current { color: #1cb584 !important;font-weight: 700; }
  .current::after {
      content: '';
    width: 100%;
    height: 2px;
    border-radius: 1px;
    background-color: #1cb584;
    display: block;
  }
</style>