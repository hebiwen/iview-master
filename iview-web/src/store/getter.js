
// getter 可以理解为store中state的一些派生状态，也可以理解为计算属性
const getters = {
    //带参数的getter方法, this.$store.getters.getterExample('hello')
    getterExample:(state) => (val)=>{
        if(state.localCart == ''){
            return state.localCart + val;
        }
    }
}

export default getters

