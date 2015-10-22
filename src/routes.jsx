import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Router,IndexRoute} from 'react-router';
import AuthStore from './stores/AuthStore';
import {
    App,
    Home,
    Login,
    RequireLogin,
    UserProfile,
    NotFound,
} from './components';

function requireAuth(context) {
    return function (nextState, replaceState) {
        var isAuthenticated = context.getComponentContext().getStore(AuthStore).isAuthenticated();

        if (!isAuthenticated)
            replaceState({nextPathname: nextState.location.pathname}, '/login')
    }

}
export default function (context) {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="login" component={Login}/>
            <Route path="user" component={UserProfile} onEnter={requireAuth(context)}/>
            <Route path="*" component={NotFound}/>
        </Route>
    );
}
