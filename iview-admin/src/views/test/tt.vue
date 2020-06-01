<!-- 文章列表 -->
<template>
  
  <div>
    <Row :gutter="10">
            <Col>
                <Card>
                    <p slot="title">
                        <Icon type="pinpoint"></Icon>
                        素材管理
                    </p>
                    <Row>
                        <Input v-model="keyword" icon="search" @on-change="getCategory" placeholder="请输入姓名搜索..." style="width: 200px" />
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="articles"></Table>
                    </Row>
                </Card>
            </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name:'tt',
  data () {
    return {
        articles:[],
        columns:[
            {key:'id',title:'id'},
            {key:'CreateDate',title:'创建日期',width:120}
        ],
        keyword:''
    };
  },
  mounted(){
     this.getCategory();
  },
  methods: {
    getCategory(){
        var _params = {name:this.keyword};
        this.$http.get('/home',{params:_params}).then(result=>{
            console.log(result);
            this.articles = result.data;
        }).catch(err=>{
            console.log("test is error:"+err);
        })
    }
  }
}

</script>
<style lang='less'>
   
</style>