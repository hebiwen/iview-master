<template description='角色管理'>
   <div>
       <Row :gutter="10">
            <Col>
                <Card>
                    <p slot="title">
                        <Icon type="pinpoint"></Icon>
                        角色列表
                    </p>
                    <Row>
                        <Input v-model="search" icon="search" placeholder="请输入标题搜索..." style="width: 400px" />
                        <router-link tag="Button" :to="{name:'addReport'}" class="fr ivu-btn-success" >添加</router-link>
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="roles" border></Table>
                         <Page :total="total" :page-size="10" :current="pageIndex" @on-change="changePage" show-total class="margin-top-8" />
                    </Row>
                </Card>
            </Col>
        </Row>
   </div>
</template>
<script>
export default {
   name: 'roles',
   data() {
       return {
           roles:[],
           columns:[
               { 
                   render: (h,params) => {
                       return h('div',params.index)
                    }
               },
               { key:'Name',title:'角色名称'}
           ],
           total:0,
           pageIndex:1,
       }
   },
  mounted() {
      this.getRole();
  },
  methods: {
      getRole(){
          // httpGet 参数只能用params传参  httpPost 可以使用qs.stringfiy(),URLSearchParams等传参
          this.$http.get('/api/admin/roleList',{ params : { pageIndex:this.pageIndex } }).then(result => {
              console.log("role list:"+result.data);
              this.roles = result.data;
          })
      }

  },
}
</script>
<style scoped>
</style>
