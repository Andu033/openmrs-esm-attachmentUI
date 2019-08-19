import THUMBNAIL_TYPES from './types'

export const initialState = {
  thumbnails: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case THUMBNAIL_TYPES.UPDATE_SUCCEEDED:
      return state.thumbnails.map(thumbnail =>
        thumbnail.uuid === action.uuid
          ? { ...thumbnail, caption: action.caption }
          : thumbnail
      )

    case THUMBNAIL_TYPES.FETCH_SUCCEEDED:
      { console.log(action)
        const thumbnail = state.thumbnails.find((element) => {
          return element.uuid === action.thumbnail.uuid
        });

        if (thumbnail === undefined)
          return{
            thumbnails:state.thumbnails.concat(action.thumbnail)
          }

        return state;
      }

    // case THUMBNAIL_TYPES.FETCH_CACHED:
    //   {
    //     state.thumbnails.forEach(thumbnail => {
    //       if (thumbnail.uuid === action.thumbnail.uuid && thumbnail.dateTime === action.thumbnail.dateTime) {
    //         console.log("let throw")
    //         throw 'the attachment is already there'
    //       }
    //       else { console.log("not now") }
    //     });
    //     return state;
    //   }

    case THUMBNAIL_TYPES.DELETE_SUCCEEDED:
      for (var i = 0; i < state.thumbnails.length; i++) {
        if (state.thumbnails[i].uuid === action.uuid) {
          state.thumbnails.splice(i, 1)
          break
        }
        state.thumbnails = state.thumbnails.filter(el => el.uuid != action.uuid)
        return state
      }

    default:
      return state
  }
}

export const getThumbnails = (state) => {
  return state.thumbnails;
};
