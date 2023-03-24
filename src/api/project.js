import request from '../utils/request'

export default {
  createProject(projectForm) {
    return request({
      url: '/AU/sysProject/createProject',
      method: 'post',
      data: projectForm
    })
  },
  getFormDataListPage(current, limit, formQuery) {
    return request({
      url: '/AU/sysProject/getFormDataListPage/' + current + '/' + limit,
      method: 'post',
      // formQuery 条件对象，后端用requestBody获取数据 需要用data
      // data 表示 把对象转换成了json然后进行传递到接口。
      data: formQuery
    })
  }
}