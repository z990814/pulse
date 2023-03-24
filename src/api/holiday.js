import request from '../utils/request'

// 查询节假日管理 - 法定节假日列表
export function getSpecialDay(query) {
  return request({
    url: 'pulse/SpecialDay/list',
    method: 'get',
    params: query
  })
}


// 新增节假日管理 - 法定节假日
export function add(data) {
  return request({
    url: '/pulse/SpecialDay/addSpecialDay',
    method: 'post',
    data: data
  })
}

// 修改节假日管理 - 法定节假日
export function update(data) {
  return request({
    url: '/pulse/SpecialDay/updateSpecialDay',
    method: 'post',
    data: data
  })
}

// 删除节假日管理 - 法定节假日
export function deleteSpecialDay(id) {
  return request({
    url: '/pulse/SpecialDay/deleteSpecialDay/' + id,
    method: 'delete'
  })
}