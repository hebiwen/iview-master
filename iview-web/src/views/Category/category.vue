<template>
  <div class="page-category">
    <Row>
      <Col span="8">
        <Menu theme='light' active-name="1" width="auto">
        <MenuItem name="1">
              中小学教育
        </MenuItem>
        <MenuItem name="2">
              高等教育
        </MenuItem>
        <MenuItem name="3">
              作文库
        </MenuItem>
        <MenuItem name="4">
              合同大全
        </MenuItem>
        <MenuItem name="5">
              资格考试
        </MenuItem>
        <MenuItem name="6">
              行业报告
        </MenuItem>
        <MenuItem name="7">
              求职简历
        </MenuItem>
        <MenuItem name="8">
              医药卫生
        </MenuItem>
        </Menu>
      </Col>
      <Col span="16">
        <div>
          <h3>中小学教育</h3>
          <ul>
            <li class="li-category">
              <a href="javascript:;">
                <span>学前教育</span>
                <i>80篇</i>
              </a>
            </li>
            <li class="li-category">
              <a href="javascript:;">
                <span>小学教育</span>
                <i>80篇</i>
              </a>
            </li>
            <li class="li-category">
              <a href="javascript:;">
                <span>初中教育</span>
                <i>80篇</i>
              </a>
            </li>
            <li class="li-category">
              <a href="javascript:;">
                <span>高中教育</span>
                <i>80篇</i>
              </a>
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
    name:'category'
}

</script>
<style>
.li-category{ width: 100px;float: left; margin: 5px 5px; text-align: center;border:1px solid #ddd; }
.li-category span,i { width: 100%;float: left; text-align: center; }
</style>