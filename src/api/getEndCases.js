import request from '@/utils/request'

export function getCases() {
  return request({
    url: '/v1/end/case',
    method: 'get'
  })
}