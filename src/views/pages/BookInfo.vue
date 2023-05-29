<template>
  <div>
    <el-select placeholder="请选择图书类别" 
    v-model="seacher.id" 
    size="medium">
      <el-option value='' @click.native="hanleSelectAll">全部</el-option>
      <el-option 
        v-for="(item,index) in categoryList" 
        :key="index" 
        :label="item.categoryName" 
        :value="item.categoryId" 
        @click.native="handleSelectTeam(item)"
        >
      </el-option>
    </el-select>
    <el-input 
      placeholder="请输入名称"
      size="medium"
      style="width:230px;padding:0 12px"
      v-model="seacherBy.searchName"
      @blur="getAllBookList"></el-input>
    <el-input 
      placeholder="请输入书籍ID"
      size="medium"
      style="width:230px;padding-right:12px"
      v-model="seacherBy.searchBookId"
      @blur="getAllBookList"></el-input>
    <el-input 
      placeholder="请输入作者"
      size="medium"
      style="width:230px;padding-right:12px"
      v-model="seacherBy.searchAuthor"
      @blur="getAllBookList"></el-input>
    <el-button icon="el-icon-search" size="mini" @click="selectBy(seacherBy)">搜索</el-button>
    <el-button type="primary" icon="el-icon-plus" size="mini" @click="addBook">新增</el-button>
    <!-- 添加图书信息 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="图书编号" prop="bookId" >
        <el-input v-model="form.bookId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图书名称" prop="bookName">
        <el-input v-model="form.bookName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图书分类" prop="bookCategory">
        <el-input v-model="form.bookCategory" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书架号" prop="bookself">
        <el-input v-model="form.bookself" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图书作者" prop="bookAuthor">
        <el-input v-model="form.bookAuthor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图书出版社" prop="bookPublisher">
        <el-input v-model="form.bookPublisher" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图书数量" prop="bookNumber">
        <el-input v-model="form.bookNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图书简介" prop="bookSummary">
        <el-input v-model="form.bookSummary" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="借阅数" prop="bookBorrowed">
        <el-input v-model="form.bookBorrowed" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图书状态" prop="bookState">
        <el-select v-model="form.bookState">
        <el-option label="空闲" value="0"></el-option>
        <el-option label="借阅" value="1"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="图书情况" prop="isDeleted">
        <el-select v-model="form.isDeleted">
        <el-option label="未删除" value="0"></el-option>
        <el-option label="删除" value="1"></el-option>
        </el-select>
      </el-form-item>
      </el-form>
      <el-button @click="submit">提交</el-button>
    </el-dialog>
    <el-table
    :data="bookList"
    stripe
    style="width: 100%;margin-top:20px"
    :border="true">
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
      prop="bookself"
      label="书架号"
      align="center">
    </el-table-column>
    <el-table-column
      prop="bookAuthor"
      label="作者"
      align="center">
    </el-table-column>
    <el-table-column
      prop="bookPublisher"
      label="出版社"
      align="center">
    </el-table-column>
    <el-table-column
      prop="bookNumber"
      label="库存"
      align="center">
    </el-table-column>
      <el-table-column
      prop="address"
      label="操作"
      align="center"
      width="130px">
      <template slot-scope="scope">
      <!-- 修改信息 -->
      <el-button type="primary" icon="el-icon-link" size="mini" ></el-button>
      <!-- 删除 -->
      <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleted(scope.row.bookId)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
