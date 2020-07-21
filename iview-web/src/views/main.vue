<style lang="css">
     @import '../styles/all.css'; 
</style>

<template>
  <div class="main">
      <!-- 头部 -->
      <div class="header">
        <!-- <Header></Header> -->
        <Top></Top>
      </div>

      <!-- 主体部分 -->
      <div class="content">
          <!-- keep-alive缓存作用 -->
          <keep-alive>
              <router-view></router-view>
          </keep-alive>
          
      </div>
      
      <!-- 底部 -->
      <div class="footer">
          <Footer></Footer>
      </div>
  </div>
</template>

<script>
import Header from './Layout/header'
import Footer from './Layout/footer'
import Top from './Layout/top'
export default {
    name:'all',
    components:{ Header,Footer,Top },
    computed:{
        
    },
    watch:{
        $route(to,from){
            
        }
    }
}

</script>
