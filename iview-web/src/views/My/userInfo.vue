<template>
  <div class="page-user">
      <div class="user-head">
        <div class="user-head-img">
          <img src="@/assets/avatar.png" alt="会员头像">
        </div>
        <div class="user-head-detail">
          <div class="d-title">hebiwen888 <span>Message</span></div>
          <div class="d-list">
            <ul>
              <li><p>积分</p><i>100</i></li>
              <li><p>下载券</p><i>100</i></li>
              <li><p>文库豆</p><i>100</i></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="user-tab">
        <ul>
          <li>
            <Icon type="ios-star-half" size="30" />
            <p>我的收藏</p>
            <i>14篇</i>
          </li>
          <li>
            <Icon type="ios-star-half" size="30" />
            <p>我的下载</p>
            <i>14篇</i>
          </li><li>
            <Icon type="ios-star-half" size="30" />
            <p>最近浏览</p>
            <i>14篇</i>
          </li>
          <li>
            <Icon type="ios-star-half" size="30" />
            <p>离线文档</p>
            <i>14篇</i>
          </li>
          <li>
            <Icon type="ios-star-half" size="30" />
            <p>积分记录</p>
            <i>14篇</i>
          </li>
          <li>
            <Icon type="ios-star-half" size="30" />
            <p>我的订单</p>
            <i>14篇</i>
          </li>
        </ul>
      </div>

      <div class="user-list">
        <h3>我的文库</h3>
        <ul>
          <li>
            <span>我的订单</span>
            <Icon type="ios-arrow-forward" />
          </li>
          <li>
            <span>我的卡包</span>
            <Icon type="ios-arrow-forward" />
          </li>
          <li>
            <span>我的评论</span>
            <Icon type="ios-arrow-forward" />
          </li>
          <li>
            <span>意见反馈</span>
            <Icon type="ios-arrow-forward" />
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {

}

</script>
<style>

</style>