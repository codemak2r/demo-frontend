<template>
    <div class="app-container">
        <el-dialog
        :visible.sync="dialogVisible"
        height="100%"
        width="80%"
        :before-close="handleClose"
        append-to-body
        
        center>
       
        
        <el-form ref="form" :model="form" label-width="40px">
            
            <el-form-item label="名称" label-position="left">
                <el-col :span="22">
                <el-input v-model="form.name" />
                </el-col>
            </el-form-item>
            

             
            <el-form-item label="描述" label-position="left">
                <el-col :span="22">
               
                    <el-input type="textarea" v-model="form.name" />
                </el-col>
            </el-form-item>
            

           
        </el-form> 
          
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: "AddCase",
    data(){
        return {
            formNameWidth: "",
            form:{}
        }
    }, 
    computed: {
        ...mapGetters(['dialogVisible'])
    },
    methods:{
        handleClose(){
            this.$store.dispatch('end/toggleDialogVisible')
        }
    }, 
    mounted(){
        console.log(this.dialogVisible)
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