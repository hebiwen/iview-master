<template description="顶部返回、路由名、搜索框等">
  <div class="page-top">
    <div class="page-top-icon" @click="doBack"><span></span></div>
    <div v-if="title=='shop'" class="page-top-title">
      <!-- <Input search enter-button="Search" placeholder="缓存历史搜索记录" /> -->
      
      <AutoComplete v-model="search" @on-search="doLoadSearch" @on-select="doChange" @on-blur="doSearch" icon="ios-search" placeholder="缓存历史搜索记录">
        <Option v-for="(item,index) in searchArr" :value="item" :key="index">{{ item }}</Option>
      </AutoComplete>
    </div>
    <div v-else class="page-top-title">{{title}}</div>
    <div v-show="title=='index'" class="page-top-login">
      <router-link to="login">登录</router-link>
    </div>
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
        title:'',
        search:'',
        searchArr:[]
      }
    },
    watch:{
       $route(to,from){
         this.title = to.name;
       }
    },
    methods:{
      doBack(){
        window.history.back();
      },
      doLoadSearch(){
        //this.searchs = ['1','12','123']
        this.$http.get(this.baseURL + '/userList',{ params:{ search : this.search } }).then(result=>{
          if(result.data.data.length<=0) return;
          result.data.data.forEach(item=>{
            this.searchArr.push(item.UserName);
          })
        })
      },
      doChange(option){
        alert(option);
      },
      doSearch(e){
        console.log(e.target.value);
      },
      // window.addEventListener('blur',doSearch);
    }
}

</script>
<style>
.page-top{position: relative;border-bottom: 1px solid #e5e5e5;min-height: 44px; }
.page-top-icon { width: 40px;height: 44px; display: block;position: absolute;}
.page-top-icon span { margin: 12px 0 0 10px;width: 20px;height: 20px;display: block; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURUdwTF1famFhal1fal1fal5ga39/f15hbF5ga2JidV1fasLnCw4AAAAKdFJOUwDxN13aWgVemg1awhgkAAAATUlEQVQoz2NgGAjA5FiAKai4SgxToRQWQcVVqwKwKFyMTaHBUFTI4IVFIeeqVQ0MRKnEGkAg25cyEGc9VocOCqUBxKUQrGkJe6qjEgAAfcYsJDT7oy4AAAAASUVORK5CYII=) no-repeat;background-size: 100% 100%; }
.page-top-title { margin: 0 40px;height: 44px;line-height: 44px;text-align: center;overflow: hidden; }
.page-top-login { position: absolute;width: 40px;height: 44px;line-height: 44px;top:0;right: 0; }
</style>
