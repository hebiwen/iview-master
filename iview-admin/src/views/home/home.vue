<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    上周每日服务调用量(万)
                </p>
                <div class="line-chart-con">
                    <service-requests></service-requests>
                </div>
            </Card>
        </Row>
        <div>
            <ul>
                <li v-for="item in Categorys">{{ item.CategoryName }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import serviceRequests from './components/serviceRequests.vue';

export default {
    name: 'home',
    components: {
        serviceRequests
    },
    data () {
        return {
            toDoList: [
                {
                    title: '去iView官网学习完整的iView组件'
                }
            ],
            count: {
                createUser: 496,
                visit: 3264,
                collection: 24389305,
                transfer: 39503498
            },
            showAddNewTodo: false,
            newToDoItemValue: '',
            Categorys:[]
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    mounted:function(){
          this.getCategory()
    },
    methods: {
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        },
        getCategory(){
            this.$http.get('/home').then(result=>{
                console.log(result);
                this.Categorys = result.data;
            }).catch(err=>{
                console.log("get category data error:"+err);
            })
        }
    }
};
</script>
