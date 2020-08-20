import React, { PureComponent, createRef } from 'react'

export const Node = ({ count, type, connectType }) => {
  return (
    <div className={'nodeFill count' + count}>
      <div
        className={
          'nodeAdd node ' +
          (connectType === null
            ? type + 'Node'
            : connectType + 'Connect connected')
        }
      ></div>
    </div>
  )
}

export class InputBox extends PureComponent {
  constructor(props) {
    super(props)
    this.valid = true // valid or not
    this.inputRef = createRef()
  }

  componentDidMount() {
    this.inputRef.current.addEventListener('click', this.handleClick, true)
  }

  componentWillUnmount() {
    this.inputRef.current.removeEventListener('click', this.handleClick, true)
  }

  componentDidUpdate() {
    this.inputRef.current.value = this.props.thisInlineData
  }

  _cleanValue = v => {
    return isNaN(v) ? v : Number(v)
  }

  _finished = (toBlur = true) => {
    // Handle send data
    if (this.inputRef.current) {
      // TODO: Is it possible to remove this safe?
      const { collect, x, y, thisInlineData, inlineDataInd } = this.props
      let value = this._cleanValue(this.inputRef.current.value)
      if (this.valid && value !== thisInlineData) {
        collect([x, y, inlineDataInd, value], 'inlineDataChange')
      }

      if (toBlur) {
        this.inputRef.current.blur()

        // Remove listeners
        this.inputRef.current.removeEventListener(
          'keypress',
          this._keyFinished,
          true
        )
        document.removeEventListener('click', this._clickFinished, true)
      }
    }
  }

  _keyFinished = e => {
    if (e.key === 'Enter') this._finished(false) // Keep editing after pressing return...
  }

  _clickFinished = e => {
    if (e.target !== this.inputRef.current) this._finished(true)
  }

  handleClick = e => {
    this.inputRef.current.addEventListener('keypress', this._keyFinished, true)
    document.addEventListener('mousedown', this._clickFinished, true)
  }

  handleValueChange = () => {
    // Check if value is valid if it's a number input
    const r = this.props.range
    // If a range for the input is given, then the value must be within the range
    if (this.props.name.includes('number')) {
      let v = this.inputRef.current.value
      let vN = Number(v)
      if (
        (isNaN(v) || (r ? vN <= r[0] || vN >= r[1] : false)) &&
        !this.inputRef.current.classList.contains('invalid')
      ) {
        this.inputRef.current.className += ' invalid'
        this.valid = false
      } else if (!isNaN(v)) {
        this.inputRef.current.className = this.inputRef.current.className.replace(
          ' invalid',
          ''
        )
        this.valid = true
      }
    }
  }

  render() {
    const { className, thisInlineData } = this.props
    return (
      <input
        ref={this.inputRef}
        className={'inputBox ' + className}
        type="text"
        defaultValue={thisInlineData}
        onChange={this.handleValueChange}
      ></input>
    )
  }
}
