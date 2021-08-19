import request from '@/utils/request'

// export function getCases() {
//   return request({
//     url: '/v1/end/cases',
//     method: 'get'
//   })
// }

// export function createCase(data){
//   return request({
//     url: '/v1/end/cases',
//     method: 'post',
//     data
//   })
// }

export function getAllCases(){
  return request({
    url: '/end/cases', 
    method: 'get'
  })
}

export function createCase(form){
  return request({
    url: '/end/cases', 
    method: 'post',
    form
  })
}

export function getCase(id){
  return request({
    url: '/end/cases/'+id, 
    method: 'get'
  })
}

export function enableCase(id) {
  return request({
    url: '/end/cases/' + id, 
    method: 'post'
  })
}