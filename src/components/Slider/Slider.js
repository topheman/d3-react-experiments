/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';

export default class Slider extends React.Component {

  static propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    defaultValue: React.PropTypes.number,
    label: React.PropTypes.string,
    update: React.PropTypes.func.isRequired,
    showPlayButton: React.PropTypes.bool,
    playing: React.PropTypes.bool,
    playingInterval: React.PropTypes.number
  }

  static defaultProps = {
    min: 0,
    max: 200,
    step: 5,
    defaultValue: 0,
    label: 'Value: %value',
    showPlayButton: false,
    playing: false,
    playingInterval: 500
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      playing: props.playing
    };
    this.updateValue = this.updateValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.run = this.run.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
  }

  componentDidMount() {
    this.run();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  updateValue(value) {
    const { update } = this.props;
    this.setState({
      value
    });
    update(value);
  }

  handleChange(e) {
    if (this.state.playing) {
      return;
    }
    const value = parseInt(e.target.value, 10);
    this.updateValue(value);
  }

  run() {
    if (this.state.playing) {
      this.play();
    }
    else {
      this.pause();
    }
  }

  play() {
    const { value } = this.state;
    const { min, max, step, playingInterval } = this.props;
    let next;
    if ((value + step) <= max) {
      next = value + step;
    }
    else {
      next = min;
    }
    this.updateValue(next);
    this.timer = setTimeout(this.play, playingInterval);
  }

  pause() {
    clearTimeout(this.timer);
  }

  handleClickPlay() {
    this.setState({
      playing: !this.state.playing
    }, () => {
      this.run();
    });
  }

  render() {
    const { min, max, step, label, showPlayButton } = this.props;
    return (
      <div>
        {label !== null ? <label>{label.replace('%value', this.state.value)}</label> : null}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={this.state.value}
          onChange={this.handleChange}
          style={{
            width: '200px',
            display: 'inline',
            verticalAlign: 'middle',
            marginLeft: '10px'
          }}
        />
        {showPlayButton ? <button className="btn btn-default" style={{ display: 'inline-block', marginLeft: '10px' }} onClick={this.handleClickPlay}>{this.state.playing ? 'Pause' : 'Play'}</button> : null}
      </div>
    );
  }

}
