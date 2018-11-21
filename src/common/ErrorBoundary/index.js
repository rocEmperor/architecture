import React, { Component } from 'react';
import { isDevEnvironment } from '../../utils/util';

/**
 * Error Boundaries 可以捕获在其子组件树里抛出的任何错误，打印这些错误，并且返回一个展示错误的界面而不是崩溃掉的页面。
 * Error Boundaries 可以在渲染过程中、在生命周期方法中、以及其子组件的 constructor 中捕获错误
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }

  componentDidCatch(error, info) {
    let isDev = isDevEnvironment();
    console.log(isDev, '/////')
    // 开发环境下不捕获错误
    if (isDev) {
      console.log(11111111)
      this.setState({ hasError: true, error, info })
      window.sessionStorage.setItem('catchError', error || '');
      if (info && Object.prototype.toString.call(info) == '[object Object]') {
        window.sessionStorage.setItem('catchErrorInfo', JSON.stringify(info));
      }
      // window.location.href = '#/errorShow';
      // setTimeout(() => {
      //   window.location.reload();
      // }, 0)
    }
  }
  render() {
    if (this.state.hasError) {
      return <div className="error">页面崩溃了..........</div>
    } else {
      return (
        <div className="error-boundary">
          {this.props.children}
        </div>
      )
    }
  }
}