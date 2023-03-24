import request from '../utils/request'

export default {
  findNodes() {
    return request({
      url: '/AU/saMenu/findNodes',
      method: 'get'
    })
  },
  AddMenuList(assginMenuVo) {
    return request({
      url: '/AU/saMenu/doAssign',
      method: 'post',
      data: assginMenuVo
    })
  },
  toAssign(roleId) {
    return request({
      url: '/AU/saMenu/toAssign/'+roleId,
      method: 'get'
    })
  }
}
