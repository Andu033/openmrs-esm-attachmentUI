import reducers, { initialState } from '../reducers';
import THUMBNAIL_TYPES from '../types';

describe('thumbnail reducers', () => {

  it('should return the initial state', () => {
    expect(reducers(initialState, {})).toEqual(initialState);
  });

  it('should return thumbnail results', () => {

    const thumbnail =
    {
      "uuid": "some_uuid"
    }

    expect(reducers(initialState, {
      type: THUMBNAIL_TYPES.FETCH_SUCCEEDED,
      thumbnail: thumbnail
    })).toEqual(
      { thumbnails: [{ uuid: "some_uuid" }] }
    );

  });

  it('should return array without current element', () => {
    const thumbnail =
    {
      "uuid": "some_uuid"
    }

    expect(reducers({ "thumbnails": [{ "uuid": "some_uuid" }] }, {
      type: THUMBNAIL_TYPES.DELETE_SUCCEEDED,
      uuid: "some_uuid"
    })).toEqual(
      { thumbnails: [] }
    );

  });

  it('should update thumbnail caption', () => {

    expect(reducers(
      {
        thumbnails: [
          {
            "uuid": "some_uuid",
            "caption": "some_caption"
          },
          {
            "uuid": "another_uuid"
          }
        ]
      }, {
        type: THUMBNAIL_TYPES.UPDATE_SUCCEEDED,
        caption: "another_caption",
        uuid: "some_uuid"
      })).toEqual(
        [
          {
            "uuid": "some_uuid",
            "caption": "another_caption"
          },
          {
            "uuid": "another_uuid"
          }
        ]
      );

  });

});
