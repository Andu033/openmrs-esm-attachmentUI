import React from "react";
import UploadWidget from "./UploadWidget/UploadWidget"
import Gallery from "./Thumbnail/components/Gallery"
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import {thumbnailReducers} from './Thumbnail/features/thumbnail'
import {galleryReducers} from './Thumbnail/features/gallery'

export const store = createStore(combineReducers({
  openmrs:{
    thumbnail:thumbnailReducers,
    gallery:galleryReducers
  }
}))
export const selectors = {
  getThumbnails: (state) => {
    return getThumbnails(state.openmrs.thumbnail)
  }
}
const AnimationExample = () => (
  <Provider store={store}>
    <UploadWidget/>
    <Gallery/>
  </Provider>
  // <Router basename="/home">    <Route to="home" component={UploadWidget}/>
  // </Router>
);



export default AnimationExample;