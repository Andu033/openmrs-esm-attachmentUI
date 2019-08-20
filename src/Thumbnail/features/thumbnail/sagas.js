import { call, put, takeEvery, select } from "redux-saga/effects";
import { checkMIME, arrayBufferToBase64 } from "./utils"
import THUBNAIL_TYPES from "./types";
import thumbnailActions from "./actions";
import { selectors } from "../../../root.component";
import thumbnailRest from "../../rest/thumbnailRest";
import { utils } from "redux-saga";
import { galleryActions } from '../gallery'
function* fetchThumbnail(action) {

  try {
    const thumbnail = yield call(thumbnailRest.getAttachment, action.uuid.uuid)
    var thumbnails = yield select(selectors.getThumbnails);

    thumbnails = thumbnails.filter(p => (p.uuid === thumbnail.uuid && p.dateTime === thumbnail.dateTime) ? true : false)
    
    if (thumbnails.length === 0) {
      const { buffer, meta } = yield call(thumbnailRest.getAttachmentBytes, action.uuid.uuid)
      let res;
      (meta.contentFamily === 'IMAGE') ?
        res = yield arrayBufferToBase64(buffer) : res = buffer
        console.log(res)
      yield thumbnail.data = res
      yield thumbnail.ext = meta.ext
      yield thumbnail.contentFamily = meta.contentFamily
      yield thumbnail.MIMEType = meta.MIMEType
      yield thumbnail.fileName = meta.fileName

      console.log('thumbnails.length')
      console.log(thumbnail)



      yield put(thumbnailActions.fetchThumbnailSucceeded(thumbnail));
    }
    else console.log("already there")
  }
  catch (e) {
    yield console.log("ASTA E EROAREA")
    yield console.log(e.message)
    yield put(thumbnailActions.fetchThumbnailFailed(e.message));
  }
}

function* updateThumbnail(action) {

  try {
    yield call(thumbnailRest.updateAttachment, action.uuid, action.caption)
    yield put(thumbnailActions.updateThumbnailSucceeded(action.uuid, action.caption));
  }
  catch (e) {
    yield put(thumbnailActions.updateThumbnailFailed(e.message));
  }
}

function* deleteThumbnail(action) {

  try {
    yield call(thumbnailRest.deleteAttachment, action.uuid)
    yield put(galleryActions.deleteAttachment(action.uuid))
    yield put(thumbnailActions.deleteThumbnailSucceeded(action.uuid));
  }
  catch (e) {
    yield put(thumbnailActions.deleteThumbnailFailed(e.message));
  }

}

function* thumbnailSagas() {
  yield takeEvery(THUBNAIL_TYPES.FETCH_REQUESTED, fetchThumbnail)
  yield takeEvery(THUBNAIL_TYPES.UPDATE_REQUESTED, updateThumbnail)
  yield takeEvery(THUBNAIL_TYPES.DELETE_REQUESTED, deleteThumbnail)

}

export default thumbnailSagas;
