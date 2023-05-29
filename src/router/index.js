import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Index from "@/views/Index";
import Product from "@/views/Product";
import ShopCart from "@/views/ShopCart";
import Order from "../views/Order";
import PaySuccess from "../views/PaySuccess";
import orderList from "../views/OrderList";
import orderDetail from "../views/OrderDetail";
import Remark from "../views/Remark";
import Search from "../views/Search";
import history from "../views/History";
import Pay from "../views/Pay";
import AddProduct from "../views/AddProduct";
/** 后台管理系统路由 */
import Home from '@/views/pages/Home.vue'
import BookInfo from '@/views/pages/BookInfo.vue'
import BookManager from '@/views/pages/BookManager.vue'
import BookCategory from '@/views/pages/BookCategory.vue'
import SystemManager from '@/views/pages/SystemManager.vue'
import SystenNotice from '@/views/pages/SystenNotice.vue'
import Main from '@/views/pages/Main.vue'
import ReaderManager from '@/views/pages/ReaderManager.vue'
import ReaderInfo from '@/views/pages/ReaderInfo.vue'
import ReaderBorrow from '@/views/pages/ReaderBorrow.vue'
//获取原型对象上的push函数
/*const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}*/
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index
  },
    //独立路由，非子路由
  {
    path: '/login',
    name:'Login',
    component:Login
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/person',
    name: 'FrontPerson',
    component: () => import('../views/Person.vue')
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/paySuccess',
    name:'PaySuccess',
    component: PaySuccess
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: orderList
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: orderDetail
  },
  {
    path: '/remark',
    name: 'Remark',
    component: Remark
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path:'/history',
    name:'History',
    component: history
  },
  {
    path: '/pay',
    name:'Pay',
    component: Pay
  },
  {
    path: '/addProduct',
    name:'AddProduct',
    component: AddProduct
  },
  /** 用户路由 */
  {
    path:'/',
    name:'main',
    redirect:'/home',
    component:Main,
    children:[
        {
            path:'home',
            name:'home',
            component:Home
        },
        {
            path:'bookManager',
            name:'bookManager',
            component:BookManager
        },
        {
            path:'bookInfo',
            name:'bookInfo',
            component:BookInfo
        },
        {
            path:'bookCategory',
            name:'bookCategory',
            component:BookCategory
        },
        {
            path:'systemManager',
            name:'systemManager',
            component:SystemManager
        },
        {
            path:'systenNotice',
            name:'systenNotice',
            component:SystenNotice
        },
        {
            path:'/readerManager',
            name:'readerManager',
            component:ReaderManager
        },
        {
            path:'/readerInfo',
            name:'readerInfo',
            component:ReaderInfo
        },
        {
            path:'/readerBorrow',
            name:'readerBorrow',
            component:ReaderBorrow
        },
    ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
