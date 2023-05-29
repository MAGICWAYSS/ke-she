<template>
  <div>
    <!-- 搜索图书 -->
    <div class="search" style="display:flex;justify-content:space-around">
      <el-select placeholder="请选择图书类别" v-model="seacher.id" size="medium">
      <el-option 
        v-for="(item,index) in bookCategory" 
        :key="index" 
        :label="item.name" 
        :value="item.id" 
        @click.native="handleSelectTeam(item)"
        >
      </el-option>
    </el-select>
    <el-input 
      placeholder="请输入图书名称"
      size="medium"
      style="width:220px;padding:0 12px"
      v-model="search.searchBookName"></el-input>
      <el-input 
      placeholder="请输入图书编号"
      size="medium"
      style="width:220px;padding:0 12px"
      v-model="search.searchBookNum"></el-input>
    <el-input 
      placeholder="请输入读者学号"
      size="medium"
      style="width:220px;padding:0 12px"
      v-model="search.searchUserNum"></el-input>
    <el-input 
      placeholder="请输入读者姓名"
      size="medium"
      style="width:220px;padding-right:12px"
      v-model="search.searchUserName"></el-input>
    <el-button icon="el-icon-search" size="mini" type="primary" @click="selectBy(search)">搜索</el-button>
    </div>
   <!-- 图书情况 -->
    <div class="borrow">
      <el-table
    :data="borrowInfo"
    stripe
    style="width: 100%;margin-top:20px"
    :border="true"
    :cell-style="{padding:'9px 0'}"
    >
    <el-table-column
      prop="bookName"
      label="图书名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="bookCategory"
      label="图书分类"
      align="center">
    </el-table-column>
    <el-table-column
      prop="bookId"
      label="图书编号"
      align="center">
    </el-table-column>
    <el-table-column
      prop="readerNumber"
      label="读者学号"
      align="center">
    </el-table-column>
    <el-table-column
      prop="readerName"
      label="读者姓名"
      align="center">
    </el-table-column>
    <el-table-column
      prop="readerTele"
      label="读者电话"
      align="center">
    </el-table-column>
    <el-table-column
      prop="borrowTime"
      label="借阅时间"
      align="center">
    </el-table-column>
    <el-table-column
      prop="returnTime"
      label="归还时间"
      align="center">
    </el-table-column>
      <el-table-column
      prop="address"
      label="操作"
      align="center"
      width="130px">
      <template slot-scope="scope">
      <el-button type="primary" size="mini" @click="returnBook(scope.row.bookId,scope.row.readerNumber)">归还</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
    <!-- 底部 -->
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name:'ReaderBorrow',
    data(){
      return{
        seacher:{
        id:''
      },
      //图书名称搜索
      search:{
        searchBookName:'',
        searchBookNum:'',
        searchUserNum:'',
        searchUserName:'',
      },
      dialogTableVisible:false,
      isNone:false
      }
    },
    methods:{
      ...mapActions('borrowInfo',{
        getBorrowInfo:'getBorrowInfo',
        retruBorrowBack:'retruBorrowBack',
        selectByReaderId:'selectByReaderId',
        selectByReaderName:'selectByReaderName',
        selectByBookId:'selectByBookId',
        selectByBookName:'selectByBookName'
      }),
    handleSelectTeam(item){
      console.log(item.id)
    },
    //获取所有借阅信息
    getAllBorrowInfo(){
      this.getBorrowInfo()
    },
    //还书
    returnBook(val1,val2){
      console.log(val1,val2)
      var params = {
        bookId:val1,
        readerId:val2
      }
      this.retruBorrowBack(params)
    },
    selectBy(item){
      if(item.searchBookName !== "" && item.searchBookNum === "" && item.searchUserNum === "" && item.searchUserName === ""){
        var params = {
          'option':'byBookName',
          'data':item.searchBookName
        }
        console.log(params)
        this.selectByBookName(params)
      }
      //根据id查询
      else if(item.searchBookName === "" && item.searchBookNum !== "" && item.searchUserNum === "" && item.searchUserName === ""){
        var params = {
        'option':'byBookId',
        'data':item.searchBookNum
        }
        console.log(params)
        this.selectByBookId(params)
      }
      else if(item.searchBookName === "" && item.searchBookNum === "" && item.searchUserNum !== "" && item.searchUserName === ""){
        var params = {
        'option':'byReaderId',
        'data':item.searchUserNum
        }
        this.selectByReaderId(params)
      }
      else if(item.searchBookName === "" && item.searchBookNum === "" && item.searchUserNum === "" && item.searchUserName !== ""){
         var params = {
          'option':'byReaderName',
          'data':item.searchUserName
        }
         this.selectByReaderName(params)
      }
    },
  },
    computed:{
    ...mapState({
      bookCategory:state => state.category.bookCategory,
      borrowInfo:state => state.borrowInfo.borrowInfo
    })
  },
  created(){
    this.getAllBorrowInfo()
  }

}
</script>

<style lang="less">
body,html{
  height:100%;
}
.footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top:20px;
  .cart{
  i{
    font-size:40px;
  }
}
.cart-inside{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top:14px;
  }
}

</style>