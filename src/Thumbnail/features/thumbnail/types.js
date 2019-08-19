import types from 'redux-types'

export default types('thumbnail', [
  'UPDATE_REQUESTED',
  'UPDATE_SUCCEEDED',
  'UPDATE_FAILED',
  'DELETE_REQUESTED',
  'DELETE_SUCCEEDED',
  'DELETE_FAILED',
  'FETCH_REQUESTED',
  'FETCH_SUCCEEDED',
  'FETCH_FAILED',
]);
