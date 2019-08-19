import { axiosInstance } from '../config'

const api = {
  deleteAttachment: uuid => {
    return axiosInstance
      .delete(`attachment/${uuid}?purge=true`)
      .then(response => {
        if (Math.floor(response.status / 100) !== 2) {
          throw response.status

        }
      })
  },

  getAttachment: uuid =>
    axiosInstance.get(`attachment/${uuid}`).then(response => {
      if (response.status !== 200) {
        throw response
      } else {

        // console.log(response.data)
        // console.log("primul get")
        return response.data
      }
    })
  ,

  getAttachmentBytes: uuid =>
    axiosInstance.get(`attachment/${uuid}/bytes`, {
      responseType: 'arraybuffer'
    }).then(response => {
      if (response.status !== 200) {
        throw response
      } else {
        var meta = {};
        meta.contentFamily = response.headers['content-family']
        meta.ext = '.' + response.headers['file-ext']
        meta.MIMEType = response.headers['content-type']
        meta.fileName= response.headers['file-name']

        return { buffer: new Buffer(response.data, 'binary'), meta: meta }
      }
    })
  ,

  updateAttachment: (uuid, comment) =>
    axiosInstance.post(`attachment/`).then(response => {
      if (response.status !== 200) {
        throw response
      } else {
        return response.data
      }
    })
}

export default api
