import React, { Component, forwardRef, createRef } from 'react'

import '../../postcss/b5.js/blockRenderer/blockRenderer.css'
import { lineHeight, roomWidth } from '../../components/constants'
import _b5BlocksObject from '../src/blocks/blocksObjectWrapper'

class BlockRenderer extends Component {
  constructor(props) {
    super(props) // x, y, data, inputBlocks
    this.x = props.x
    this.y = props.y

    /*

    > this.props.inputBlocks
    {
      '0': 'number',
      '1': 'numberSlider',
    }

    */
  }

  shouldComponentUpdate(prevProps) {
    return prevProps.data !== this.props.data
  }

  render() {
    const {
        data: { name, input, inlineData, output },
        inputBlocks,
        x,
        y,
        collect,
      } = this.props,
      { type, kind, inputNodes, outputNodes } = _b5BlocksObject[name]

    let blockInputNodes = [],
      blockOutputNodes = [],
      inputNodesText = [],
      outputNodesText = []

    let inputNodesCount = 0,
      outputNodesCount = 0

    if (inputNodes !== null) {
      inputNodesCount = inputNodes.length
      for (let i in inputNodes) {
        blockInputNodes.push(
          <Node
            key={x + y + ' inputNode' + i}
            nodeClass="input"
            count={inputNodesCount}
            type={type}
            connectType={
              input[i] !== null
                ? _b5BlocksObject[inputBlocks[i]].outputNodes[input[i][2]]
                    .type[0]
                : null
            }
            // If connectType !== null, then connected
          />
        )
        inputNodesText.push(
          <p
            key={x + y + ' inputText' + i}
            className={'inputText count' + inputNodesCount}
          >
            {inputNodes[i].text}
          </p>
        )
      }
    }

    if (outputNodes !== null) {
      outputNodesCount = outputNodes.length
      for (let i in outputNodes) {
        blockOutputNodes.push(
          <Node
            key={x + y + 'outputNode ' + i}
            nodeClass="output"
            count={outputNodesCount}
            type={type}
            connectType={output[i] !== null ? outputNodes[i].type[0] : null}
          />
        )
        outputNodesText.push(
          <p
            key={x + y + 'outputText ' + i}
            className={'outputText count' + outputNodesCount}
          >
            {outputNodes[i].text}
          </p>
        )
      }
    }

    return (
      <div
        className="blockFill"
        style={{
          top: this.y * lineHeight + 'px',
          left: this.x * roomWidth + 'px',
        }}
        ref={this.props.thisBlockRef}
      >
        {kind === 'inline' ? (
          <></>
        ) : kind === 'method' ? (
          <></>
        ) : kind === 'display' ? (
          <></>
        ) : kind === 'input' ? (
          <InputBlock
            className={'grab block ' + type + ' ' + kind}
            name={name}
            inlineData={inlineData}
            output={output}
            outputNodes={outputNodes}
            type={type}
            collect={collect}
            x={x}
            y={y}
          />
        ) : kind === 'slider' ? (
          <></>
        ) : (
          // kind === 'normal'
          <div
            className={
              'grab block ' +
              type +
              ' ' +
              kind +
              ' nodesCount' +
              Math.max(inputNodesCount, outputNodesCount)
            }
          >
            {inputNodes !== null ? (
              <>
                <div className="nodes inputNodes">{blockInputNodes}</div>
                <div className="nodesText inputNodesText">{inputNodesText}</div>
              </>
            ) : null}

            <div className="blockName">{name}</div>

            {outputNodes !== null ? (
              <>
                <div className="nodesText outputNodesText">
                  {outputNodesText}
                </div>
                <div className="nodes outputNodes">{blockOutputNodes}</div>
              </>
            ) : null}
          </div>
        )}
      </div>
    )
  }
}

const Node = ({ count, type, connectType }) => {
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

class InputBlock extends Component {
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

  _cleanValue = v => {
    return isNaN(v) ? v : Number(v)
  }

  _finished = (toBlur = true) => {
    // Handle send data
    if (this.inputRef) {
      const { collect, x, y, inlineData } = this.props
      let value = this._cleanValue(this.inputRef.current.value)
      if (this.valid && value !== inlineData[0]) {
        collect([x, y, 0, value], 'inlineDataChange')
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
    document.addEventListener('click', this._clickFinished, true)
  }

  handleValueChange = () => {
    // Check if value is valid if it's a number input
    if (this.props.name === 'number') {
      if (
        isNaN(this.inputRef.current.value) &&
        !this.inputRef.current.classList.contains('invalid')
      ) {
        this.inputRef.current.className += ' invalid'
        this.valid = false
      } else if (!isNaN(this.inputRef.current.value)) {
        this.inputRef.current.className = this.inputRef.current.className.replace(
          ' invalid',
          ''
        )
        this.valid = true
      }
    }
  }

  render() {
    const {
      className,
      name,
      type,
      inlineData,
      output,
      outputNodes,
    } = this.props
    return (
      <div className={className}>
        <div className="left">
          <div className="blockName">{name}</div>
          <div className="nodes outputNodes">
            <Node
              nodeClass="output"
              count={1}
              type={type}
              connectType={output[0] !== null ? outputNodes[0].type[0] : null}
            />
          </div>
        </div>
        <div className="right">
          <input
            ref={this.inputRef}
            className="inputBox"
            type="text"
            defaultValue={inlineData}
            onChange={this.handleValueChange}
          ></input>
        </div>
      </div>
    )
  }
}

export default forwardRef((props, ref) => (
  <BlockRenderer thisBlockRef={ref} {...props} />
))
