import request from '../utils/request'

export default {
  addQuestion(bQuestions) {
    return request({
      url: '/pulse/questions/addQuestion',
      method: 'post',
      data: bQuestions
    })
  },
  getQuestionAsOption() {
    return request({
      url: '/pulse/questions/getQuestionAsOption',
      method: 'get'
    })
  },
  updateQuestion(bQuestions) {
    return request({
      url: '/pulse/questions/updateQuestion',
      method: 'post',
      data: bQuestions
    })
  },
  deleteQuestion(id) {
    return request({
      url: '/pulse/questions/deleteQuestion/' + id,
      method: 'delete'
    })
  },
  getFormDataListPage(current, limit, formQuery) {
    return request({
      url: '/pulse/questions/getFormDataListPage/' + current + '/' + limit,
      method: 'post',
      // formQuery 条件对象，后端用requestBody获取数据 需要用data
      // data 表示 把对象转换成了json然后进行传递到接口。
      data: formQuery
    })
  },
}
