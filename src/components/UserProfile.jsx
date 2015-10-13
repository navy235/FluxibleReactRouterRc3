import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router'

export default
class UserProfile extends Component {
    static onEnter(store) {
        return (nextState, replaceState) => {
            console.log(replaceState);
            replaceState(null, '/')
        };
    }
    render() {
        return (
            <div id="user">
                <h3>UserProfile</h3>
            </div>
        )
    }
}