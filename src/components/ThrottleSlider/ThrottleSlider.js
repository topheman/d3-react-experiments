import React from 'react';

export default class ThrottleSlider extends React.Component {

  static propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    value: React.PropTypes.number,
    updateThrottle: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    min: 0,
    max: 200,
    step: 5,
    value: 0
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  handleChange(e) {
    const { updateThrottle } = this.props;
    this.setState({
      value: e.target.value
    });
    updateThrottle(parseInt(e.target.value, 10));
  }

  render() {
    const { min, max, step } = this.props;
    return (
      <p>
        Throttle: {this.state.value}ms
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
      </p>
    );
  }

}
