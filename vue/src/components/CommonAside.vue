<template>
<el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="border-right:0"
  >
    <!-- 判断是否显示通用后台管理 -->
    <h3>{{ !isCollapse ? "后台管理系统" : "" }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.name"
      :index="item.name"
      @click="clickMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.label"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="item2 in item.children" :key="item2.path">
        <el-menu-item @click="clickMenu(item2)" :index="item2.path">{{
          item2.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
    name:'CommonAside',
    data() {
      return {
        menuData:[
        {
          path: '/bookManager',
          name: 'bookManager',
          label: '商品管理',
          icon: 's-management',
          url: 'bookManager/bookManager',
          children:[
            {
              path: '/bookCategory',
              name: 'bookCategory',
              label: '商品分类',
              url: 'bookManager/bookCategory',
            },
            {
              path: '/bookInfo',
              name: 'bookInfo',
              label: '商品列表',
              url: 'bookManager/bookInfo',
            }
          ]
        },
        {
          path:'/readerManager',
          name:'readerManager',
          label: '用户管理',
          icon: 'service',
          children: [
            {
              path: '/readerInfo',
              name: 'readerInfo',
              label: '用户信息',
              url: 'readerManager/readerInfo'
            },
            {
              path: '/readerBorrow',
              name: 'readerBorrow',
              label: '订单信息',
              url: 'readerManager/readerBorrow'
            },
          ]
        },
        ]
      }
    },
    computed:{
        //没有子菜单
        noChildren(item){
            return this.menuData.filter((item) => !item.children)
        },
        //有子菜单
        hasChildren(item){
            return this.menuData.filter((item) => item.children)
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        }
    },
    methods:{
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
    },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
    },
        clickMenu(item){
            this.$router.push(item.path)
        }
    },
    mounted(){
      // console.log(this.menuData)
    }
}
</script>

<style lang="less" scope>
body,html{
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100vh;
  }
.el-menu{
 border-right: none;
 height: 100vh;
 h3{
    color: #fff;
    text-align: center;
    font-weight: normal;
    font-size: 18px;
}
}
ul.el-menu.el-menu--inline {
    height: 100%;
}
</style>