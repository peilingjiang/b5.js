import React, { Component, forwardRef } from 'react'

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
            key={'inputNode ' + i}
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
            key={'inputText ' + i}
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
            key={'outputNode ' + i}
            nodeClass="output"
            count={outputNodesCount}
            type={type}
            connectType={output[i] !== null ? outputNodes[i].type[0] : null}
          />
        )
        outputNodesText.push(
          <p
            key={'outputText ' + i}
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
          <></>
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

class Node extends Component {
  // props - nodeClass, count, type, connectType
  render() {
    const { count, type, connectType } = this.props
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
}

export default forwardRef((props, ref) => (
  <BlockRenderer thisBlockRef={ref} {...props} />
))
