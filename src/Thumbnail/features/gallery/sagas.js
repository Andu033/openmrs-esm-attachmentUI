import { call, put, takeEvery, select } from "redux-saga/effects";
import GALLERY_TYPES from "./types";
import galleryActions from "./actions";
import galleryRest from "../../rest/galleryRest";

function* fetchAttachments(action) {

  try {

    const attachments = yield call(galleryRest.getAttachments, action.uuid.uuid)
    attachments
    const payload = attachments.map(atachment => atachment.uuid)
    yield put(galleryActions.fetchGallerySucceded(attachments, action.uuid.uuid));

  }
  catch (e) {
    yield put(galleryActions.fetchGalleryFailed(e.message));
  }
}


function* gallerySagas() {
  yield takeEvery(GALLERY_TYPES.FETCH_REQUESTED, fetchAttachments)
}

export default gallerySagas;
