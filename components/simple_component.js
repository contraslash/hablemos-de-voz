import React, { useRef, useEffect }  from 'react';
import ReactDOM from 'react-dom'
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
      waveColor: 'violet',
      progressColor: 'purple'
    })
    this.wavesurfer.load(this.props.src)
  }
  componentWillUnmount() {

  }
  render() {
    return (
      <div className='waveform'>
        <div className='wave'></div>
      </div>
    )
  }
}

SimpleWave.defaultProps = {
  src: ""
}
