import React, { Component } from 'react';
import { connect } from 'react-redux';
import './homePage.less';
let a = 0;
class Chlid extends Component {
    render() {
        return (
            <div className="Chlid">
                我是惟一一个子组件
            </div>
        )
    }
}
class HomePage extends Component {
    constructor (props) {
        super(props);
    }
    changeName () {
        let { dispatch } = this.props;
        dispatch({
            type: 'changeName',
            payload: {name: '王五1'}
        })
    }
    render() {
        let { homePageModel } = this.props;
        return (
            <div className="home-page">
                <h1 className="title">首页</h1>
                <div onClick={() => this.changeName()} className="click-btn">
                    点击我改变模特的姓名,赶快测试吧
                </div>
                <div className="img">
                    
                </div>
                <div><b>模特：</b><span className="name">{homePageModel.name}</span></div>
                <img src="../../images/bg.jpg"/>
                <Chlid />
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        homePageModel: state.homePage
    }
};
export default connect(mapStateToProps)(HomePage);