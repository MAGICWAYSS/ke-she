import axios from 'axios'
export default{
    namespaced:true,
    state:{
       borrowInfo:[
           {
               bookName:'',
               bookCategory:'',
               bookNum:'',
               readerNumber:'',
               readerName:'',
               readerTele:'',
               borrowTime:'',
               returnTime:''
           },
       ],
       //自己的借阅信息
       MyBorrowInfo:[
        {
            bookName:'',
            bookCategory:'',
            bookNum:'',
            readerNumber:'',
            readerName:'',
            readerTele:'',
            borrowTime:'',
            returnTime:''
        }
        ],
        //查询到的借阅信息
        SelectBorrowInfo:[
          {
          }
          ],

    },
    mutations:{
        getBorrowInfo(state,val){
            // console.log("mutations",val)
            state.borrowInfo = val.data
            // console.log("bookList",state.bookList)
          },
          Select(state,val){
            console.log("val",val)
            state.MyBorrowInfo = val.data
            // state.borrowInfo = state.SelectBorrowInfo
            // console.log("MyBorrowInfo",state.MyBorrowInfo)
         },
         SelectBy(state,val){
          // console.log("进来了",state.SelectBorrowInfo)
          state.SelectBorrowInfo = val.data
          state.borrowInfo = state.SelectBorrowInfo
          // console.log("进来了",state.SelectBorrowInfo)
       },
         
    },
    actions:{
        getBorrowInfo(context){
            axios({
              method:'GET',
              url:'http://localhost:8081/test1_war_exploded/SelectAllBorrowInfoServlet',
            }).then((data) => {
              console.log("所有列表",data)
              context.commit("getBorrowInfo",data)
            })
        },
        retruBorrowBack(context,params){
            // console.log(params)
            axios({
                method:'POST',
                url:'http://localhost:8081/test1_war_exploded/ReaderReturnBookServlet',
                params:params
              }).then((data) => {
                // console.log("",data)
                context.dispatch("getBorrowInfo")
              })
        },
        retruBorrowBack2(context,params){
          // console.log("@",params)
          axios({
              method:'POST',
              url:'http://localhost:8081/test1_war_exploded/ReaderReturnBookServlet',
              params:params
            }).then((data) => {
              // console.log("",data)
              // context.dispatch("selectMyReaderId")
            })
      },
        //获取自己的借书信息
        selectMyReaderId(context,params){
          // console.log("@",params)
          axios({
            method:'POST',
            url:'http://localhost:8081/test1_war_exploded/SelectBorrowByServlet',
            params:params
          }).then((data) => {
            console.log("我的借书",data)
            context.commit('Select',data)
          })
        },
        selectByReaderId(context,params){
          axios({
            method:'POST',
            url:'http://localhost:8081/test1_war_exploded/SelectBorrowByServlet',
            params:params
          }).then((data) => {
            console.log(data)
            context.commit('SelectBy',data)
          })
        },
        selectByReaderName(context,params){
          axios({
            method:'POST',
            url:'http://localhost:8081/test1_war_exploded/SelectBorrowByServlet',
            params:params
          }).then((data) => {
            console.log(data)
            context.commit('SelectBy',data)
          })
        },
        selectByBookId(context,params){
          axios({
            method:'POST',
            url:'http://localhost:8081/test1_war_exploded/SelectBorrowByServlet',
            params:params
          }).then((data) => {
            console.log(data)
            context.commit('SelectBy',data)
          })
        },
        selectByBookName(context,params){
          axios({
            method:'POST',
            url:'http://localhost:8081/test1_war_exploded/SelectBorrowByServlet',
            params:params
          }).then((data) => {
            console.log(data)
            context.commit('SelectBy',data)
          })
        },
    }
    
}