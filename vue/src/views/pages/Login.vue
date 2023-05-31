<template>
    <div>
  <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
     <h3 class="loginTitle">
       用户登录
     </h3>
      <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" >
          </el-input>
      </el-form-item>
      <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" >
          </el-input>
      </el-form-item>
      <!-- <el-form-item prop="code">
          <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width: 250px;margin-right: 5px">
          </el-input>
          <img :src="captchaUrl">
      </el-form-item> -->
      <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
  </el-form>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Cookie from 'js-cookie'
export default {
  name: "Login",
    data(){
      return{
          captchaUrl: "",
          loginForm:{
              username:"",
              password:"",
          },
          checked: true,
          rules:{
              username:[{required:true,message:"请输入用户名",trigger:"blur"},{ min: 5, max: 14, message: '长度在 5 到 14 个字符', trigger: 'blur' }
              ],
              password:[{required:true,message:"请输入密码",trigger:"blur"},,{ min: 6,  message: '密码长度要大于6', trigger: 'blur' }],
          }

      }
  },
    methods:{
      ...mapActions('booklist',{
          Login:'Login'
      }),
      submitLogin(){
          var params = {
              'username':this.loginForm.username,
              'password':this.loginForm.password
          }
          this.Login(params)
          console.log("##",this.nowUser)
          if(this.nowLogin.username === ''){
              console.log(this.nowLogin)
              this.$confirm(('密码或者用户名错误'),
          {customClass: 'message-logout',
           cancelButtonClass: 'btn-custom'})
          .then(_ => {
            done();
          })
          .catch(_ => {});
          }
          if(this.nowLogin.username !== ''){
              //设置cookie
              console.log("$$",this.nowUser)
              //用户
              if(this.nowUser.isManager === "0"){
                  console.log("oooo")
                  this.$router.push("/findBook")
                  Cookie.set('nowLogin',JSON.stringify(this.nowLogin))
                  Cookie.set('nowUser',JSON.stringify(this.nowUser))
              }
              if(this.nowUser.isManager === "1"){
                  this.$router.push("/home")
                  Cookie.set('nowLogin',JSON.stringify(this.nowLogin))
                  Cookie.set('nowUser',JSON.stringify(this.nowUser))
              }
              
          }
        
      }
    },
    computed:{
        ...mapState({
             nowLogin:state => state.booklist.nowLogin,
             nowUser:state => state.booklist.nowUser
        })
    },
    mounted(){
        console.log(this.nowUser)
    }
};
</script>

<style lang="less" scoped>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: aliceblue;
        box-shadow: 0 0 8px rgb(143, 141, 141);
    }
    .loginTitle{
        margin: 0px auto 20px auto;
        text-align: center;
        font-size: 20px;
    }
    .loginRemember{
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
</style>

