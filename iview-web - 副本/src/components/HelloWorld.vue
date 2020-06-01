<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="item in userList">{{item.UserName}}</li>
    </ul>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'this is web prot:8092',
      userList:[]
    }
  },
  mounted(){
    this.getUserList();
  },
  methods:{
    getUserList(){
      var _this = this;
      _this.$http.get('/api/userlist').then(result=>{
        console.log(result);
        _this.userList = result.data;
      }).catch(err=>{
        console.log("get admin data error:"+err);
      })
    }
  }
}
</script>

