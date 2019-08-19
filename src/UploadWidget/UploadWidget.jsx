import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
// import { openmrsFetch } from "@openmrs/esm-api";

const styles = {};

styles.fill = {
  border: '2px dotted #888',
  borderRadius: '10px',
  minHeight: '0px',
  height: '150',
  width: '15%',
  position: 'relative',
  float: 'left',
  cursor: 'pointer',
  backgroundColor: 'white'
};

styles.img = {
  width: 200,
  height: 'auto',
  margin: '0',
  position: 'absolute',
  top: '50%' ,
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

styles.test = {
  position:'absolute',
  fontFamily: 'OpenSans, Arial, sans-serif',
  color: '#363463',
  fontSize: '16px',
  width: '100%',
  height: '100%',
  top: '25%',
  textAlign: 'center'
}

styles.textarea = {
  float:'right',
  display:'inline',
  width: '25%',
  height:'10%',

  position: 'absolute',
  clear: 'both',
  marginLeft: '2%'


}

styles.divEmpty = {
  width: 'auto',
  overflow: 'hidden',
  border:' 1px solid #EEE',
  backgroundColor: '#F9F9F9',
  margin: '15px 0 10px 0',
  padding: '15px 15px 15px 15px'

}

styles.button = {
  border: '#dddddd 1px solid',
  padding: '8px 20px',
  display: 'inline-block',
  lineHeight: '1.2em',
  color: '#363463',
  cursor: 'pointer',
  minWidth: '0',
  maxWidth: '300px',
  borderRadius: '4px',
  textDecoration: 'none',
  MozBorderRadius: '3px',
  backgroundImage: 'linear-gradient(white, #cfd1d0)',
  width: 'auto',
  height: 'auto',
}



class UploadWidget extends Component {
  constructor() {
    
    super();
    this.onDrop = files =>files.map((file) => {
      this.setState({'file':file})
      this.setState( Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))
    console.log(this.state)
  });
    this.state = {
      file: {},
      imgPreview : null,
      bytes: 'as'
    };

    
  }

  handleClick = () => {
    var reader = new FileReader();
    reader.readAsDataURL(this.state.file); 
    reader.onloadend = () => {
        var base64data = reader.result;                
      this.setState({'bytes':atob(base64data)});
      console.log('asdasda')
  }
}
  render() {
 
    

    return (
      <div style={styles.divEmpty}>
        <div>
        <h5>File</h5>
        <div style={styles.fill}>
        
        <Dropzone 
        style={styles.fill}
        onDrop={this.onDrop}>
     
         {({getRootProps, getInputProps}) => (
           
         
              <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
  
               {this.state.preview?  <img src={this.state.preview} style={styles.img} />:<div style={styles.test}><p>Click or drop file here.</p></div>}
             </div>

          )}
  
        </Dropzone>
        </div>
       </div> 
        
        <div style={styles.textarea}>
        <h5>Caption</h5>
        <textarea placeholder="Enter a caption" style = {{backgroundColor:'white'}}  name="" id="" cols="30" rows="10"></textarea>
        <button style = {styles.button}> camera</button>
        <button onClick = {this.handleClick} style = {styles.button}> upload</button>
        <button style = {styles.button}> clear forms</button>
          <h1>{this.state.bytes}</h1>

        </div>
      </div>
    );
  }
}

export default UploadWidget