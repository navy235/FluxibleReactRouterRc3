require("babel/polyfill");
var React = require('react');
var ReactDOM = require('react-dom')
var Router = require('react-router');
var match = Router.match;
var RoutingContext = Router.RoutingContext;
var RouterElement = Router.default;
var queryString = require('query-string');
var FluxibleComponent = require('fluxible-addons-react/FluxibleComponent');
var createBrowserHistory = require('history/lib/createBrowserHistory')
var app = require('./app');
var createRoutes = require('./routes')
var history = createBrowserHistory();
var dehydratedState = window.__DATA__;
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.context = context;
    var routes = createRoutes(history, context);
    var search = document.location.search;
    var query = search && queryString.parse(search);
    if (!query) {
        query = {};
    }
    var location = history.createLocation(document.location.pathname, query);
    match({routes: routes, location: location, history: history}, function (error, redirectLocation, renderProps) {
        renderProps.history = history;
        ReactDOM.render(
            React.createElement(
                FluxibleComponent,
                {context: context.getComponentContext()},
                React.createElement(RouterElement, renderProps)
            ),
            document.getElementById('app')
        );
    })
});