<template>
  <div class="page-report">
    <h3>{{report.title}}</h3>
    <p>
        <span>发布日期:{{ report.publishDate }}</span>
        <span v-if="report.author!=''">作者:{{report.author}} </span> 
          </p>
    <div class="page-report-detail">
        {{ report.content }}
    </div>
    <div class="page-report-comment">暂无评论</div>
    <div class="page-report-tool">
        <div class="t-comment">评论</div>
        <div class="t-input">
            <input type="text" placeholder="想对他说点什么..." />
        </div>
        <div class="t-like">点赞</div>
        <div class="t-collect">收藏</div>
        <div class="t-send">转发</div>
    </div>
  </div>
</template>

<script>
export default {
    name:'ReportDetail',
    data(){
        return {
            report:{
                id:'',
                title:'',
                publishDate:'',
                author:'',
                content:''
            }
        }
    },
    // activated 用户重复激活一个实例的时候，使用mounted或created时只有第一次取得到数据
    activated(){
        let rptId = this.$route.query.id
        this.report.id = rptId;
        this.getReportDetail(rptId)
    },
    methods:{
        getReportDetail(id){
            this.$http.get(this.baseURL + '/reportDetail',{ params:{ id:id } }).then(result => {
                this.report = {
                    title : result.data.Title,
                    publishDate : result.data.CreateDate,
                    content : result.data.Content
                }
            })
        }
    }
}

</script>
<style>

</style>