<template>
  <div>
    <el-select placeholder="请选择商品类别" 
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
    <el-button icon="el-icon-search" size="mini">搜索</el-button>
    <el-input 
      placeholder="请输入名称"
      size="medium"
      style="width:230px;padding:0 12px"
      v-model="searchName.name"
      @blur="getProductList"></el-input>
    <el-button icon="el-icon-search" size="mini" @click="selectByName">搜索</el-button>
    <el-input 
      placeholder="请输入商品ID"
      size="medium"
      style="width:230px;padding-right:12px"
      v-model="searchId.id"
      @blur="getProductList"></el-input>
    <el-button icon="el-icon-search" size="mini" @click="selectById">搜索</el-button>
    <el-button type="primary" icon="el-icon-plus" size="mini" @click="addBook">新增</el-button>
    <!-- 添加图书信息 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品编号" prop="bookId" >
        <el-input v-model="form.bookId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="bookName">
        <el-input v-model="form.bookName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="bookCategory">
        <el-input v-model="form.bookCategory" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品销量" prop="bookself">
        <el-input v-model="form.bookself" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品内容" prop="bookAuthor">
        <el-input v-model="form.bookAuthor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="bookState">
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
    :data="list"
    stripe
    style="width: 100%;margin-top:20px"
    :border="true">
    <el-table-column
      prop="productId"
      label="商品编号"
      align="center">
    </el-table-column>
    <el-table-column
      prop="productName"
      label="商品名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="soldNum"
      label="商品销量"
      align="center">
    </el-table-column>
    <el-table-column
      prop="content"
      label="商品内容"
      align="center">
    </el-table-column>
      <el-table-column
      prop="productStatus"
      label="商品状态"
      align="center">
    </el-table-column>
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
      searchId:{
        id:null
      },
      searchName:{
        name:null
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
      },
      list:[]
    }
  },
  methods:{
    //获取booklist中的数据
    ...mapActions('productList',
    { getProductList:'getProductList',
      deleteBook:'deleteBook',
      ByProductName:'ByProductName',
      ByProductId:'ByProductId',
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
    //根据id查询
    selectById(){
        this.ByProductId(this.searchId)
        this.list = []
        this.list.push(this.selectedProductList)
    },
    //根据name查询
    selectByName(){
      this.ByProductName(this.searchName)
      this.list = []
      this.list = this.selectedProductList
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
    },
    getAllProductList(){
      this.getProductList()
      this.list = this.productList
    }
      
  },
  computed:{
    ...mapState({
      // bookList:state => state.booklist.bookList,
      // bookCategory:state => state.category.bookCategory,
      // selectedProductList:state => state.productList.selectedProductList
    }),
    //所有图书列表
    productList:{
      get(){
        return this.$store.state.productList.productList
      },
      set(val){
        
      }
    },
    selectedProductList:{
    get(){
      return this.$store.state.productList.selectedProductList
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
    this.getAllProductList()
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