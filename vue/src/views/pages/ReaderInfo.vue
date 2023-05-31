<template>
  <div>
     <div class="search">
    <el-input 
      placeholder="请输入读者学号"
      size="medium"
      style="width:220px;padding:0 12px"
      v-model="searchBy.searchUserId"></el-input>
    <el-input 
      placeholder="请输入读者姓名"
      size="medium"
      style="width:220px;padding-right:12px"
      v-model="searchBy.searchUserName"></el-input>
      <el-input 
      placeholder="请输入电话号码"
      size="medium"
      style="width:220px;padding:0 12px"
      v-model="searchBy.searchUserTele"></el-input>
    <el-button icon="el-icon-search" size="mini" type="primary" @click="selectBy(searchBy)">搜索</el-button>
    </div>
    <!-- 读者列表 -->
     <el-table
      :data="readerList"
      style="width: 100%">
      <el-table-column
        prop="readerName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="readerNumber"
        label="学号">
      </el-table-column>
      <el-table-column
        prop="readerClass"
        label="班级">
      </el-table-column>
      <el-table-column
        prop="readerId"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="readerTele"
        label="电话号码">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" size="mini" >编辑</el-button>
            <el-button type="danger" size="mini" @click="deteled(scope.row.readerId)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name:'ReaderInfo',
  data(){
    return{
      searchBy:{
        searchUserId:'',
        searchUserName:'',
        searchUserTele:''
      }
    }
  },
  computed:{
    ...mapState({
      readerList:state => state.readerlist.readerList,
      selectReaderList:state => state.readerlist.selectReaderList,
    })
  },
  methods:{
    ...mapActions('readerlist',{
      getReaderList:'getReaderList',
      SelectByReaderName:'SelectByReaderName',
      SelectByReaderId:'SelectByReaderId',
      SelectByReaderTele:'SelectByReaderTele',
      deleteReader:'deleteReader'
    }),
    //获取所有
    getAllReaderList(){
      this.getReaderList()
    },
    selectBy(item){
       if(item.searchUserId !== "" && item.searchUserName === "" && item.searchUserTele === ""){
        var params = {
          'option':'byReaderNumber',
          'data':item.searchUserId
        }
        console.log(item)
        this.SelectByReaderName(params)
      }
      else if(item.searchUserId === "" && item.searchUserName !== "" && item.searchUserTele === ""){
        var params = {
          'option':'byReaderName',
          'data':item.searchUserName
        }
        // console.log(params)
        this.SelectByReaderId(params)
      }
      else if(item.searchUserId === "" && item.searchUserName === "" && item.searchUserTele !== ""){
        var params = {
          'option':'byReaderTele',
          'data':item.searchUserTele
        }
        this.SelectByReaderTele(params)
      }
    },
    deteled(item){
      var params = {
        option:'delete',
        data:item
      }
      this.deleteReader(params)
    }
  },
  created(){
    this.getAllReaderList()
  }
}
</script>

<style>

</style>