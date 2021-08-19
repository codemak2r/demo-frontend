const Mock = require('mockjs')
// http://mockjs.com/examples.html#Text
const data = Mock.mock({
    'items|30': [{
        id: '1',
        name: '@cword(0,10)',
        desc: '@cparagraph(1)',
        owner: '@cname()',
        status: '@integer(0,1)',
        result: '@integer(-1, 1)',
        created_time: '@datetime',
        modified_time: `@datetime`, 
    }]
})

const details = Mock.mock({
    'case':{
        name: '舌尖测试用例1',
        owner: 'john.doe', 
        desc: '这里是描述'
    },
    'conf':{
        browser: 1, 
        testUrl: 'https://www.dontworry.io'
    },
    'steps':[{
        action: 'click', 
        elementType: 'id', 
        element: 'kw'
    }, 
    
    {
        action: 'click', 
        elementType: 'id', 
        element: 'kw'
    }, 
    {
        action: 'click', 
        elementType: 'id', 
        element: 'kw'
    }, 
    {
        action: 'send', 
        elementType: 'id', 
        element: 'kw'
    }, 
    {
        action: 'close', 
        elementType: 'id', 
        element: 'kw'
    }]
})
module.exports = [
    {
        url: '/end/cases/[0-9]+',
        type: 'post',
        response: (req,res) => {
            if (data.item[id].status == 1) {
                data.item[id].status = 0
            }else {
                data.item[id].status = 1
            }
            return {
                status: 200,
                message: 'success'
            }
        }
    },
    {
        url: "/end/cases/[0-9]+",
        type: 'get',
        response: (req,res)=>{
            return {
                status: 200, 
                message: 'success',
                data: details
            }
        }
    },
    {
        url: '/end/cases',
        type: 'get',
        response: () => {
            const items = data.items
            return {
                status: 200,
                message: "success",
                data: items
            }
        }
    },
    {
        url: '/end/cases',
        type: 'post',
        response: (req,res) => {
            return {
                status: 200, 
                message: 'success'
            }
        }

    }
    
]
  