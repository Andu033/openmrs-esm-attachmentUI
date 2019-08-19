import thumbnailActions from '../actions';
import THUMBNAIL_TYPES from '../types';

describe('thumbnail actions', () => {


  it('should fetch a thumbnail requested action', () => {

    const expectedAction = {
      type: THUMBNAIL_TYPES.FETCH_REQUESTED,
      uuid: "some_uuid",
    };

    expect(thumbnailActions.fetchThumbnailRequested("some_uuid")).toEqual(expectedAction);

  });

  it('should fetch a thumbnail succeeded action', () => {

    const thumbnail =
    {
      uuid: "some_uuid"
    }
      ;

    const expectedAction = {
      type: THUMBNAIL_TYPES.FETCH_SUCCEEDED,
      thumbnail: thumbnail
    };

    expect(thumbnailActions.fetchThumbnailSucceeded(thumbnail)).toEqual(expectedAction);

  });

  it('should fetch a thumbnail failed action', () => {

    const expectedAction = {
      type: THUMBNAIL_TYPES.FETCH_FAILED,
      message: "some_message"
    };

    expect(thumbnailActions.fetchThumbnailFailed("some_message")).toEqual(expectedAction);
  });


  it('should update a thumbnail requested action', () => {

    const expectedAction = {
      type: THUMBNAIL_TYPES.UPDATE_REQUESTED,
      caption: "some_caption",
      uuid: "some_uuid"

    };

    expect(thumbnailActions.updateThumbnailRequested("some_uuid", "some_caption")).toEqual(expectedAction);

  });

  it('should update a thumbnail succeeded action', () => {

    const expectedAction = {
      type: THUMBNAIL_TYPES.UPDATE_SUCCEEDED,
      uuid: "some_uuid",
      caption: "some_caption"
    };

    expect(thumbnailActions.updateThumbnailSucceeded("some_uuid", "some_caption")).toEqual(expectedAction);

  });

  it('should update a thumbnail failed action', () => {

    const expectedAction = {
      type: THUMBNAIL_TYPES.UPDATE_FAILED,
      message: "some_message"
    };

    expect(thumbnailActions.updateThumbnailFailed("some_message")).toEqual(expectedAction);
  });



  it('should delete a thumbnail requested action', () => {

    const expectedAction = {
      type: THUMBNAIL_TYPES.DELETE_REQUESTED,
      uuid: "some_uuid",
    };

    expect(thumbnailActions.deleteThumbnailRequested("some_uuid")).toEqual(expectedAction);

  });

  it('should delete a thumbnail succeeded action', () => {

    const expectedAction = {
      type: THUMBNAIL_TYPES.DELETE_SUCCEEDED,
      uuid: "some_uuid",
    };

    expect(thumbnailActions.deleteThumbnailSucceeded("some_uuid")).toEqual(expectedAction);

  });

  it('should delete a thumbnail failed action', () => {

    const expectedAction = {
      type: THUMBNAIL_TYPES.DELETE_FAILED,
      message: "some_message"
    };

    expect(thumbnailActions.deleteThumbnailFailed("some_message")).toEqual(expectedAction);
  });

});
