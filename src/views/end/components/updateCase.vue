<template>
        <div class="app-container">
        <el-dialog
        :visible.sync="dialogForUpdateVisible"
        height="100%"
        width="60%"
        :before-close="handleClose"
        append-to-body
        center>
       
        <el-form ref="form" :model="form" >
            <el-row>
                <el-col :span="8">
                    <el-form-item label="名称" label-position="left">
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
            
            <el-row>
                <el-col :span="8">
                    <el-form-item label="浏览器" label-position="left">
                        <el-select v-model="form.conf.browser" placeholder="请选择">
                            <el-option label="Chrome" value="1" />
                            <el-option label="Firefox" value="2" />
                        </el-select>
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
           

            <el-row>
                <el-col>
                    <el-form-item label="描述" label-position="left">
                        <el-col :span="22">
                            <el-input type="textarea" v-model="form.desc" />
                        </el-col>
                    </el-form-item> 
                </el-col>
            </el-row>
            
            
            <el-row>
               <el-col>
                    <el-button @click="addSteps">点击添加步骤</el-button>
               </el-col>
            </el-row>

            <el-row v-for="item in form.steps" :key="item.orderNo" type="flex" >
                <el-col :span="4">                 
                    <el-form-item :rules="{required: true, message: '名称不能为空', trigger: 'blur'}">
                        <el-select v-model="item.action" placeholder="请选择">
                            <el-option label="点击" value="click" />
                            <el-option label="输入" value="send" />
                        </el-select>
                    </el-form-item>    
                </el-col>
                <el-col :span="4"> 
                    <el-form-item>
                        <el-select v-model="item.elementType" placeholder="请选择">
                            <el-option label="id" value="id" />
                            <el-option label="xpath" value="xpath" />
                        </el-select>
                    </el-form-item>  
                </el-col>
                <el-col :span="6">
                    <el-form-item >
                       <el-input v-model="item.element" />
                    </el-form-item>       
                </el-col>
                <el-col :span="6">
                    <el-form-item v-if="ifActionExists(item.action)">
                       <el-input  v-model="item.value" />
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

export default {
    name: "UpdateCase",
    data(){
        return {
            form:{}
        }
    }, 
    computed:{ 
         ...mapGetters(['dialogForUpdateVisible'])
    },
    methods:{
        fetchFormData(){
            
        }
    }, 
    created(){
        this.fetchFormData()
    }

}
</script>