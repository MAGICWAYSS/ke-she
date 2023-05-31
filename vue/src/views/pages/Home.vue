<template>
<div>
  <div class="top-content">
      <el-card style="height:350px;width:400px" id="echarts1"></el-card>
      <el-card style="height:350px;width:400px;" id="echarts2"></el-card>
      <el-card style="height:350px;width:400px;" id="echarts3"></el-card>
  </div>
  <div class="bottom">
    <el-card style="height:200px;width:1000px" class="bottom-content">
      <p>公告</p>
      <div style="margin-top:12px">
        <span>{{this.reports[0].content}}</span>
        <span style="margin-left:400px;font-size:12px;color:grey">{{this.reports[0].time}}</span>
        </div>
    </el-card>
  </div>
</div>
 
</template>

<script>
import echarts from 'echarts'
import { mapActions, mapState } from 'vuex'
export default {
  name:'Home',
  computed:{
    ...mapState({
       BookTop5:state => state.booklist.BookTop5,
       ReaderTop3:state => state.booklist.ReaderTop3,
       CategoryTop3:state => state.booklist.CategoryTop3,
       reports:state => state.report.reports
    })
  },
  methods:{
    ...mapActions('booklist',{
      getHotBook5:'getHotBook5',
      getHotReader3:'getHotReader3',
      getHotCategory3:'getHotCategory3'
    }),
    //热门图书
    drawLine(){
       //柱状图
      let echarts1 = this.$echarts.init(document.getElementById('echarts1'))
      let xAxis1 = []
      let seriesData1 = []
      for(let i = 0;i<this.BookTop5.length;i++){
        xAxis1.push(this.BookTop5[i].bookName)
        seriesData1.push(this.BookTop5[i].bookBorrowed)
      }
      echarts1.setOption({
        title: { text: '热门图书TOP5' },
            tooltip: {},
            xAxis: {
                data: xAxis1
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: seriesData1
            }]
      })
      let echarts2 = this.$echarts.init(document.getElementById('echarts2'))
      let xAxis2 = []
      let seriesData2 = []
      console.log("@",this.ReaderTop3)
      for(let i = 0;i<this.ReaderTop3.length;i++){
        xAxis2.push(this.ReaderTop3[i].readerName)
        seriesData2.push(this.ReaderTop3[i].borrowNumber)
      }
      echarts2.setOption({
        title: {
          text:'热门读者TOP3',
           },
            tooltip: {},
            xAxis: {
                data: xAxis2
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: seriesData2,
                itemStyle:{
                  color:'#48a9c5'
                }
            }]
      })
      let echarts3 = this.$echarts.init(document.getElementById('echarts3'))
      let xAxis3 = []
      let seriesData3 = []
      console.log("@",this.CategoryTop3)
      for(let i = 0;i<this.CategoryTop3.length;i++){
        xAxis3.push(this.CategoryTop3[i].categoryName)
        seriesData3.push(this.CategoryTop3[i].categoryBorrow)
      }
      // console.log("#",xAxis3)
      echarts3.setOption({
        title: { text: '借阅分类排行' },
            tooltip: {},
            xAxis: {
                data: xAxis3
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: seriesData3,
                itemStyle:{
                  color:'#2dde98'
                }
            }]
      })
    }
  },
  mounted(){
    this.getHotBook5()
    this.getHotReader3()
    this.getHotCategory3()
    this.drawLine()
    // console.log("@",this.CategoryTop3)
  }
}
</script>

<style lang="less">
.top-content{
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: space-between;
}
.bottom{
  margin-top:38px;
  .bottom-content{
    margin:0 auto;
  }
}
</style>