import React, { Component } from 'react'
import '../../assets/Thumbnail.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import thumbnailActions from '../features/thumbnail/actions'
import { throws } from 'assert';
import moment from 'moment'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTrashAlt, faFilePdf } from '@fortawesome/free-solid-svg-icons'
class Thumbnail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hightlight: false,
      clicked: false,
      comment: '',
      isOpen: false
    }

    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onMouseOver(evt) {
    this.setState({ hightlight: true })
  }

  onMouseLeave() {
    this.setState({ hightlight: false })
  }

  handleChange = event => {
    this.setState({ comment: event.target.value })
  }

  handleClick = () => {
    this.setState({ clicked: true })
    this.setState({ hightlight: false })
  }

  openPdf = () => {
    var blob = new Blob([this.props.data], { type: "application/pdf" });
    var blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl)
  }
  openOther = () => {
    var blob = new Blob([this.props.data], { type: this.props.MIMEType.split(';')[0] });
    var blobUrl = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.style = "display: none";
    a.href = blobUrl;
    a.download = this.props.fileName;
    document.body.append(a);
    a.click();
    console.log(blob)
  }

  deleteClick = () => {
    this.props.deleteThumbnail(this.props.uuid)
  }
  componentWillMount() {
    this.props.fetchThumbnail(thumbnailActions.fetchThumbnailRequested(this.props.uuid))
  }

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  renderContent(param) {
    switch (param) {
      case 'IMAGE':
        return <img onClick={this.handleShowDialog}
          className='Image'
          src={(this.props.data != undefined) ? `data:${this.props.MIMEType};base64,${this.props.data}` : ''}
          alt={this.props.comment}
        />;
      case 'PDF':
        return <div onClick={() => { this.openPdf() }} >
          <FontAwesomeIcon
            className='icon'
            icon="file-pdf"
            size="4x"
          />
          <br />
          <span>PDF</span></div >;
         
      default:
        return (<div>
          <FontAwesomeIcon onClick={() =>{ this.openOther()}}
            className='icon'
            icon="file"
            size="4x"
          />
          <br />
          <span>{this.props.ext}</span></div>);
    }
  }

  render() {
    {
      fontawesome.library.add(faFile, faTrashAlt, faFilePdf)
    }
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
    return (
      <div>
        {(this.state.isOpen) ?
          <div className='popup' onClick={this.handleShowDialog}>
            <img className='previewImage'
              src={`data:${this.props.MIMEType};base64,${this.props.data}`}
            ></img>
            <p className='imageText'>{this.props.comment}</p>
          </div>
          : null
        }
        <p>
          <time datetime={this.props.dateTime} className='dateText'>{moment(this.props.dateTime, "YYYY-MM-DD-kk-mm-ss").fromNow()}</time>
        </p>

        <div className='Thumbnail container'>
          {this.renderContent(this.props.contentFamily)}
          {this.state.clicked ? (
            <FontAwesomeIcon class="overlay" onClick={() => this.props.deleteThumbnail(this.props.uuid)}
              className='icon'
              icon="trash-alt"
              size="1x"
            />
         ) : null}



        </div>
        {!this.state.clicked ? (
          <div
            onMouseEnter={this.onMouseOver}
            onMouseLeave={this.onMouseLeave}
            onClick={this.handleClick}
            className={`Name ${this.state.hightlight ? 'Highlight' : ''}`}
          >
            <p
              className={`${
                this.state.hightlight ? 'ThumbnailTextHover' : 'ThumbnailText'
                }`}
            >{this.props.comment}</p>

          </div>
        ) : (
            <div>
              <input
                type='text'
                defaultValue={this.props.comment}
                onChange={this.handleChange}
                className='InputName'
              />
              <br />
              <FontAwesomeIcon onClick={() => this.setState({ clicked: false })}
                className='icon'
                icon="times"
              />
              <FontAwesomeIcon onClick={() => {
                this.setState({ clicked: false })
                this.props.updateThumbnail(this.props.uuid, this.state.comment)
              }}
                className='icon'
                icon="check"
              />

            </div>
          )}
      </div>
    )
  }
}
Thumbnail.propTypes = {
  uuid: PropTypes.string
}

function mapStateToProps(state, ownProps) {
  const { thumbnails } = state.openmrs.thumbnail

  const thumbnail = thumbnails.find(function(element)  {
  
    return element.uuid === ownProps.uuid
  })
  console.log(JSON.stringify(thumbnail) )

  if (thumbnail !== undefined) {
    const { comment, data, dateTime, ext, contentFamily, MIMEType, fileName } = thumbnail;
    return { comment, data, dateTime, ext, contentFamily, MIMEType, fileName }

  }
  return {}
}

const mapDispatchToProps = dispatch => ({
  fetchThumbnail: uuid => {
    dispatch(thumbnailActions.fetchThumbnailRequested(uuid));
  },
  updateThumbnail: comment => {
    dispatch(thumbnailActions.updateThumbnailRequested(comment));
  },
  deleteThumbnail: uuid => {
    dispatch(thumbnailActions.deleteThumbnailRequested(uuid));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Thumbnail)
