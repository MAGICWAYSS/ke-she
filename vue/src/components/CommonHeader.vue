<template>
<div class="header-content">
    <div class="l-content">
        <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
        style="margin-right:20px"
      ></el-button>
    </div>
    <div class="r-content">
        <el-dropdown v-if="this.nowUser.length !== 0">
            <span class="el-dropdown-link">
                <p>{{this.nowUser.readerName}}</p>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <i class="el-icon-s-custom" style="font-size:25px;color:#fff" v-if="this.nowUser.length === 0"></i>
    </div>
</div>
</template>

<script>
import {mapState , mapMutations} from 'vuex'
import Cookie from 'js-cookie'
export default {
    name:'CommonHeader',
    data(){
        return{}
    },
    methods:{
        ...mapMutations('booklist',{
            Logout:'Logout'
        }),
        handleMenu(){
            this.$store.commit("collapseMenu");
        },
        logout(){
            Cookie.remove("nowLogin")
            Cookie.remove("nowUser") 
            this.Logout()
        }
    },
    computed:{
        ...mapState({
         nowUser:state => state.booklist.nowUser
      }),
    }
}
</script>

<style lang="less">
.header-content{
    display: flex;
    background-color: #333;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .l-content{
        display: flex;
        align-items: center;
    }
}
</style>