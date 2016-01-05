import React from 'react';

export default class Slider extends React.Component {

  static propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    originalValue: React.PropTypes.number,
    label: React.PropTypes.string,
    update: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    min: 0,
    max: 200,
    step: 5,
    originalValue: 0,
    label: 'Value: %value'
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.originalValue
    };
  }

  handleChange(e) {
    const { update } = this.props;
    this.setState({
      value: e.target.value
    });
    update(parseInt(e.target.value, 10));
  }

  render() {
    const { min, max, step, label } = this.props;
    return (
      <div>
        {label !== null ? <label>{label.replace('%value', this.state.value)}</label> : null}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          style={{
            width: '200px',
            display: 'inline',
            verticalAlign: 'middle',
            marginLeft: '10px'
          }}
        />
      </div>
    );
  }

}
