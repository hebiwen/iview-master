<template>
  <div class="page-category">
    <div class="page-category-tab">
      <ul @click="doSelectTab($event)">
        <li :class="{'category-tab-active':tabName=='zxxjy'}" name="zxxjy">中小学教育</li>
        <li :class="{'category-tab-active':tabName=='gdjy'}" name="gdjy">高等教育</li>
        <li :class="{'category-tab-active':tabName=='zwk'}" name="zwk">作文库</li>
        <li :class="{'category-tab-active':tabName=='htdq'}" name="htdq">合同大全</li>
        <li :class="{'category-tab-active':tabName=='kszg'}" name="kszg">资格考试</li>
        <li :class="{'category-tab-active':tabName=='hybg'}" name="hybg">行业报告</li>
        <li :class="{'category-tab-active':tabName=='yyws'}" name="yyws">医药卫生</li>
      </ul>
    </div>
    <div class="page-category-detail">
      <dl v-show="tabName == 'zxxjy'">
        <dt>中小学教育</dt>
        <dd>
          <a href="javascript:;">
            <span>学前教育</span>
            <i>80篇</i>
          </a>
        </dd>
        <dd>
          <a href="javascript:;">
            <span>学前教育2</span>
            <i>80篇</i>
          </a>
        </dd>
      </dl>
      <dl v-show="tabName == 'gdjy'">
        <dt>高等教育</dt>
        <dd>
          <a href="javascript:;">
            <span>学前教育</span>
            <i>80篇</i>
          </a>
        </dd>
        <dd>
          <a href="javascript:;">
            <span>学前教育3</span>
            <i>80篇</i>
          </a>
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
        tabName :'zxxjy'
      }
    },
    methods:{
      doSelectTab(e){
        console.log("e:"+e.target.attributes.name.value);
        this.tabName = e.target.attributes.name.value;
      }
    }
}
</script>
<style>
.category-tab-active{color: red}
.category-detail-active{display: block !important;}
</style>