import request from '@/utils/request'
export function getAllProjects(){
  return request({
    url: '/v1/end/projects',
    method: 'get'
  })
}

export function getAllCases(projectId) {
  return request({
    url: `/v1/end/${projectId}/cases`,
    method: 'get'
  })
}

export function createCase(projectId, data){
  return request({
    url: `/v1/end/${projectId}/cases`,
    method: 'post',
    data
  })
}

export function deleteCase(caseId){
  return request({
    url: `/v1/end/cases?id=${caseId}`,
    method: 'delete'
  })

}
export function runCase(caseId){
  return request({
    url: `/v1/end/execution/cases?id=${caseId}`,
    method: 'get'
  })
}
// export function getAllCases(){
//   return request({
//     url: '/end/cases', 
//     method: 'get'
//   })
// }

// export function createCase(form){
//   return request({
//     url: '/end/cases', 
//     method: 'post',
//     form
//   })
// }

// export function getCase(id){
//   return request({
//     url: '/end/cases/'+id, 
//     method: 'get'
//   })
// }

// export async function enableCase(id) {
//   return request({
//     url: '/end/xxxxx/' + id, 
//     method: 'post'
//   }).then(res => {
//     console.log("先执行我把")
//   },error => {
//     alert(error)
//   })
// }