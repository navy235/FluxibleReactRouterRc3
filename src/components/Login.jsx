import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link,History } from 'react-router'
import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';

var Login = React.createClass({

    statics: {
        storeListeners: [AuthStore]
    },

    contextTypes: {
        location: React.PropTypes.object
    },

    mixins: [FluxibleMixin,History],

    getInitialState: function () {
        var state = this.getStateFromStores();
        return state;
    },

    getStateFromStores: function () {
        var store = this.getStore(AuthStore);
        return {
            isSigningIn: store.isSigningIn(),
            error: store.getSignInError(),
            isAuthenticated: store.isAuthenticated()
        };
    },

    onChange: function () {
        var states = this.getStateFromStores();
        if (states.isAuthenticated) {
            var path = this.context.location.search.returnUrl || '/';
            this.history.pushState(null, path);
        } else {
            this.setState(this.getStateFromStores());
        }
    },

    onLogin(){
        this.executeAction(AuthActions.SignIn, {username: 'admin', password: 'admin'})
    },

    render() {
        return (
            <div id="login">
                <h3>Login Page</h3>
                <button type='button' onClick={this.onLogin}>Login</button>
            </div>
        )
    }
})

export default Login