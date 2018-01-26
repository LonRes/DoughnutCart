import React from 'react'

class QuantityTweaker extends React.Component {
  state = {
    // typing in the quantity field shouldn't update the shopping basket
    // immediately, so we temporily store the value here.
    unflushedValue: null
  }
  // will become "getDerivedStateFromProps" in React 17
  componentWillReceiveProps(nextProps) {
    // make sure the input reacts to external updates. it'd be worth considering
    // what to do if the value changes while the user is currently typing (UX)
    if (nextProps.value !== this.props.value) {
      this.setState({unflushedValue: null})
    }
  }
  render() {
    const {unflushedValue} = this.state
    const {value, onChange} = this.props

    const changeAndFlushValue = value => {
      this.setState({unflushedValue: null})
      onChange(Number(value || 0))
    }

    const addOne = changeAndFlushValue.bind(null, value + 1)
    const remove = changeAndFlushValue.bind(null, 0)
    const update = changeAndFlushValue.bind(
      null,
      unflushedValue == null ? value : unflushedValue
    )

    const updateUnflushed = evt => {
      this.setState({unflushedValue: evt.target.value})
    }

    return (
      <div>
        {value === 0 ? (
          <button onClick={addOne}>Add</button>
        ) : (
          [
            <input
              value={unflushedValue != null ? unflushedValue : value}
              onChange={updateUnflushed}
              key="input"
            />,
            <br key="break" />,
            <button onClick={update} key="update">
              Update
            </button>,
            <button onClick={remove} key="remove">
              Remove
            </button>
          ]
        )}
      </div>
    )
  }
}

export default QuantityTweaker
