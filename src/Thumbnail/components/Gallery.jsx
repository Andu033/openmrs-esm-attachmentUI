import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import galleryActions from '../features/gallery/actions'
import Thumbnail from './Thumbnail'


class Gallery extends Component {

  componentWillMount() {
    this.props.fetchAttachments(galleryActions.fetchGalleryRequested(this.props.uuid))
  }

  render() {
    return (
      <div className="rowC">
        {(this.props.attachments !== undefined) ? this.props.attachments.map((item, index) => <Thumbnail key={item.uuid} uuid={item.uuid} />) : <p>Wait</p>}
      </div>
    )
  }
}
Gallery.propTypes = {
  uuid: PropTypes.string
}

function mapStateToProps(state, ownProps) {
  const { galleries } = state.openmrs.gallery
  const gallery = galleries.find(element => {
    return element.patientUuid == ownProps.uuid
  })
  if (gallery !== undefined) {
    console.log('attachments')
    console.log(JSON.stringify( attachments))
    const { attachments } = gallery;
    return { attachments }

  }
  else return {}
}

const mapDispatchToProps = dispatch => ({
  fetchAttachments: uuid => {
    dispatch(galleryActions.fetchGalleryRequested(uuid));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
