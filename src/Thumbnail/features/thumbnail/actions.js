import THUMBNAIL_TYPES from './types'


const fetchThumbnailRequested = uuid => ({
  type: THUMBNAIL_TYPES.FETCH_REQUESTED,
  uuid: uuid
})

const fetchThumbnailFailed = message => ({
  type: THUMBNAIL_TYPES.FETCH_FAILED,
  message: message
})

const fetchThumbnailSucceeded = thumbnail => ({
  type: THUMBNAIL_TYPES.FETCH_SUCCEEDED,
  thumbnail: thumbnail
})

const updateThumbnailRequested = (uuid, caption) => ({
  type: THUMBNAIL_TYPES.UPDATE_REQUESTED,
  caption: caption,
  uuid: uuid
})

const updateThumbnailSucceeded = (uuid, caption) => ({
  type: THUMBNAIL_TYPES.UPDATE_SUCCEEDED,
  caption: caption,
  uuid: uuid
})

const updateThumbnailFailed = message => ({
  type: THUMBNAIL_TYPES.UPDATE_FAILED,
  message: message
})

const deleteThumbnailRequested = uuid => ({
  type: THUMBNAIL_TYPES.DELETE_REQUESTED,
  uuid: uuid
})

const deleteThumbnailSucceeded = uuid => ({
  type: THUMBNAIL_TYPES.DELETE_SUCCEEDED,
  uuid: uuid
})

const deleteThumbnailFailed = message => ({
  type: THUMBNAIL_TYPES.DELETE_FAILED,
  message: message
})

export default {
  updateThumbnailRequested,
  updateThumbnailFailed,
  updateThumbnailSucceeded,
  deleteThumbnailRequested,
  deleteThumbnailFailed,
  deleteThumbnailSucceeded,
  fetchThumbnailRequested,
  fetchThumbnailFailed,
  fetchThumbnailSucceeded
}
