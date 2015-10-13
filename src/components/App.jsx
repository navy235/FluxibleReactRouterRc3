import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router'

export default
class App extends Component {
    render() {
        return (
            <div >
                <Link to='/user'>UserProfile</Link>
                {this.props.children}
            </div>
        )
    }
}