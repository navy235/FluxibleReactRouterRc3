require("babel/polyfill");

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
var RouterElement = Router.default;
var FluxibleComponent = require('fluxible-addons-react/FluxibleComponent');
var createBrowserHistory = require('history/lib/createBrowserHistory')
var createRoutes = require('./routes')
var app = require('./app');
var routes = require('./routes');
var fetchData = require('./utils/fetchData');
var history = createBrowserHistory();

window.React = React;

var dehydratedState = window.__DATA__;
var firstRender = true;


app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.context = context;
    var routes = createRoutes(context);

    ReactDOM.render(
        React.createElement(
            FluxibleComponent,
            {context: context.getComponentContext()},
            React.createElement(RouterElement, {
                history: history,
                children: routes,
                onUpdate: UpdateRoute
            })
        ),
        document.getElementById('main')
    );

    function UpdateRoute() {
        if (!firstRender) {
            fetchData(context, this.state);
        }
        firstRender = false;
    }
});

module.exports = routes;