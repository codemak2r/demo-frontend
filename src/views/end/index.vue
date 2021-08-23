<template>
    
    <div class="app-container">
        <el-row style="" type="flex" justify="start" align="start" v-for="(items, index) in groupTableData" :key="index">
            <el-col :span="6" v-for="(o, i) in items" :key="i" :offset="1   "  >
                
                <el-card :body-style="{ padding: '20px'} " >
                    <div class="content">
                        <label for=""> 项目名称：</label>
                        <span>{{ o.name }}</span>
                    </div>
                    <div class="desc" style="margin-top: 10px;">
                        <label for="">项目描述：</label>
                        <p>{{ o.desc }}</p>
                    </div>
                    <div class="operation">
                        <el-button type="text" class="button clearfix" @click="enterCaseDetail(o.id)">点击进入</el-button>
                    </div>
                   
                </el-card>
            </el-col>
            <el-col v-if="index == groupTableData.length-1" :span="6" :offset="1" type="flex" justfy="center" align="center">
                <div style="cursor: pointer;" @click="addProject()">
                    <el-card :body-style="{ padding: '20px'} " >
                        <div type="primary"  class='el-icon-plus'></div>
                     </el-card>
                </div>
                
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
import { getAllProjects } from  '@/api/end'

export default {
    name: 'Project',
    data(){
        return {
            src: 'https://picsum.photos/300/300?random=',
            tableData: {}
        }
    },
    methods:{
        fetchData(){
            getAllProjects().then(res => {
                this.tableData = res.data
                console.log(this.tableData)
            }).catch(err => {
                this.$message({
                    message: 'error',
                    type:'error'
                })
            })
        },
        randomPic(){
            return this.src + Math.floor(Math.random() *1000)
        },
        enterCaseDetail(row){
            console.log(row)
            this.$router.push({name: 'project', params:{projectId: row}})
        },
        addProject(){
            alert(1)
        }

    },
    computed:{
        groupTableData(){
            let newTableData = []
            for(let i=0; i < this.tableData.length; i+=3){
                newTableData.push(this.tableData.slice(i, i+3))
            }
            return newTableData; 
        }
    }, 
    created(){
        this.fetchData()
    }
}
</script>

<style scoped>


.el-row{
    
    padding: 1%;
}

.time {
    font-size: 13px;
    color: #000;
}

.bottom {
    margin-top: 13px;
    
    line-height: 12px;
}

.button {
    padding: 0;
    margin-bottom: 13px;
    float: right;
}

.image {
    width: 100%;
    height:100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>>
 
