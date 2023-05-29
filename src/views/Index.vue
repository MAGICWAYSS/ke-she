<template>
<div>
  <Navi></Navi>
  <el-row style="width: 80%;margin: 0 auto;padding: 10px">
    <el-col :span="4">
      <Category></Category>
    </el-col>
    <el-col :span="16">
      <Banner></Banner>
    </el-col>
  </el-row>
  <Recommend></Recommend>
  <CategoryRecommend></CategoryRecommend>
</div>
</template>
<script>
import Category from "@/components/Category";
import Banner from "@/components/Banner";
import Recommend from "@/components/Recommend";
import CategoryRecommend from "@/components/CategoryRecommend";
import Navi from "../components/Navi";

export default {
  name:"Index",
  components:{
    Navi,
    Category,
    Banner,
    Recommend,
    CategoryRecommend
  }
}
</script>

<style scoped>

</style>