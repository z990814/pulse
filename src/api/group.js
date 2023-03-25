import request from '../utils/request'

export default {
  addGroup(bGroup) {
    return request({
      url: '/pulse/group/addGroup',
      method: 'post',
      data: bGroup
    })
  },
  updateGroup(bGroup) {
    return request({
      url: '/pulse/group/updateGroup',
      method: 'post',
      data: bGroup
    })
  },
  deleteGroup(id) {
    return request({
      url: '/pulse/group/deleteGroup/' + id,
      method: 'delete'
    })
  },
  getFormDataListPage(current, limit, formQuery) {
    return request({
      url: '/pulse/group/getFormDataListPage/' + current + '/' + limit,
      method: 'post',
      // formQuery 条件对象，后端用requestBody获取数据 需要用data
      // data 表示 把对象转换成了json然后进行传递到接口。
      data: formQuery
    })
  },
  findNodes() {
    return request({
      url: '/pulse/group/findNodes',
      method: 'get'
    })
  },
  findNodesSelected(id) {
    return request({
      url: '/pulse/group/findNodesSelected/' + id,
      method: 'get'
    })
  }
}
