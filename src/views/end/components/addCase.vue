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
                            <el-input v-model="form.name" />
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="维护人" label-position="left">
                        <el-col :span="18">
                            <el-input v-model="form.owner" />
                        </el-col>
                    </el-form-item>
                </el-col>

            </el-row>
            
            <el-row :gutter="24">
                <el-col :span="8">
                    <el-form-item label="浏览器" label-position="left">
                        <el-col :span="24">
                        <el-select v-model="form.conf.browser" placeholder="请选择">
                            <el-option label="Chrome" value="1" />
                            <el-option label="Firefox" value="2" />
                        </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="URL" label-position="left">
                        <el-col :span="22">
                        <el-input v-model="form.conf.testUrl" />
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
           

            <el-row :gutter="24">
                <el-col>
                    <el-form-item label="描述" label-position="left">
                        <el-col :span="22">
                            <el-input type="textarea" v-model="form.desc" />
                        </el-col>
                    </el-form-item> 
                </el-col>
            </el-row>
            
            
            <el-row :gutter="24">
               <el-col :span="22">
                   <el-form-item>
                       <el-col>
                            <el-button @click="addStep(sortedFormSteps[sortedFormSteps.length-1].orderNo, sortedFormSteps.length-1)">点击添加步骤</el-button>
                       </el-col>
                   </el-form-item>
               </el-col>
            </el-row>

            <el-row v-for="(item, index) in sortedFormSteps" :key="item.orderNo" :gutter="24">
                <el-col :span="4">                 
                    <el-form-item :rules="{required: true, message: '名称不能为空', trigger: 'blur'}" :label="index+1">
                        <el-col :span="22">     
                        <el-select v-model="item.action" placeholder="请选择">
                            <el-option v-for="(item,index) in actions" :label="item.name" :value="item.value" :key="index"/>
                            
                        </el-select>
                        </el-col>
                    </el-form-item>    
                </el-col>
                <el-col :span="2"> 
                    <el-form-item label-width="0px">
                        <el-col :span="22">
                        <el-select v-model="item.elementType" placeholder="请选择">
                            <el-option label="id" value="id" />
                            <el-option label="xpath" value="xpath"/>
                        </el-select>
                        </el-col>
                    </el-form-item>  
                </el-col>
                <el-col :span="8">
                    <el-form-item label-width="2px">
                        <el-col :span="23">
                       <el-input v-model="item.element" />
                        </el-col>
                    </el-form-item>       
                </el-col>
                <el-col :span="4" v-if="ifActionExists(item.action)">
                    <el-form-item label-width="0px">
                        <el-col :span="22">
                            <el-input  v-model="item.value" />
                        </el-col>
                    </el-form-item>               
                </el-col>   
                <el-col :span="4">
                    <el-form-item label-width="0px"> 
                        <el-button @click="deleteStep" type="danger" icon="el-icon-delete" circle></el-button>   
                        <el-button @click="addStep(item.orderNo, index)" type="success" icon="el-icon-document-add" circle></el-button>   
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
    data(){
        return {
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
            orderNo: 0,
            form:{
                name: "",
                owner: "",
                desc: "",
                conf: {},
                steps: [{
                    action:"click",
                    elementType: "",
                    element: "", 
                    orderNo: 0
                }]
            }
        }
    }, 
    computed: {
        ...mapGetters(['dialogVisible']), 
        
        sortedFormSteps(){
            let sortedSteps = this.form.steps.sort((a,b) => {
                return a.orderNo - b.orderNo
            })
            console.log("sort:"+sortedSteps)
            return sortedSteps
        }
        

    },
    methods:{
        handleClose(){
            this.$store.dispatch('end/toggleDialogVisible')
            this.form = {
                name: "",
                owner: "",
                desc: "",
                conf: {},
                steps: [{
                    action:"click",
                    elementType: "",
                    element: "", 
                    orderNo: 0
                }]
            }
        },
        submitForm(form){
            console.log(form)
            console.log(JSON.stringify(form))
            createCase(form).then(response => {
                this.$router.go(0)
            })
            
        },
        ifActionExists(actionType){
            if (actionType.localeCompare("send")===0 || actionType.localeCompare("wait")===0){
                return true
            }
            
            return false
        },
        addStep(orderNo, index) {
            if (index === this.sortedFormSteps.length -1 ) {
                this.orderNo = orderNo + 1000
            }else{
                this.orderNo = (orderNo + this.sortedFormSteps[index+1].orderNo) / 2; 
            }
            console.log(this.sortedFormSteps)
            this.form.steps.push({
                action:"click",
                elementType: "",
                element: "", 
                value: this.value,
                orderNo: this.orderNo
            })
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