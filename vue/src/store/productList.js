import axios from 'axios'
import {baseURL} from "../../public/urlConfig";
export default{
  namespaced:true,
    state:{
      //图书列表
        productList:[],
        //查询后的图书列表
        selectedProductList:[],
        //借阅的图书
        borrowedBook:[
          {
            bookId:'',
            bookCategory:'',
            bookself:'',
            bookNumber:'',
            readerId:'',
          }
        ],
        
        //当前登录的用户
        nowLogin:{
          username:'',
          password:''
        },
        //当前登录的用户信息
        nowUser:{
          readerNumber:'',
          readerPassword:'',
          readerName:'',
          readerClass:'',
          readerId:'',
          readerTele:'',
          isManager:''
        },
        cart:[
          {
          }
        ],
        //获取前5的图书
        BookTop5:[
          {
            bookName:'',
            bookBorrowed:''
          }
        ],
        ReaderTop3:[

        ],
        //前三类型
        CategoryTop3:[

        ]
    },
    mutations:{
        getProductList(state,val){
          state.productList = val.data
        },
        ByProductId(state,val){
          state.selectedProductList = val.data.data.product
        },
        ByProductName(state,val){
          state.selectedProductList = val.data
        },
        login(state,val){
          console.log("mu",state.nowUser)
          state.nowLogin.username = val[0].readerNumber
          state.nowLogin.password = val[0].readerPassword
          state.nowUser = val[0]
          // console.log("mu",state.nowUser)
        },
    },
    actions:{
    // 获取所有图书列表
    getProductList(context){
        axios({
          method:'GET',
          url:`${baseURL}/products/getAllList`,
        }).then((data) => {
          context.commit("getProductList",data)
        })
    },
    //删除书籍
    deleteBook(context,params){
      axios({
        method:'POST',
        url:'http://localhost:8081/test1_war_exploded/bookServlet',
        params:params
      }).then(() => {
        console.log(params)
        context.dispatch('getBookList')
      })
    },
    //根据书籍名称查询
    ByProductName(context,params){
      axios({
        method:'GET',
        url:`${baseURL}/products/productbyName`,
        params:params
      }).then((data) => {
        context.commit('ByProductName',data)
      })
    },
    //根据书籍id查询
    ByProductId(context,params){
      axios({
        method:'GET',
        url:`${baseURL}/products/productbyId`,
        params:params
      }).then((data) => {
        context.commit('ByProductId',data)
      })
    },
    //根据图书类别查询
    SelectByBookCategory(context,params){
      axios({
        method:'POST',
        url:'http://localhost:8081/test1_war_exploded/bookServlet',
        params:params
      }).then((data) => {
        console.log(data)
        context.commit('SelectBy',data)
      })
    },
    //添加图书
    AddBook(context,params){
      axios({
        method:'POST',
        url:'http://localhost:8081/test1_war_exploded/bookServlet',
        params:params
      }).then((data) => {
        console.log(data)
      })
    },
    //登录验证
    Login(context,params){
      console.log("aciton",params)
      axios({
        method:'POST',
        url:'http://localhost:8081/test1_war_exploded/LoginServlet',
        params:params
      }).then((data) => {
        if(data.data.length === 1){
          console.log(data)
          context.commit('login',data.data)
        }
      })
    },
    //获取前5个
    getHotBook5(context){
      var params = {
        option:'hotBook5'
      }
      axios({
        method:'POST',
        url:'http://localhost:8081/test1_war_exploded/SelectHotServlet',
        params:params
      }).then((data) => {
        console.log(data)
        context.commit('getHotBook5',data)
      })
    },
    //获取前三个
    getHotReader3(context){
      var params = {
        option:'hotReader3'
      }
      axios({
        method:'POST',
        url:'http://localhost:8081/test1_war_exploded/SelectHotServlet',
        params:params
      }).then((data) => {
        console.log(data)
        context.commit('getHotReader3',data)
      })
    },
    //获取前三个类别
    getHotCategory3(context){
      var params = {
        option:'hotCategory3'
      }
      axios({
        method:'POST',
        url:'http://localhost:8081/test1_war_exploded/SelectHotServlet',
        params:params
      }).then((data) => {
        console.log(data)
        context.commit('getHotCategory3',data)
      })
    },
   
  }
}