import request from '../utils/request'

export default {
  upload(form) {
    return request({
      url: '/AU/sysActivity/upload',
      method: 'post',
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data;boundary=<calculated when request is sent>'
      }
    })
  }
}