import { axiosInstance } from '../config'

const api = {
  getAttachments: patientUuid => {
    return axiosInstance
      .get(`attachment?patient=${patientUuid}`)
      .then(response => {
        if (response.status !== 200) {
          throw response
        }
        else {
          return response.data.results
        }
      })
  }
}

export default api
