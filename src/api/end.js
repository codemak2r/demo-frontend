import request from '@/utils/request'

export function getCases() {
  return request({
    url: '/v1/end/case',
    method: 'get'
  })
}

export function createCase(data){
  return request({
    url: '/v1/end/case',
    method: 'put',
    data
  })
}