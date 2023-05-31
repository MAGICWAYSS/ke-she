<template>
  <div >
    <Navi/>
    <el-tabs v-model="activeName" tab-position="left" style="width: 80%;margin: 0 auto">
      <el-tab-pane label="重置资料" name="second"><el-card style="width: 80%;float: left">
        <el-form label-width="80px" size="small">
          <el-upload
              class="avatar-uploader"
              :action="baseURL+'/product-img/upload/'+username"
              :show-file-list="false"
          >
            <img  :src="require(`../img/${form.userImg}`)" style="width: 100px"></img>
          </el-upload>


          <el-form-item label="用户名">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="reset">重 置</el-button>
          </el-form-item>
        </el-form>
      </el-card></el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import {baseURL} from "./urlConfig";
import axios from "axios";

export default {
  name: "ChangeInfo",
  data() {
    return {
      baseURL: baseURL,
      msg:"",
      form:{},
      img: localStorage.getItem("img") ,
      username: localStorage.getItem("username"),
      activeName: 'second',
      userAddr:[],
      userId:localStorage.getItem("userId"),
    }
  },
  created() {
    // 请求分页查询数据
    this.load()
  },
  methods: {
    load() {
      axios.get(baseURL+"/user/one/"+localStorage.getItem("username")
      ).then(res => {
        this.form=res.data
      })
      axios.get(baseURL+"/user-addr/addr/"+this.userId).then(
          res=>{this.userAddr=res.data})
    },
    childclick(item){
      this.userAddr=item
      this.load()
    },
    reset() {
      axios.post(baseURL+"/user", this.form).then(res => {
        if (res.data) {
          this.$message.success("修改成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("修改失败")
        }
      })
    }
  }
}
</script>

<style>
.avatar-uploader {
  text-align: center;
  padding-bottom: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
</style>
