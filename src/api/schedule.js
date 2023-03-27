import request from '../utils/request'

export default {
  addSchedule(bSchedule) {
    return request({
      url: '/pulse/schedule/addSchedule',
      method: 'post',
      data: bSchedule
    })
  },
  queryScheduleListAll() {
    return request({
      url: '/pulse/schedule/queryScheduleListAll',
      method: 'get'
    })
  },
  querySchedule(id) {
    return request({
      url: '/pulse/schedule/querySchedule/' + id,
      method: 'get'
    })
  }
}
