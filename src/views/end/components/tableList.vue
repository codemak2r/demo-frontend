<template>
    <div class="app-container">
        <el-row>
            <el-col>
                <el-button type="primary" size="small" @click="addNewCase" icon="el-icon-document-add">新增</el-button>
                <el-button type="primary" size="small" @click="enableCase()" icon="el-icon-video-play">启用</el-button>
                <el-button type="primary" size="small" @click="disableCase" icon="el-icon-video-pause">禁用</el-button>
                <el-button type="primary" size="small" @click="deleteCase" icon="el-icon-delete">删除</el-button>
                <el-button type="primary" size="small" @click="runCase" icon="el-icon-caret-right">运行</el-button>
            </el-col>
        </el-row>
       
        <el-row>
            <el-col>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange">

                    <el-table-column type="selection"></el-table-column>    
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="desc" label="描述" ></el-table-column>
                    <el-table-column prop="owner" label="维护人" ></el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <div v-if="scope.row.status===0">启用</div>
                            <div v-if="scope.row.status===1">禁用</div>
                        </template>
                    </el-table-column>
                     <el-table-column prop="result" label="执行结果">
                          <template slot-scope="scope">
                            <el-tag v-if="scope.row.result===0">未运行</el-tag>
                            <el-tag type="danger" v-if="scope.row.result===-1">失败</el-tag>
                            <el-tag type="success" v-if="scope.row.result===1">成功</el-tag>
                        </template>
                     </el-table-column>
                    <el-table-column prop="exc_status" label="执行状态"></el-table-column>
                    <el-table-column prop="created_time" label="新建时间"></el-table-column>
                    <el-table-column prop="modified_time" label="修改时间"></el-table-column>
                   

                    <el-table-column
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>

import { getAllCases,  getCase, enableCase} from '@/api/end'


export default {
    name: "TableList",
    data() {
        return {
            tableData:[],
            multipleSelection:[]
        }
    }, 
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        fetchData(){
            getAllCases().then(response => {
               this.tableData = response.data;
            }, error => { 
                console.log(error)
            })
        },
        addNewCase(){
            this.$store.dispatch('end/toggleDialogVisible')
        },
        modifyCase(){
            this.$store.dispatch('end/toggleDialogForUpdateVisible')
        },
        toggleLogs(){
            this.$store.dispatch('end/toggleDialogForLogVisible')
        }, 
        deleteCase(){

        }, 
        enableCase(){
            console.log(this.multipleSelection)
            this.multipleSelection.forEach((item) => {
                enableCase(item.id).then(res => {

                }, err => {})
            })
        },
        disableCase(){},
        runCase(){

        }, 
        handleEdit(row){
            getCase(row.id).then(response => {
                console.log(response)
            }, error => {
                this.$$message({
                    message: '请求失败',
                    type:'error'
                })
            })
        }
    },
    mounted(){
        this.fetchData(); 
        console.log(this.$store);
    }


}
</script>
<style scoped>
.el-row{
    margin-bottom: 1%;
}
</style>