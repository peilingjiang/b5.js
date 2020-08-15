import React, { Component } from 'react'

import '../../postcss/b5.js/blockRenderer/blockRenderer.css'
import { lineHeight, roomWidth } from '../../components/constants'

export default class blockRenderer extends Component {
  constructor(props) {
    super(props)
    this.x = props.x
    this.y = props.y
  }

  shouldComponentUpdate(prevProps) {
    return prevProps.data !== this.props.data
  }

  render() {
    console.log(this.props.data)
    return (
      <div
        className="blockFill"
        style={{
          top: this.y * lineHeight + 'px',
          left: this.x * roomWidth + 'px',
        }}
      ></div>
    )
  }
}
