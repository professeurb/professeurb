import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default function addArrayAnimations (animateGroups) {
  return function wrapComponent (WrappedComponent) {
    return class AnimationHOC extends Component {
      async componentWillReceiveProps (newProps) {
        if (newProps.cards !== this.props.cards) {
          this._initiateAnimation = animateGroups(this.child)
        } else {
          delete this._initiateAnimation
        }
      }

      componentDidUpdate () {
        this.props.animate && this._initiateAnimation && this._initiateAnimation(this.props.duration, this.props.resolve)
      }

      render () {
        const getRef = component =>
          component && (this.child = ReactDOM.findDOMNode(component))
        return <WrappedComponent {...this.props} ref={getRef} />
      }
    }
  }
}
