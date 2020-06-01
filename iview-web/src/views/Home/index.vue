<!--首页-->
<template>
      <div class="page-content">
        <Row>
        <Col span="24" style="text-align:center" >
            <img src="@/assets/logo.png" alt="文库">
        </Col>
        <Col span="24">
            <ul class="head-menu">
                <!--子集路由跳转时带上back-->
                <router-link tag="li" to="/index">推荐</router-link>
                <router-link tag="li" to="/category">热门</router-link>
                <router-link tag="li" to="/my">互联网</router-link>
                <router-link tag="li" to="/my">教学办公</router-link>
                <router-link tag="li" to="/my">文学科教</router-link>
            </ul>
        </Col>
        </Row>
        <Row>
            <!--横幅轮播功能-->
            <Swiper></Swiper>
        </Row>
	
        <!-- 拉到底部刷新分页 -->
        <Row>
          <Card>
            <Scroll :on-reach-bottom="handleReachBottom" height="500" >
            <List item-layout="vertical">
              <ListItem v-for="item in reports" :key="item._id">
                <ListItemMeta :avatar = "item.Thumb" :title="item._id + '.' +item.Title"></ListItemMeta>
                {{ item.Content }}
                <template slot="action">
                <li>
                    <Icon type="ios-star-outline" /> 123
                </li>
                <li>
                    <Icon type="ios-thumbs-up-outline" /> 234
                </li>
                <li>
                    <Icon type="ios-chatbubbles-outline" /> 345
                </li>
                </template>
              </ListItem>
            </List>
            </Scroll>
         </Card>
        </Row>
    </div>
</template>

<script>
import Swiper from './banner';

export default {
    name:'Index',
    data(){
        return{
            reports:[],
            pageIndex:1,
            total:0
        }
    },
    components:{
        Swiper
    },
    mounted(){ 
        this.getReports();
     },
    methods:{
        getReports(pageIndex){
            var _params = { name:'',pageIndex:pageIndex};
            // nginx 发布时使用全路径 http://134.175.93.211:3090/reportList
            this.$http.get('http://134.175.93.211:3090/reportList',{ params : _params }).then(result => {
                console.log(result);
                this.reports = result.data.data;
            })
        },
        handleReachBottom(){
            return new Promise( resolve => {
                this.pageIndex =  this.pageIndex*1 + 1;
                setTimeout(()=>{
                    var _params = { name:'',pageIndex:this.pageIndex};
                    this.$http.get('http://134.175.93.211:3090/reportList',{params:_params}).then(result=>{
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
    }
}
</script>
<style>
    .ivu-card-body{padding:0 10px; }
    .ivu-list-item-meta{ margin-bottom: 0 !important; }
    .ivu-list-item{ padding: 5px 0; }
    .ivu-list-item-action{ margin-top: 0 !important; }
    .ivu-list-item-meta-title { margin-bottom: 5px !important; }
</style>