<template>
<div>
    <el-container>
        <el-aside width="auto">
            <CommonAside></CommonAside>
        </el-aside>
        <el-container>
            <el-header style="padding:0">
                <CommonHeader></CommonHeader>
            </el-header>
            <el-main> <router-view></router-view></el-main>
        </el-container>
    </el-container>
</div>

</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
export default {
    name:'Main',
    components:{CommonAside,CommonHeader}
}
</script>

<style>
</style>