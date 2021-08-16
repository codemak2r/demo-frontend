<template>
    <div>
        <el-dialog
        :visible.sync="dialogVisible"
        width="85%"
        :before-close="handleClose"
        center>
       <div>
           hhhhh
       </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: "AddCase",
    data(){
        
        return {
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