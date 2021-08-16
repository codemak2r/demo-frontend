<template>
    <div class="app-container">
        <table-list />
        <add-case />
    </div>
</template>
<script>
import TableList from "./components/tableList"
import AddCase from "./components/addCase"


export default {
    name: "end",
    
    components: {
        TableList,
        AddCase
    
    }, 
    methods: {
       
    }
}
</script>