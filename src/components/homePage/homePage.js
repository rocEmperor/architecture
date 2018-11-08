import React, { Component } from 'react';
import { connect } from 'react-redux';
import './homePage.less';

class Chlid extends Component {
    render() {
        return (
            <div className="Chlid">
                yyyy
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
            payload: {name: '王五'}
        })
    }
    render() {
        let { homePageModel } = this.props;
        return (
            <div className="home-page">
                <div onClick={() => this.changeName()} className="click-btn">111我qq是首qq页思</div>
                <div>{homePageModel.name}</div>
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