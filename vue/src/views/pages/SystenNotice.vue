<template>
  <div>
     <el-table
    :data="reports"
    stripe
    style="width: 100%;margin-top:20px"
    :border="true">
    <el-table-column
      prop="content"
      label="公告名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="time"
      label="公告时间"
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
      <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleted(scope.row.content)"></el-button>
        </div>
      </template>
    </el-table-column>
    </template>
  </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'SystenNotice',
  data(){
    return{

    }
  },
  methods:{

  },
  computed:{
    ...mapState({
      reports:state => state.report.reports
    })
  },
  mounted(){
    console.log(this.reports)
  }
}
</script>

<style>

</style>