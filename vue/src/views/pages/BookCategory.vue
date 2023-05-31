<template>
  <div>
    <el-input 
    placeholder="请输入内容"
    size="medium"
    style="width:230px;padding-right:12px"
    v-model="search"></el-input>
    <el-button icon="el-icon-search" size="mini" @click="searchBy">搜索</el-button>
    <el-button type="primary" icon="el-icon-plus" size="mini">新增</el-button>
    <!-- 分类列表 -->
    <el-table
    :data="categoryList"
    stripe
    style="width: 100%;margin-top:20px"
    :border="true">
    <el-table-column
      prop="categoryName"
      label="分类名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="categoryId"
      label="分类编号"
      align="center">
    </el-table-column>
    <template>
      <el-table-column
      prop="address"
      label="操作"
      align="center"
      width="150px">
      <template slot-scope="scope">
        <div>
          <el-button type="primary" icon="el-icon-link" size="mini" ></el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleted(scope.row.categoryId)"></el-button>
        </div>
      </template>
    </el-table-column>
    </template>
  </el-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name:'BookCategory',
  data(){
    return{
      search:''
    }
  },
  computed:{
    ...mapState({
      categoryList:state => state.category.categoryList
    })
  },
  methods:{
    ...mapActions('category',{
      getCategoryList:'getCategoryList',
      deleteCategory:'deleteCategory',
      SelectByCategoryName:'SelectByCategoryName'
    }),
    deleted(item){
      console.log(item)
      var params = {
        option:'delete',
        data:item
      }
      this.deleteCategory(params)
    },
    searchBy(){
      // console.log(this.search)
      if(this.search !== ""){
        var params = {
        option:'byName',
        data:this.search
      }
      console.log(params)
      this.SelectByCategoryName(params)
      }
      if(this.search === ""){
        this.getCategoryList()
      }
      
    }
  },
  created(){
    this.getCategoryList()
  }
}
</script>

<style lang="less">
</style>