import axios from 'axios'
export default{
    namespaced:true,
    state:{
      readerList:[
          {
              readerName:'',
              readerNumber:'',
              readerClass:'',
              readerId:'',
              readerTele:''
          }
      ],
      //查询到的
      selectReaderList:[
        {
            readerName:'',
            readerNumber:'',
            readerClass:'',
            readerId:'',
            readerTele:''
        }
    ]
    },
    mutations:{
        getReaderList(state,val){
            // console.log("mutations",val)
            state.readerList = val.data
            console.log("readerList",state.readerList)
          },
          SelectBy(state,val){
            state.selectReaderList = val.data
            state.readerList = state.selectReaderList
            console.log("selectReaderList",state.selectReaderList)
         },
        
    },
    actions:{
        getReaderList(context){
            axios({
              method:'GET',
              url:'http://localhost:8081/test1_war_exploded/SelectAllReaderServlet',
            }).then((data) => {
              console.log("所有列表",data)
              context.commit("getReaderList",data)
            })
        },
        //根据读者名称查询
        SelectByReaderName(context,params){
            axios({
            method:'POST',
            url:'http://localhost:8081/test1_war_exploded/SelectReaderServlet',
            params:params
            }).then((data) => {
            console.log(data)
            context.commit('SelectBy',data)
            })
        },
        //根据读者id查询
        SelectByReaderId(context,params){
            axios({
            method:'POST',
            url:'http://localhost:8081/test1_war_exploded/SelectReaderServlet',
            params:params
            }).then((data) => {
            console.log(data)
            context.commit('SelectBy',data)
            })
        },
        //根据读者电话查询
        SelectByReaderTele(context,params){
            axios({
            method:'POST',
            url:'http://localhost:8081/test1_war_exploded/SelectReaderServlet',
            params:params
            }).then((data) => {
            console.log(data)
            context.commit('SelectBy',data)
            })
        },
        deleteReader(context,params){
            axios({
              method:'POST',
              url:'http://localhost:8081/test1_war_exploded/SelectReaderServlet',
              params:params
            }).then(() => {
              console.log(params)
              context.dispatch('getReaderList')
            })
          },
    }
    
}