import {mapMutations} from 'vuex'
import axios from 'axios'
export default {
  name:'BookInfo',
  data(){
    return{
      //图书类别
      seacher:{
       name:''
      },
      seacherBy:{
      //图书名称搜索
      searchName:'',
      searchBookId:'',
      searchAuthor:''
      },
      dialogFormVisible:false,
      form:{
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
        bookState:'',
        isDeleted:''
      }
    }
  },
  methods:{
    //获取booklist中的数据
    ...mapActions('booklist',
    { getBookList:'getBookList',
      deleteBook:'deleteBook',
      SelectByBookName:'SelectByBookName',
      SelectByBookId:'SelectByBookId',
      SelectByBookAuthor:'SelectByBookAuthor',
      SelectByBookCategory:'SelectByBookCategory',
      AddBook:'AddBook'
    }),
    //获取category中的数据
    ...mapActions('category',
    {
      getCategoryList:'getCategoryList'
    }),
    hanleSelectAll(){
      // console.log('选中了全部')
      this.getAllBookList()
    },
     //选择图书类别
    //根据图书类别查询
    handleSelectTeam(item){
      console.log(item)
      var params = {
        option:'byCategoryName',
        'data':item.categoryName
      }
      this.SelectByBookCategory(params)
    },
    getAllBookList(){
      console.log('获取所有数据',this.bookList)
      this.getBookList()
    },
    //根据书名查询
    selectBy(item){
      if(item.searchName !== "" && item.searchBookId === "" && item.searchAuthor === ""){
        var params = {
          'option':'byName',
          'data':item.searchName
        }
        this.SelectByBookName(params)
      }
      //根据id查询
      else if(item.searchName === "" && item.searchBookId !== "" && item.searchAuthor === ""){
        var params = {
        'option':'byId',
        'data':item.searchBookId
        }
        console.log(params)
        this.SelectByBookId(params)
      }
      else{
        var params = {
        'option':'byAuthor',
        'data':item.searchAuthor
        }
        this.SelectByBookAuthor(params)
      }
      if(item.searchName === "" && item.searchBookId === "" && item.searchAuthor === ""){
         this.getAllBookList()
      }
    },
    //增加图书
    addBook(){
      this.dialogFormVisible = true
    },
    //删除
    deleted(bookId){
      var params={
        'option':'delete',
        'data':bookId
      }
      this.deleteBook(params)
      // console.log(param)
    }, 
    //获取所有图书分类
    getAllCategoryList(){
      this.getCategoryList()
      // console.log('获取所有图书分类',this.categoryList)
    },
    //提交表单数据
    submit(){
      var params = {
        'option':'add',
        'bookAuthor':this.form.bookAuthor,
        'bookBorrowed':this.form.bookBorrowed,
        'bookCategory':this.form.bookCategory,
        'bookId':this.form.bookId,
        'bookName':this.form.bookName,
        'bookNumber':this.form.bookNumber,
        'bookPublisher':this.form.bookPublisher,
        'bookState':this.form.bookState,
        'bookSummary':this.form.bookSummary,
        'bookself':this.form.bookself,
        'isDeleted':this.form.isDeleted
      }
      // console.log(params)
      this.AddBook(params)
      this.dialogFormVisible = false
      this.$nextTick(()=>{
      this.form.bookAuthor = '',
      this.form.bookBorrowed = '',
      this.form.bookCategory = '',
      this.form.bookId = '',
      this.form.bookNumber = '',
      this.form.bookName = '',
      this.form.bookPublisher = '',
      this.form.bookState = '',
      this.form.bookSummary = '',
      this.form.bookself = '',
      this.form.isDeleted = ''
    })
      this.getAllBookList()
    }
      
  },
  computed:{
    ...mapState({
      // bookList:state => state.booklist.bookList,
      // bookCategory:state => state.category.bookCategory,
      selectedBookList:state => state.booklist.selectedBookList
    }),
    //所有图书列表
    bookList:{
      get(){
        return this.$store.state.booklist.bookList
      },
      set(val){
      }
    },
    categoryList:{
      get(){
        // console.log('get进来了')
        return this.$store.state.category.categoryList
      },
      set(val){

      }
    }
  },
  created(){
    // 获取图书列表
    this.getAllBookList()
    //获取图书分类列表
    this.getAllCategoryList()
  }
   
}
</script>

<style lang="less">
.el-form-item--feedback {
  .el-input__validateIcon {
    display: none;
  }
}
.el-table{
  .cell{
    font-size:13px;
  }
}

</style>