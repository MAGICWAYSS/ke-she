<template>
<div>
  <div v-for="(item,ind) in commentInfo">

  <el-row>
    <span style="float: left">{{item.commContent}}</span>
    <el-row>
      <el-col v-for="value in commentImg[ind]">
        <el-image v-for="v in value" :src="require(`../img/${v}`)" style="width: 50px;float: left;margin: 5px"
                  :preview-src-list="['http://localhost:9090/img/'+v]"></el-image>
      </el-col>
    </el-row>
    <el-row style="margin: 5px">
      <span style="float: left;font-size: 14px;color: rgb(176,176,176);margin-top: 10px ">{{item.sepcTime.substring(0,19)}}</span>
      <el-link :href="'product'+item.productId">
      <span style="font-size: 14px;margin-top: 10px;float: left;margin-left: 15px">{{item.productName}}</span>
      </el-link>
    </el-row>
    <el-row v-if="item.replyContent!=null" style="border: 2px dotted rgb(176,176,176)">
      <el-row>
        <span style="float: left;font-size: 14px;color: rgb(176,176,176);margin-top: 10px ">【追加评价】</span>
        <span style="float: left;margin-top: 10px">{{item.replyContent}}</span>
      </el-row>
      <el-row>
        <span style="float: left;font-size: 14px;color: rgb(176,176,176);margin-top: 10px ">{{item.sepcName.substring(0,19)}}</span>
      </el-row>
    </el-row>
  </el-row>
  <el-divider></el-divider>

  </div>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
  </el-pagination>
</div>
</template>

<script>
import axios from "axios";
import {baseURL} from "../../public/urlConfig";

export default {
  name: "CommentList",
  data(){
    return{
      pageSize:5,
      pageNum:1,
      total:0,
      commentInfo:[],
      commentImg:[],
      userId:localStorage.getItem("userId"),
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      axios.get(baseURL+"/product-comments/user/"+this.userId,{
        params: {
          current: this.pageNum,
          size: this.pageSize,}
      }).then(
          res=>{
            this.commentInfo=res.data.records
            this.total=res.data.total
            for(let i=0;i<this.total;i++){
              this.commentImg[i]=eval("("+res.data.records[i].commImgs+")")
            }

          }
      )
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },}
}
</script>

<style scoped>

</style>