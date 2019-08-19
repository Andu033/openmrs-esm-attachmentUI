import SagaTester from 'redux-saga-tester';
import thumbnailSagas from '../sagas';
import thumbnailActions from '../actions';

jest.mock('../../../rest/thumbnailRest');

describe('thumbnail sagas', () => {

  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(thumbnailSagas);
  });

  // it('thumbnail saga should fetch patients', () => {

  //   const expectedResponse = [
  //     {
  //       "uuid": "some_uuid",
  //       "dateTime": "some_date",
  //       "comment": "photo",
  //       "links": [
  //         {
  //           "rel": "self",
  //           "uri": "link"
  //         }
  //       ],
  //       "resourceVersion": "1.8",
  //       "data": {}
  //     }
  //   ];

  //   sagaTester.dispatch(thumbnailActions.fetchThumbnailRequested("some_uuid"));
  //   expect(sagaTester.getCalledActions()).toContainEqual(thumbnailActions.fetchThumbnailSucceeded(expectedResponse));
  // });

  it('thumbnail saga should return search failed if search fails', () => {
    sagaTester.dispatch(thumbnailActions.fetchThumbnailRequested("other_uuid"));
    expect(sagaTester.getCalledActions()).toContainEqual(thumbnailActions.fetchThumbnailFailed(undefined));
  });

});
