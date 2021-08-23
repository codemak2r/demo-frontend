<template>
    <div class="app-container">
        <el-dialog
        :visible.sync="dialogVisible"
        height="100%"
        width="80%"
        :before-close="handleClose"
        append-to-body
        
        center>
       
        
        <el-form ref="form" :model="form" label-width="80px">
            <el-row  :gutter="24">
                <el-col :span="8">
                    <el-form-item label="名称" label-position="left" >
                        <el-col :span="18">
                            <el-input v-model="form.cases.name" />
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="维护人" label-position="left">
                        <el-col :span="18">
                            <el-input v-model="form.cases.owner" />
                        </el-col>
                    </el-form-item>
                </el-col>

            </el-row>
            
             <el-row :gutter="24">
                <el-col>
                    <el-form-item label="描述" label-position="left">
                        <el-col :span="22">
                            <el-input type="textarea" v-model="form.cases.desc" />
                        </el-col>
                    </el-form-item> 
                </el-col>
            </el-row>
            
            <el-row :gutter="24">
                <el-col :span="8">
                    <el-form-item label="浏览器" label-position="left">
                        <el-col :span="24">
                        <el-select v-model="form.confs.browser" placeholder="请选择">
                            <el-option label="Chrome" value="1" />
                            <el-option label="Firefox" value="2" />
                        </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="URL" label-position="left">
                        <el-col :span="22">
                        <el-input v-model="form.confs.testUrl" />
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
               <el-col :span="22">
                   <el-form-item>
                       <el-col>
                            <el-button @click="addStep()">点击添加步骤</el-button>
                       </el-col>
                   </el-form-item>
               </el-col>
            </el-row>

            <el-row v-for="(item, index) in form.steps" :key="item.orderNo" :gutter="24">
                
                <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="5" style="padding-right:0px">               
                    <el-form-item :rules="{required: true, message: '名称不能为空', trigger: 'blur'}" :label="(index+1).toString()">
                        <el-col>  
                        <el-select v-model="item.action" placeholder="请选择">
                            <el-option v-for="(item,index) in actions" :label="item.name" :value="item.value" :key="index"/>
                        </el-select>
                        </el-col>
                    </el-form-item>    
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"> 
                    <el-form-item label-width="0px">
                        <el-select v-model="item.elementType" placeholder="请选择">
                            <el-option label="id" value="id" />
                            <el-option label="xpath" value="xpath"/>
                        </el-select>
                        
                    </el-form-item>  
                </el-col>
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <el-form-item label-width="2px">
                            <el-input v-model="item.element" />
                    </el-form-item>       
                </el-col>

                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" v-if="ifActionExists(item.action)">
                    <el-form-item label-width="0px">
                        <el-input  v-model="item.value" />
                    </el-form-item>               
                </el-col>  

                <el-col :xs="2" :sm="4" :md="4" :lg="4" :xl="4">
                    <el-form-item label-width="0px"> 
                        <el-button @click="deleteStep(index)" type="danger" icon="el-icon-delete" round title="删除"></el-button>   
                        <el-button @click="addStep(index)" type="success" icon="el-icon-document-add" round title="插入一个新的步骤"></el-button>   
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-form-item>
                <el-button type="primary" @click="submitForm(form)">提交</el-button>                
                <el-button @click="handleClose">关闭</el-button>
	        </el-form-item>
        </el-form> 
          
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { createCase } from '@/api/end'


export default {
    name: "AddCase",
    props:{
        
    },
    data(){
        return {
            projectId: this.$route.params.projectId,
            actions:[
                {
                    name: "点击",
                    value: "click"
                },
                {
                    name: "输入", 
                    value: "send"
                },
                {
                    name: "等待",
                    value: "wait"
                },
                {
                    name: "关闭", 
                    value: "close"
                }
            ],

            form:{
                cases:{},
                confs: {},
                steps: []
            }
        }
    }, 
    computed: {
        ...mapGetters(['dialogVisible'])
    },
    methods:{
        init(){
            this.form = {
                cases: {},
                confs: {},
                steps: []
            }
        }, 

        handleClose(){
            this.init()
            this.$store.dispatch('end/toggleDialogVisible')

        },
        submitForm(form){
            console.log(this.projectId)
            createCase(this.projectId, form).then(response => {
                this.$router.go(0)
                this.$message({
                    message: '提交成功', 
                    type: 'success'
                })
            })
            
        },
        ifActionExists(actionType){
            if (actionType.localeCompare("send")===0 || actionType.localeCompare("wait")===0){
                return true
            }
            
            return false
        },
        addStep(index) {
            let steps = this.form.steps; 

            if(index == undefined){
                index = steps.length - 1; 
            }

            let step = {
                action:"click",
                elementType: "",
                element: "",
                orderNo: (index+1) * 65536
            }
            
            steps.splice(index+1, 0, step)
            
        },
        deleteStep(index){
            this.form.steps.pop(index)
        }
    
    }, 
    mounted(){
        console.log(this.sortedFormSteps)
    }
  
}
</script>
<style lang="scss" scoped>

.collapse-title {
    flex: 1 0 90%;
    order: 1;
}

.el-collapse-item-header{
    flex: 1 0 auto;
    order: -1;
}
</style>