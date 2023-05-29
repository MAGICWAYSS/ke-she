import axios from 'axios'
export default{
  namespaced:true,
    state:{
      //图书列表
        bookList:[
            {
                bookId:'',
                bookName:'',
                bookCategory:'',
                bookself:'',
                bookAuthor:'',
                bookPublisher:'',
                bookNumber:'',
                bookSummary:'',
                bookBorrowed:'',
                bookState:'',
                isDeleted:''
        }],
        //查询后的图书列表
        selectedBookList:[
          {
                bookId:'',
                bookName:'',
                bookCategory:'',
                bookself:'',
                bookAuthor:'',
                bookPublisher:'',
                bookNumber:'',
                bookSummary:'',
                bookBorrowed:'',
                bookState:'',
                isDeleted:''
          }
        ],
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
      deleteUser(state) {
        delete state.cart
     },
        getBookList(state,val){
          // console.log("mutations",val)
          state.bookList = val.data
          // console.log("bookList",state.bookList)
        },
        SelectBy(state,val){
           state.selectedBookList = val.data
           state.bookList = state.selectedBookList
           console.log("selectedBookList",state.bookList)
        },
        //加入购物车
        AddToCart(state,val){
          state.cart.push(val) 
          // state.cart.splice(0,1)
          console.log("cart",state.cart)
        },
        login(state,val){
          console.log("mu",state.nowUser)
          state.nowLogin.username = val[0].readerNumber
          state.nowLogin.password = val[0].readerPassword
          state.nowUser = val[0]
          // console.log("mu",state.nowUser)
        },
        borrowedBook(state,val){
          
        },
         //清空cart
        clearCart(state){
          state.cart = []
        },
        //删除一个
        removeOneBook(state,val){
          console.log(val)
          for(var i = 0;i<state.cart.length;i++){
            if(state.cart[i].bookId === val){
              state.cart.splice(i,1);
              break;
            }
          }
        },
        //退出登录
        Logout(state){
          state.nowUser = []
          state.nowLogin = []
          console.log(state.nowLogin,state.nowUser)
        },
        getHotBook5(state,val){
          state.BookTop5 = val.data
        },
        getHotReader3(state,val){
          state.ReaderTop3 = val.data
        },
        getHotCategory3(state,val){
          state.CategoryTop3 = val.data
        },
        change(state,val){
           state.nowUser = val
        }
    },
    actions:{
      // 获取所有图书列表
        getBookList(context){
        axios({
          method:'GET',
          url:'http://localhost:8081/test1_war_exploded/bookSelectAllServlet',
        }).then((data) => {
          // console.log("所有列表",data)
          context.commit("getBookList",data)
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
    SelectByBookName(context,params){
      axios({
        method:'POST',
        url:'http://localhost:8081/test1_war_exploded/bookServlet',
        params:params
      }).then((data) => {
        console.log(data)
        context.commit('SelectBy',data)
      })
    },
    //根据书籍id查询
    SelectByBookId(context,params){
      axios({
        method:'POST',
        url:'http://localhost:8081/test1_war_exploded/bookServlet',
        params:params
      }).then((data) => {
        console.log(data)
        context.commit('SelectBy',data)
      })
    },
    //根据书籍作者查询
    SelectByBookAuthor(context,params){
      axios({
        method:'POST',
        url:'http://localhost:8081/test1_war_exploded/bookServlet',
        params:params
      }).then((data) => {
        console.log(data)
        context.commit('SelectBy',data)
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