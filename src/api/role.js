import request from '../utils/request'

export default {
  addRole(roleForm) {
    return request({
      url: '/AU/saRole/addRole',
      method: 'post',
      data: roleForm
    })
  },
  updateRole(updateForm) {
    return request({
      url: '/AU/saRole/updateRole',
      method: 'post',
      data: updateForm
    })
  },
  getFormDataListPage(current, limit, formQuery) {
    return request({
      url: '/AU/saRole/getFormDataListPage/' + current + '/' + limit,
      method: 'post',
      // formQuery 条件对象，后端用requestBody获取数据 需要用data
      // data 表示 把对象转换成了json然后进行传递到接口。
      data: formQuery
    })
  },
  getRoleList() {
    return request({
      url: '/AU/saRole/getRoleOptions',
      method: 'get'
    })
  },
  assignRoleList(assginRoleVo) {
    return request({
      url: '/AU/saRole/doAssign',
      method: 'post',
      data: assginRoleVo
    })
  },
  toAssign(userId) {
    return request({
      url: '/AU/saRole/toAssign/'+userId,
      method: 'get'
    })
  },
  login(loginForm) {
    return request({
      url: '/AU/saUser/doLogin',
      method: 'post',
      data: loginForm
    })
  }
}
