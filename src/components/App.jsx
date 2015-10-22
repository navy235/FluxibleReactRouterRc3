import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link,IndexLink } from 'react-router'
import {concurrent} from 'contra';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';

let App = React.createClass({
    mixins: [FluxibleMixin],

    statics: {
        storeListeners: [
            AuthStore
        ],
        fetchData: function (context, params, query, done) {
            concurrent([
                context.executeAction.bind(context, AuthActions.LoadSession, {})
            ], done)
        }
    },
    getInitialState() {
        return this.getStateFromStores();
    },
    getStateFromStores() {
        var authStore = this.getStore(AuthStore);
        return {
            isAuthenticated: authStore.isAuthenticated(),
            userProfile: authStore.getUserProfile(),
        };
    },
    onChange: function () {
        var states = this.getStateFromStores();
        this.setState(states);
    },
    render() {
        return (
            <div >
                <IndexLink to='/'>Home Page</IndexLink>
                <Link to='/user'>UserProfile</Link>
                <a href='#'>Same</a>
                <div>User Profile :
                    <br/>
                    UserName:{this.state.userProfile && this.state.userProfile.username}
                </div>
                {this.props.children}
            </div>
        )
    }
})

export default  App;