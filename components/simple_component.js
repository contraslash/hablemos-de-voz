import React, { useEffect, useState, useCallback }  from 'react';
import ReactDOM from 'react-dom'
import {useDropzone} from 'react-dropzone'
import WaveSurfer from 'wavesurfer.js';


export class SimpleWave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    this.$el = ReactDOM.findDOMNode(this);
    this.$waveform = this.$el.querySelector('.wave');
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: 'blue',
      progressColor: 'purple',
      mediaControls: true,
      backend: 'MediaElement'
    });
    this.wavesurfer.load(this.props.src)
  }
  componentWillUnmount() {

  }
  render() {
    return (
        <div className='waveform' style={{width: "100%"}}>
          <div className='wave'></div>
        </div>
    )
  }
}

SimpleWave.defaultProps = {
  src: ""
};


export const MyDropZone = () => {
  const [files, setFiles] = useState([]);

  const audios = files.map(file => (
    <div key={file.name}>
        <SimpleWave
          src={file.src}
        />
    </div>
  ));

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        src: URL.createObjectURL(file)
      })));
      reader.readAsArrayBuffer(file);


    })
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: 'audio/wav', onDrop});
  console.log(isDragActive);

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
        <div>
          {audios}
        </div>
      </div>
  )
};
