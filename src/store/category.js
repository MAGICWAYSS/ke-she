import axios from 'axios'
export default{
  namespaced:true,
    state:{
        categoryList:[
          {
            
          }
        ],
        selectCategoryList:[
          {
            categoryId:'',
            categoryName:''
          }
        ]
    },
    mutations:{
      getCategoryList(state,val){
        // console.log("mutations",val)
        state.categoryList = val.data
        console.log("categoryList",state.categoryList)
      },
      SelectBy(state,val){
        state.selectCategoryList = val.data
        state.categoryList = state.selectCategoryList
        console.log("categoryList",state.categoryList)
     },
    },
    actions:{
      //获取所有图书分类
      getCategoryList(context){
        axios({
          method:'GET',
          url:'http://localhost:8081/test1_war_exploded/categoryServlet',
        }).then((data) => {
          // console.log("所有列表",data)
          context.commit("getCategoryList",data)
        })
    },
    deleteCategory(context,params){
      axios({
        method:'POST',
        url:'http://localhost:8081/test1_war_exploded/SelectCategoryServlet',
        params:params
      }).then(() => {
        console.log(params)
        context.dispatch('getCategoryList')
      })
    },
    SelectByCategoryName(context,params){
      axios({
        method:'POST',
        url:'http://localhost:8081/test1_war_exploded/SelectCategoryServlet',
        params:params
      }).then((data) => {
        console.log(data)
        context.commit('SelectBy',data)
      })
    },
    }
    
}